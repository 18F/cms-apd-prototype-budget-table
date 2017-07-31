import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Section from '../collapsible';
import TextArea from '../textarea';
import { IAPD as IAPDActions } from '../../actions';

class ExecutiveSummary extends React.Component {
  constructor(props) {
    super(props);

    this.updateProblem = (value) => {
      this.props.updateExecutiveSummary({
        problem: value,
        vision: this.props.info.vision,
        time: this.props.info.time,
        cost: this.props.info.cost
      });
    };

    this.updateVision = (e) => {
      this.props.updateExecutiveSummary({
        problem: this.props.info.problem,
        vision: e.target.value,
        time: this.props.info.time,
        cost: this.props.info.cost
      });
    };

    this.updateTime = (e) => {
      this.props.updateExecutiveSummary({
        problem: this.props.info.problem,
        vision: this.props.info.vision,
        time: Number(e.target.value),
        cost: this.props.info.cost
      });
    };

    this.updateCost = (e) => {
      this.props.updateExecutiveSummary({
        problem: this.props.info.problem,
        vision: this.props.info.vision,
        time: this.props.info.time,
        cost: Number(e.target.value)
      });
    };
  }

  render() {
    return (
      <Section name="Executive summary">
        <p>
          Your executive summary should clearly and concisely communicate the
          gist of your overall project.
        </p>

        <p>
          <span className="small bold">Problem space</span>
          <br />
          <span className="small">
            Briefly describe the problem(s) your project is trying to solve.
          </span>
          <br />
          <TextArea value={this.props.info.problem} onChange={this.updateProblem} />
        </p>

        <p>
          <span className="small bold">Project vision</span>
          <br />
          <span className="small">
            A two-sentence high level description of what you want your
            project to achieve.
          </span>
          <br />
          <TextArea value={this.props.info.vision} onChange={this.updateVision} />
          <span className="small">
            If you&rsquo;re not sure about the goal(s) of the project, please reach
            out to the other people on your APD team.
          </span>
        </p>

        <p>
          <span className="small bold">Time investment</span>
          <br />
          <span className="small shift up">
            This project is expected to take approximately
            <input type="number" className="short" value={this.props.info.time} onChange={this.updateTime} />
            months
          </span>
        </p>

        <p>
          <span className="small bold">Total cost</span>
          <br />
          <span className="small shift up">
            This project will cost approximately
            <span className="input-with-dollar">
              <input type="number" className="short dollar" value={this.props.info.cost} onChange={this.updateCost} />
            </span>
          </span>
        </p>
      </Section>
    );
  }
}

ExecutiveSummary.propTypes = {
  info: PropTypes.shape({
    problem: PropTypes.string.isRequired,
    vision: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    cost: PropTypes.number.isRequired
  }).isRequired,
  updateExecutiveSummary: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  updateExecutiveSummary(newExecutiveSummary) {
    dispatch(IAPDActions.updateExecutiveSummary(newExecutiveSummary));
  }
});

export default connect(null, mapDispatchToProps)(ExecutiveSummary);
