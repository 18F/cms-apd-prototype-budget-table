import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { IAPD as IAPDActions } from '../../actions';
import Section from '../collapsible';
import Outcome from './project-outcome';
import TextArea from '../textarea';

class ProjectPlan extends React.Component {
  constructor(props) {
    super(props);

    this.updateVision = (value) => {
      this.props.update({
        vision: value,
        outcomes: this.props.outcomes
      });
    };

    this.updateOutcome = (index, title, metric) => {
      const newOutcomes = [...this.props.outcomes];
      newOutcomes[index] = { title, metric };
      this.props.update({
        vision: this.props.vision,
        outcomes: newOutcomes
      });
    };
  }

  render() {
    return (
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
          <TextArea value={this.props.vision} onChange={this.updateVision} />
        </p>

        <h3>Project outcomes</h3>
        <p>
          Provide short, detailed descriptions of each smaller goal that
          contributes to the overall project goal, along with metrics
          for tracking the success of each.
        </p>

        {this.props.outcomes.map((o, i) => <Outcome key={o.title || i} index={i} outcome={o} onChange={this.updateOutcome} />)}

        <p>
          <a href="">Add an outcome +</a>
        </p>
      </Section>
    );
  }
}

ProjectPlan.propTypes = {
  vision: PropTypes.string,
  outcomes: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    metrics: PropTypes.string.isRequired
  })).isRequired,
  update: PropTypes.func.isRequired
};

ProjectPlan.defaultProps = {
  vision: ''
};

const mapDispatchToProps = dispatch => ({
  update(newProjectPlan) {
    dispatch(IAPDActions.updateProjectPlan(newProjectPlan));
  }
});

export default connect(null, mapDispatchToProps)(ProjectPlan);
