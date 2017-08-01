import React from 'react';
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

        <ExecutiveSummary info={this.props.request.executiveSummary} />

        <ProjectPlan vision={this.props.request.plan.vision} outcomes={this.props.request.plan.outcomes} />

        <ProjectMilestones outcomes={this.props.request.plan.outcomes.filter(o => o.title)} milestones={this.props.request.milestones} />

        <ProposedBudget />

        <StaffingRequirements />

        <PAPDSummary info={this.props.request.papdSummary} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  request: state.currentRequest
});

const mapDispatchToProps = dispatch => ({
  updateCost(which, value) {
    dispatch(Requests.updateCost(which, value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(IAPD);
