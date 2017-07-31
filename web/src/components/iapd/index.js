import React from 'react';
import { connect } from 'react-redux';
import Section from '../collapsible';
import Dollars from '../dollars';

import ExecutiveSummary from './executive-summary';

import { Requests } from '../../actions';

const Outcome = props => (
  <div className="outcome">
    <p>
      Outcome {props.number} <input type="text" />
    </p>
    <p>
      Success metrics: <input type="text" />
    </p>
  </div>
);

const Milestone = props => (
  <div className="milestone">
    <h3>Project milestone {props.number}</h3>

    <p>
      Describe this project milestone in one sentence
      <br />
      <input type="text" />
    </p>

    <p>
      What activities or workstreams are needed to achieve this project milestone?
      <br />
      <input type="text" />
    </p>

    <p>
      Which outcome(s) does this milestone support?
      <br />
      <select>
        <option>1</option>
        <option>2</option>
        <option>3</option>
      </select>
    </p>

    <p>
      Which MITA business areas are part of this milestone?
      <br />
      <select>
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
    </p>

    <p>
      How much will it cost to reach this milestone?
      <span className="input-with-dollar">
        <input type="number" className="short dollar" />
      </span>
    </p>

    <p>
      How will you define success for this milestone?
      <textarea />
    </p>
  </div>
);

const BudgetTable = props => (
  <div className="budget-table">
    <input type="number" placeholder="federal fiscal year" />

    <div className="pull right">FFY 20XX</div>

    <table>
      <thead>
        <tr>
          <th colSpan="7">Design, development, and implementation activities (2A, 2B)</th>
        </tr>
        <tr>
          <th>State cost category</th>
          <th>In-house or contract?</th>
          <th>90% federal share</th>
          <th>10% state share</th>
          <th>75% federal share</th>
          <th>25% state share</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {props.budget.ddi.categories.map(c => (
          <tr key={c.category}>
            <td><input value={c.category} /></td>
            <td>
              <select>
                <option>select</option>
                <option>in-house</option>
                <option>contractor</option>
              </select>
            </td>
            <td><span className="input-with-dollar"><input value={c.ffp90} /></span></td>
            <td><span className="input-with-dollar"><input value={c.state10} /></span></td>
            <td><span className="input-with-dollar"><input value={c.ffp75} /></span></td>
            <td><span className="input-with-dollar"><input value={c.state25} /></span></td>
            <td><Dollars value={c.total} /></td>
          </tr>
        ))}
        <tr>
          <td colSpan="7">
            <a href="">Add a new row +</a>
          </td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th>Grand total</th>
          <th>&nbsp;</th>
          <th><Dollars value={props.budget.ddi.ffp90} /></th>
          <th><Dollars value={props.budget.ddi.state10} /></th>
          <th><Dollars value={props.budget.ddi.ffp75} /></th>
          <th><Dollars value={props.budget.ddi.state25} /></th>
          <th><Dollars value={props.budget.ddi.total} /></th>
        </tr>
      </thead>
    </table>

    <table>
      <thead>
        <tr>
          <th colSpan="7">Maintenance and operations activities (4A, 4B)</th>
        </tr>
        <tr>
          <th>State cost category</th>
          <th>In-house or contract?</th>
          <th>75% federal share</th>
          <th>25% state share</th>
          <th>50% federal share</th>
          <th>50% state share</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {props.budget.om.categories.map(c => (
          <tr key={c.category}>
            <td><input value={c.category} /></td>
            <td>
              <select>
                <option>select</option>
                <option>in-house</option>
                <option>contractor</option>
              </select>
            </td>
            <td><span className="input-with-dollar"><input value={c.ffp75} /></span></td>
            <td><span className="input-with-dollar"><input value={c.state25} /></span></td>
            <td><span className="input-with-dollar"><input value={c.ffp50} /></span></td>
            <td><span className="input-with-dollar"><input value={c.state50} /></span></td>
            <td><Dollars value={c.total} /></td>
          </tr>
        ))}
        <tr>
          <td colSpan="7">
            <a href="">Add a new row +</a>
          </td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th>Grand total</th>
          <th>&nbsp;</th>
          <th><Dollars value={props.budget.om.ffp75} /></th>
          <th><Dollars value={props.budget.om.state25} /></th>
          <th><Dollars value={props.budget.om.ffp50} /></th>
          <th><Dollars value={props.budget.om.state50} /></th>
          <th><Dollars value={props.budget.om.total} /></th>
        </tr>
      </thead>
    </table>

    <table>
      <thead>
        <tr>
          <th colSpan="5">Mechanized systems (5A, 5B, 5C)</th>
        </tr>
        <tr>
          <th>State cost category</th>
          <th>In-house, contract, or interagency?</th>
          <th>50% federal share</th>
          <th>50% state share</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {props.budget.mechanizedSystems.categories.map(c => (
          <tr key={c.category}>
            <td><input value={c.category} /></td>
            <td>
              <select>
                <option>select</option>
                <option>in-house</option>
                <option>contractor</option>
                <option>interagency</option>
              </select>
            </td>
            <td><span className="input-with-dollar"><input value={c.ffp50} /></span></td>
            <td><span className="input-with-dollar"><input value={c.state50} /></span></td>
            <td><Dollars value={c.total} /></td>
          </tr>
        ))}
        <tr>
          <td colSpan="5">
            <a href="">Add a new row +</a>
          </td>
        </tr>
      </tbody>
      <thead>
        <tr>
          <th>Grand total</th>
          <th>&nbsp;</th>
          <th><Dollars value={props.budget.mechanizedSystems.ffp50} /></th>
          <th><Dollars value={props.budget.mechanizedSystems.state50} /></th>
          <th><Dollars value={props.budget.mechanizedSystems.total} /></th>
        </tr>
      </thead>
    </table>
  </div>
);

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

        <Section name="Project plan">
          <p>
            In this section, you&rsquo;ll describe the desired outcomes of your
            initiative, along with the activities (tasks) you&rsquo; complete
            to achieve them.
          </p>

          <h3>Project vision</h3>
          <p>
            What is the ultimate benefit of your initiative?  Provide a
            description of no more than 200 words.
            <br />
            <textarea />
          </p>

          <h3>Project outcomes</h3>
          <p>
            Provide short, detailed descriptions of each smaller goal that
            contributes to the overall project goal, along with metrics
            for tracking the success of each.
          </p>

          {this.props.request.plan.outcomes.map((o, i) => <Outcome key={o.id} number={i + 1} outcome={o} />)}

          <p>
            <a href="">Add an outcome +</a>
          </p>
        </Section>

        <Section name="Project milestones">
          <p>
            In the context of this APD, a project milestone is a mid-process
            accomplishment that contributes to the larger project vision. Not
            all milestones are accompanied by deliverables, although many are.
          </p>

          {this.props.request.milestones.map((m, i) => <Milestone key={m.id} number={i + 1} milestone={m} />)}
        </Section>

        <Section name="Proposed budget">
          <h3>Detailed budget tables</h3>

          <p>
            Please complete the following tables for each relevant Federal
            Fiscal Year. These will provide a more detailed view of how
            you&rsquo;ll spend your award.  Within each table, replace the
            Category labels (leftmost column) with descriptions of each
            category.  For example, in the Design, Development, and
            implementation table, you might replace &ldquo;Category I&rdquo;
            with &ldquo;Project planning and kickoff.&rdquo;
          </p>

          {this.props.request.budget.map(b => <BudgetTable key={b.ffy} budget={b} />)}

          <a href="">Add another fiscal year +</a>

          ...MDBT goes here...
        </Section>

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

        <Section name="PAPD summary of activities">
          <p>
            The Planning Advance Planning Document (PAPD) helps you and your
            team create a project roadmap. Here, yo&rsquo;ll share what you
            learned by completing the PAPD.
          </p>

          <p>
            In this section, you&rsquo;ll provide a detailed description of the
            nature and scope of system work and the methods you&rsquo;ll use to
            execute the work.  In general, this description should match the
            major task categories on your project schedule or work plan.  Some
            examples of activities include identifying risks and creating a
            preliminary mitigation strategy, documenting the as-is and to-be
            environments, and developing proposal evaluation criteria for
            procurement proposals.
          </p>

          <h3>PAPD learning outcomes</h3>
          <p>
            In 200 words of fewer, describe what you learned from the PAPD and
            how this changed your plan.
            <textarea />
          </p>

          <h3>PAPD expenditure status</h3>
          <p>
            Write a summary (500 words or fewer) of the current status of the
            activities you included in your Planning Advanced Planning
            Document (PAPD).  If possible, provide completion estimates for
            each activity (&ldquot;This activity is already 75% complete,
            according to our outline.&rdquot;). Please also note the status
            of CMS-approved expenditures included in the PAPD.
            <textarea />
          </p>
        </Section>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  request: state.currentRequest,
  costs: state.currentRequest.costs
});

const mapDispatchToProps = dispatch => ({
  updateCost(which, value) {
    dispatch(Requests.updateCost(which, value));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(IAPD);
