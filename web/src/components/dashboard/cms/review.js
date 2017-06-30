import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Request as RequestPropTypes, Submitter as SubmitterPropTypes } from '../../propTypes';
import { Requests } from '../../../actions';

import Section from './review-section';
import ProposedBudgetTable from './proposed-budget-table';

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
      const request = this.props.request;

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
              {request.submitters.map(person => <Submitter key={`apd-${request.id}-person-${person.name}`} person={person} />)}
            </div>
          </div>

          <Section name="Executive Summary" summary="Describe the overall effort you are proposing and the problems you hope to solve.">
            {request.prose.executiveSummary}
          </Section>

          <Section collapsed name="Statement of Outcomes">
            <p>{request.prose.statementOfOutcomes}</p>
            <table>
              <thead>
                <tr>
                  <th scope="col">Priority</th>
                  <th scope="col">Outcome</th>
                  <th scope="col">Example</th>
                  <th scope="col">Example measures</th>
                </tr>
              </thead>
              <tbody>
                {request.outcomes.map(outcome => (
                  <tr>
                    <td>{outcome.priority}</td>
                    <td>{outcome.outcome}</td>
                    <td>{outcome.example}</td>
                    <td>{outcome.measures}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>

          <Section collapsed name="Proposed Budget">
            <p>{request.prose.proposedBudget}</p>
            <ProposedBudgetTable costs={request.costs} />
          </Section>

          <Section collapsed name="PAPD Summary">{request.prose.papdSummary}</Section>
          <Section collapsed name="Personnel">{request.prose.personnel}</Section>
          <Section collapsed name="Acquisitions Plan">{request.prose.acquisitionsPlan}</Section>
          <Section collapsed name="Cost Allocation Estimate">{request.prose.costAllocationEstimate}</Section>
          <Section collapsed name="Cost/Benefit Analysis">{request.prose.costBenefitAnalysis}</Section>
          <Section collapsed name="Proposed Activity">{request.prose.proposedActivity}</Section>
          <Section collapsed name="Security, Interface, Disaster Recover, and Business Continuity">{request.prose.continuityOfOperations}</Section>
          <Section collapsed name="Other Assurances">{request.prose.otherAssurances}</Section>
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
