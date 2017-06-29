import React from 'react';
import { connect } from 'react-redux';
import { Request as RequestPropTypes, Submitter as SubmitterPropTypes } from '../../propTypes';

import Section from './review-section';

const Submitter = props => (
  <div className="person">
    <div className="name">{props.person.name}</div>
    <div className="email">{props.person.email}</div>
    <div className="phone">{props.person.phone}</div>
  </div>
);
Submitter.propTypes = SubmitterPropTypes.propTypes;
Submitter.defaultTypes = SubmitterPropTypes.defaultProps;

function crlfToBreaks(string) {
  const keyPrefix = Math.random();
  // We'll accept any performance hit from using the array index as part of the
  // key, since that's by far the best way to ensure uniqueness.
  return (string.split('\n').map((stringLine, i) => (<p key={`string-bit-${keyPrefix}-${i}`}>{stringLine}</p>))); // eslint-disable-line react/no-array-index-key
}

const render = props => (
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
        {props.request.submitters.map(person => <Submitter key={`apd-${props.request.id}-person-${person.name}`} person={person} />)}
      </div>
    </div>
    <Section name="Executive Summary" summary="Describe the overall effort you are proposing and the problems you hope to solve.">
      {crlfToBreaks(props.request.prose.executiveSummary)}
    </Section>
    <Section name="Statement of Outcomes">
      {crlfToBreaks(props.request.prose.statementOfOutcomes)}
    </Section>
    <Section name="Proposed Budget">x</Section>
    <Section name="PAPD Summary">x</Section>
    <Section name="Personnel">x</Section>
    <Section name="Acquisitions Plan">x</Section>
    <Section name="Cost Allocation Estimate">x</Section>
    <Section name="Cost/Benefit Analysis">x</Section>
    <Section name="Proposed Activity">x</Section>
    <Section name="Security, Interface, Disaster Recover, and Business Continuity">x</Section>
    <Section name="Other Assurances">x</Section>
  </div>
);
render.propTypes = {
  request: RequestPropTypes.propTypes.isRequired
};

const mapStateToProps = (state, ownProps) => {
  const requestID = ownProps.match.params.requestID;
  return {
    request: state.openRequests.find(request => request.id === requestID)
  };
};

export default connect(mapStateToProps, null)(render);
