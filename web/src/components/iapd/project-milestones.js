import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Section from '../collapsible';
import Milestone from './project-milestone';
import { IAPD as IAPDActions } from '../../actions';

class ProjectMilestones extends React.Component {
  constructor(props) {
    super(props);

    this.updateMilestone = (e) => {
      const newList = [...this.props.milestones];
      newList[Number(e.target.name)] = e.target.value;
      this.props.update(newList);
    };

    this.addMilestone = (e) => {
      e.preventDefault();
      this.props.addMilestone();
    };
  }

  render() {
    return (
      <Section name="Project milestones">
        <p>
          In the context of this APD, a project milestone is a mid-process
          accomplishment that contributes to the larger project vision. Not
          all milestones are accompanied by deliverables, although many are.
        </p>

        {this.props.milestones.map((m, i) => <Milestone key={m.id} number={i + 1} name={`${i}`} outcomes={this.props.outcomes} milestone={m} onChange={this.updateMilestone} />)}

        <a href="" onClick={this.addMilestone}>Add a project milestone +</a>
      </Section>
    );
  }
}

ProjectMilestones.propTypes = {
  milestones: PropTypes.arrayOf(PropTypes.shape({
    description: PropTypes.string.isRequired,
    activities: PropTypes.string.isRequired,
    associatedOutcomes: PropTypes.arrayOf(PropTypes.string).isRequired,
    mitaAreas: PropTypes.arrayOf(PropTypes.string).isRequired,
    cost: PropTypes.number.isRequired,
    defineSuccess: PropTypes.string.isRequired
  })).isRequired,
  outcomes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired,
  update: PropTypes.func.isRequired,
  addMilestone: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  update(newMilestones) {
    dispatch(IAPDActions.updateProjectMilestones(newMilestones));
  },
  addMilestone() {
    dispatch(IAPDActions.addProjectMilestone());
  }
});

export default connect(null, mapDispatchToProps)(ProjectMilestones);
