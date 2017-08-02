import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ExecutiveSummary from './executive-summary';
import ProjectPlan from './project-plan/';
import ProjectMilestones from './project-milestones/';
import ProposedBudget from './proposed-budget/';
import StaffingRequirements from './staffing/';
import PAPDSummary from './papd-summary';

import { Requests } from '../../actions';

class IAPD extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDollars: 0
    };
  }

  render() {
    return (
      <div className="new iapd">
        <header>
          <h3>State of Wyoming APD: {this.props.request.status} <small>Rev {this.props.request.revision}</small></h3>
          <small>Days left in 60 day review period: {this.props.request.reviewRemaining}</small>
        </header>

        <ExecutiveSummary />
        <ProjectPlan />
        <ProjectMilestones />
        <ProposedBudget />
        <StaffingRequirements />
        <PAPDSummary />
      </div>
    );
  }
}

IAPD.propTypes = {
  request: PropTypes.shape({
    status: PropTypes.string.isRequired,
    revision: PropTypes.number.isRequired,
    reviewRemaining: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  request: state.currentRequest
});

const mapDispatchToProps = dispatch => ({
  updateCost(which, value) {
    dispatch(Requests.updateCost(which, value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(IAPD);
