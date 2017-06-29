import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Request as RequestPropTypes, Submitter as SubmitterPropTypes } from '../../propTypes';
import { Requests } from '../../../actions';

import Section from './review-section';

const Submitter = props => (
  <div className="person">
    <div className="name">{props.person.name}</div>
    <div className="email">{props.person.email}</div>
    <div className="phone">{props.person.phone}</div>
  </div>
);
Submitter.propTypes = {
  person: SubmitterPropTypes.propTypes.isRequired
};

class Review extends React.Component {
  constructor(props) {
    super(props);

    if (!props.request) {
      props.setCurrentRequest(props.requestID);
    }
  }

  render() {
    if (this.props.request) {
      return (
        <div className="cms review">
          <div className="header">
            <div className="description">
              Medicaid Management Information Systems<br />
              Advanced Planning Document<br />
              State of Franklin<br />
              Franklin Dept. of Health - Medicaid<br />
              Submitted 6/20/2017<br />
            </div>
            <div className="submitters">
              {this.props.request.submitters.map(person => <Submitter key={`apd-${this.props.request.id}-person-${person.name}`} person={person} />)}
            </div>
          </div>
          <Section name="Executive Summary" summary="Describe the overall effort you are proposing and the problems you hope to solve.">
            {this.props.request.prose.executiveSummary}
          </Section>
          <Section name="Statement of Outcomes">
            {this.props.request.prose.statementOfOutcomes}
          </Section>
          <Section name="Proposed Budget">{this.props.request.prose.proposedBudget}</Section>
          <Section name="PAPD Summary">{this.props.request.prose.papdSummary}</Section>
          <Section name="Personnel">{this.props.request.prose.personnel}</Section>
          <Section name="Acquisitions Plan">{this.props.request.prose.acquisitionsPlan}</Section>
          <Section name="Cost Allocation Estimate">{this.props.request.prose.costAllocationEstimate}</Section>
          <Section name="Cost/Benefit Analysis">{this.props.request.prose.costBenefitAnalysis}</Section>
          <Section name="Proposed Activity">{this.props.request.prose.proposedActivity}</Section>
          <Section name="Security, Interface, Disaster Recover, and Business Continuity">{this.props.request.prose.continuityOfOperations}</Section>
          <Section name="Other Assurances">{this.props.request.prose.otherAssurances}</Section>
        </div>
      );
    }
    return (<span>Loading request</span>);
  }
}
Review.propTypes = {
  request: RequestPropTypes.propTypes,
  requestID: PropTypes.string.isRequired,
  setCurrentRequest: PropTypes.func.isRequired
};
Review.defaultProps = {
  request: null
};

const mapStateToProps = (state, ownProps) => {
  const requestID = ownProps.match.params.requestID;
  if (state.currentRequest && state.currentRequest.id === requestID) {
    return {
      requestID,
      request: state.currentRequest
    };
  }

  return { requestID };
};

const mapDispatchToState = dispatch => ({
  setCurrentRequest(requestID) {
    dispatch(Requests.setCurrentRequest(requestID));
  }
});

export default connect(mapStateToProps, mapDispatchToState)(Review);
