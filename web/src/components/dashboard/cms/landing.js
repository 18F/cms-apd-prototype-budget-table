import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import { Projects } from '../../../actions';
import Dollars from '../../dollars';
import Collapsible from '../../collapsible';

const LinkToRequest = withRouter(props => (
  <Link to={`${props.match.path}review/${props.request.id}`}>{props.request.id}</Link>
));

LinkToRequest.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dateToString = date => `${months[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;

const getFundingStatusForProject = (project) => {
  let totalApprovedFunding = 0;
  let totalPendingFunding = 0;
  for (const request of project.requests) {
    if (request.approved || request.superceded) {
      totalApprovedFunding += request.dollars.added;
      totalApprovedFunding -= request.dollars.subtracted;
    } else {
      totalPendingFunding += request.dollars.added;
      totalPendingFunding -= request.dollars.subtracted;
    }
  }

  return {
    totalApprovedFunding,
    totalPendingFunding,
    totalSpent: project.spent,
    totalApprovedRemaining: (totalApprovedFunding - project.spent)
  };
};

const FundingSummary = (props) => (
  <div>
    <h3>{props.project ? 'Approved project' : 'Total approved'} funds remaining: <Dollars value={props.funding.totalApprovedRemaining} /></h3>
    <div>
      <div>Total approved funding: <Dollars value={props.funding.totalApprovedFunding} /></div>
      <div>Total spent so far: <Dollars value={props.funding.totalSpent} /></div>
    </div>

    {props.funding.totalPendingFunding !== 0 ? (<h3>{props.project ? 'Pending project' : 'Total pending'} funding requested: <Dollars value={props.funding.totalPendingFunding} /></h3>) : null}
  </div>
);

const ProjectSummary = (props) => {
  const funding = getFundingStatusForProject(props.project);

  const getRequestNode = (request) => {
    let status = 'submitted';
    let actionDate = request.submitted;
    if (request.superceded) {
      status = 'superceded';
      actionDate = request.superceded;
    } else if (request.approved) {
      status = 'approved';
      actionDate = request.approved;
    }

    if (actionDate) {
      actionDate = dateToString(new Date(actionDate));
    }

    return (
      <li key={request.id}>
        <LinkToRequest request={request} />, {status} {actionDate}<br />
        Adds <Dollars value={request.dollars.added} /> in new funding,
        returns <Dollars value={request.dollars.subtracted} /> in previously-approved funding
      </li>
    );
  };

  return (
    <Collapsible name={props.project.name} className="project summary" collapsed>

      <FundingSummary funding={funding} project />

      <h4>Funding requests</h4>
      <ul>
        {props.project.requests.map(request => getRequestNode(request))}
      </ul>
    </Collapsible>
  )
}

const StateSummary = (props) => {
  const funding = props.projects.map(getFundingStatusForProject).reduce((total, project) => ({
    totalApprovedFunding: (total.totalApprovedFunding + project.totalApprovedFunding),
    totalPendingFunding: (total.totalPendingFunding + project.totalPendingFunding),
    totalSpent: (total.totalSpent + project.totalSpent),
    totalApprovedRemaining: (total.totalApprovedRemaining + project.totalApprovedRemaining)
  }), { totalApprovedFunding: 0, totalPendingFunding: 0, totalSpent: 0, totalApprovedRemaining: 0 });

  return (
    <div>
      <h1>{props.projects[0].state}</h1>

      <FundingSummary funding={funding} />

      <Collapsible name="Projects" collapsed>
        {props.projects.map(project => <ProjectSummary key={project.id} project={project} />)}
      </Collapsible>
    </div>
  )
};

function landing(props) {
  if (!props.projects) {
    // fetch 'em'
    props.getProjects();
    return (<span>Loading data...</span>);
  }

  return (
    <div className="cms dashboard">
      {props.stateNames.map(stateName => (<StateSummary key={stateName} projects={props.projects.filter(project => project.state === stateName)} />))}
    </div>
  );
}

landing.propTypes = {
  projects: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]).isRequired,
  stateNames: PropTypes.arrayOf(PropTypes.string).isRequired,
  getProjects: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const stateNames = [];

  if (state.projects) {
    for (const project of state.projects) {
      if (!stateNames.includes[project.state]) {
        stateNames.push(project.state);
      }
    }
  }

  return {
    projects: state.projects,
    stateNames
  };
}

function mapDispatchToState(dispatch) {
  return {
    getProjects() {
      dispatch(Projects.getProjects());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToState)(landing);
