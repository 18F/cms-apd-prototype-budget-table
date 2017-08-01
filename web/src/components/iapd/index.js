import React from 'react';
import { connect } from 'react-redux';
import Section from '../collapsible';

import ExecutiveSummary from './executive-summary';
import ProjectPlan from './project-plan/';
import ProjectMilestones from './project-milestones/';
import ProposedBudget from './proposed-budget/';
import PAPDSummary from './papd-summary';

import { Requests } from '../../actions';

const Staff = props => (
  <div className="staff">
    <span className="small bold">{props.title}</span>
    <label>Name <input type="text" value={props.person.name} /></label>
    <label>Email <input type="text" value={props.person.email} /></label>
    <label>
      % weekly time allocated to this project
      <input className="short" type="text" value={props.person.percentTime} />
    </label>
    <br />
    Key job responsibilities (separate using commas)
    <textarea value={props.person.responsibilities} />
  </div>
);

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

        <Section name="Staffing requirements">
          <p>
            In this section, you&rsquo;ll provide information on the staff
            you&rsquo;ll need to complete this project. You don&rsquo;nt
            need to provide exact numbers; rather, please list the approximate
            number of internal staff members and external staff members
            (contractors) you anticipate needing.  As you come up with these
            numbers, please consider the following questions:
          </p>
          <ul>
            <li>
              Is your project director reasonably allocated for this project?
            </li>
            <li>
              Are all other key personnel (internal and external) reasonably
              allocated?
            </li>
            <li>
              Have you included staff members representing all the skills
              you&rsquo;ll need for the project?
            </li>
          </ul>

          <h3>Leadership team</h3>

          <Staff title="Project director" person={this.props.request.staffing.director} />
          {this.props.request.staffing.keyStaff.map((p, i) => <Staff key={p.email} title={`Key staff member #${i + 2}`} person={p} />)}

          <a href="">Add another key staff member +</a>

          <h3>Broader staffing needs</h3>

          <p>
            Please describe the skills you'll need to complete your project;
            separate individual skills using commas.
            <textarea value={this.props.request.staffing.other.neededSkills} />
          </p>

          <p>
            How many internal staff members will work on this project?
            <input type="number" className="short" value={this.props.request.staffing.other.internalStaff} />
          </p>

          <p>
            How many external staff members will work on this project?
            <input type="number" className="short" value={this.props.request.staffing.other.externalStaff} />
          </p>

          <p>
            Will any staff or contractors be cost allocated?
            <select>
              <option>select YES or NO</option>
              <option>Yes</option>
              <option>No</option>
            </select>
          </p>

          <p>
            How many staff or contractors will be cost allocated?
            <input type="number" className="short" value={this.props.request.staffing.other.costAllocatedStaff} />
          </p>

          <p>
            What are your total allocation costs?
            <span className="input-with-dollar">
              <input type="number" className="short" value={this.props.request.staffing.other.totalAllocationCosts} />
            </span>
          </p>

          <p>
            Provide a short description (no more than 200 words) of your
            cost-allocation methodologies.
            <textarea value={this.props.request.staffing.other.costAllocatedStaff} />
          </p>
        </Section>

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
