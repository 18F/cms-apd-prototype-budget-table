import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Section from '../../collapsible';
import Outcome from './project-outcome';
import TextArea from '../../textarea';
import { IAPD as IAPDActions } from '../../../actions';

class ProjectPlan extends React.Component {
  constructor(props) {
    super(props);

    this.updateVision = (value) => {
      this.props.update({
        vision: value,
        outcomes: this.props.outcomes
      });
    };

    this.updateOutcome = (index, title, metrics) => {
      const newOutcomes = [...this.props.outcomes];
      newOutcomes[index] = { id: newOutcomes[index].id, title, metrics };
      this.props.update({
        vision: this.props.vision,
        outcomes: newOutcomes
      });
    };

    this.addOutcome = (e) => {
      e.preventDefault();
      this.props.addOutcome();
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

        {this.props.outcomes.map((o, i) => <Outcome key={o.id} index={i} outcome={o} onChange={this.updateOutcome} />)}

        <p>
          <a href="" onClick={this.addOutcome}>Add an outcome +</a>
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
  update: PropTypes.func.isRequired,
  addOutcome: PropTypes.func.isRequired
};

ProjectPlan.defaultProps = {
  vision: ''
};

const mapStateToProps = state => ({
  vision: state.currentRequest.plan.vision,
  outcomes: state.currentRequest.plan.outcomes
});

const mapDispatchToProps = dispatch => ({
  update(newProjectPlan) {
    dispatch(IAPDActions.updateProjectPlan(newProjectPlan));
  },
  addOutcome() {
    dispatch(IAPDActions.addProjectOutcome());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectPlan);
