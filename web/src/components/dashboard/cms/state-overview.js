import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'react-circular-progressbar';
import Dollars from '../../dollars';
import Collapsible from '../../collapsible';
import { states } from '../../search/data';

function getProjectFundingData(project) {
  const totalApproved = project.fundingRequests.filter(fr => fr.approved).reduce((sum, fr) => sum + fr.adds, 0);
  return {
    totalApproved,
    approvedRemaining: totalApproved - project.spent
  };
}

function landing(props) {
  let state = props.match.params.state;
  if (states[state.toUpperCase()]) {
    state = states[state.toUpperCase()];
  }

  const projects = [{
    name: 'Participant webapp to view spenddown status',
    spent: 343474,
    fundingRequests: [{
      id: 'WY-MMIS-2017-01-R01',
      submitted: 'June 13, 2017',
      approved: 'June 14, 2017',
      adds: 3485118
    }, {
      id: 'WY-MMIS-2017-01-R02',
      submitted: 'August 1, 2017',
      approved: false,
      adds: 735733
    }]
  }, {
    name: 'Provider claims reporting functionality',
    spent: 0,
    fundingRequests: [{
      id: 'WY-MMIS-2017-02-R01',
      submitted: 'July 12, 2017',
      approved: 'July 19, 2017',
      adds: 1151788
    }]
  }];

  const totalApproved = projects.reduce((sum, project) => (
    sum + project.fundingRequests.filter(fr => fr.approved).reduce((frSum, fr) => fr.adds + frSum, 0)
  ), 0);
  const totalPending = projects.reduce((sum, project) => (
    sum + project.fundingRequests.filter(fr => !fr.approved).reduce((frSum, fr) => fr.adds + frSum, 0)
  ), 0);
  const totalSpent = projects.reduce((sum, project) => sum + project.spent, 0);
  const percentRemaining = 100 - Math.round(100 * (totalSpent / totalApproved));

  projects.forEach((p) => {
    p.fundingData = getProjectFundingData(p); // eslint-disable-line no-param-reassign
  });

  return (
    <div className="cms dashboard">
      <header>
        <h3>State of {state} <small>overview</small></h3>
      </header>

      <h2>Spending summary</h2>

      <div className="spending-wheel">
        <CircularProgress percentage={percentRemaining} />
        <div className="percentage">{percentRemaining}</div>
        <div className="detail">
          Total spent:<br />
          <Dollars value={totalSpent} hideCents />
        </div>
      </div>

      <div className="summary">
        <span className="title">Total approved funds remaining</span>
        <div className="highlight">
          <Dollars value={totalApproved - totalSpent} hideCents />
        </div>
        <div className="detail">
          Total approved funding: <Dollars value={totalApproved} hideCents />
        </div>
      </div>

      <div className="summary">
        <span className="title">Total pending funds requested</span>
        <div className="highlight">
          <Dollars value={totalPending} hideCents />
        </div>
      </div>

      <hr />

      <h2>Projects</h2>

      <div className="projects">
        {projects.map(p => (
          <Collapsible key={p.name} name={p.name}>
            <h3>Approved project funds remaining: <Dollars value={p.fundingData.approvedRemaining} /></h3>
            <div className="highlight">
              Total approved funding: <Dollars value={p.fundingData.totalApproved} /><br />
              Total spent to date: <Dollars value={p.spent} />
            </div>

            <h3>Funding requests</h3>
            {p.fundingRequests.map(fr => (
              <div key={fr.id} className="highlight">
                {fr.id} {fr.approved ? 'approved' : 'submitted'} {fr.approved ? fr.approved : fr.submitted}<br />
                {fr.approved ? 'Added' : 'Requests'} <Dollars value={fr.adds} /> in new funding
              </div>
            ))}
          </Collapsible>
        ))}
      </div>
    </div>
  );
}

landing.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      state: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
};

export default landing;
