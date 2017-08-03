import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';
import TextArea from '../../textarea';

class Milestone extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.milestone.id,
      description: props.milestone.description,
      activities: props.milestone.activities,
      associatedOutcomes: props.milestone.associatedOutcomes,
      mitaAreas: props.milestone.mitaAreas,
      cost: props.milestone.cost,
      defineSuccess: props.milestone.defineSuccess
    };

    this.mitaBusinessAreas = [
      'Client Management',
      'Provider/Contractor Management',
      'Operations Management',
      'Program Management',
      'Care Management',
      'Business Relationship Management',
      'Accountability Management'
    ];

    const onChange = debounce(props.onChange, 200);
    const triggerChange = () => { onChange({ target: { name: this.props.name, value: this.state } }); };

    this.updateString = (e) => {
      this.setState({ [e.target.name]: e.target.value }, triggerChange);
    };

    this.updateNumber = (e) => {
      this.setState({ [e.target.name]: Number(e.target.value) }, triggerChange);
    };

    this.updateArray = (e) => {
      const targetArray = [...this.state[e.target.name]];
      const value = e.target.value;

      if (!e.target.checked && targetArray.includes(value)) {
        const index = targetArray.indexOf(value);
        targetArray.splice(index, 1);
      } else if (e.target.checked && !targetArray.includes(value)) {
        targetArray.push(value);
      }

      this.setState({ [e.target.name]: targetArray }, triggerChange);
    };
  }

  render() {
    return (
      <div className="milestone">
        <h3>Project milestone {this.props.number}</h3>

        <p>
          Describe this project milestone in one sentence
          <br />
          <input type="text" value={this.state.description} name="description" onChange={this.updateString} />
        </p>

        <p>
          What activities or workstreams are needed to achieve this project milestone?
          <br />
          <input type="text" value={this.state.activities} name="activities" onChange={this.updateString} />
        </p>

        {this.props.outcomes.length > 0 ? (
          <div className="checklist">
            <p>
              Which outcome(s) does this milestone support?
            </p>
            {this.props.outcomes.map(outcome => (<div className="checkbox" key={outcome.id}><input type="checkbox" id={`_project_milestone_outcome_${outcome.id}`} value={outcome.id} name="associatedOutcomes" onChange={this.updateArray} /><label htmlFor={`_project_milestone_outcome_${outcome.id}`}>{outcome.title}</label></div>))}
          </div>
        ) : null }

        <div className="checklist">
          <p>
            Which MITA business areas are part of this milestone?
          </p>
          {this.mitaBusinessAreas.map(area => (<div className="checkbox" key={area}><input type="checkbox" id={`_project_milestone_mita_${area}`} value={area} name="mitaAreas" onChange={this.updateArray} /><label htmlFor={`_project_milestone_mita_${area}`}>{area}</label></div>))}
        </div>

        <p>
          How much will it cost to reach this milestone?
          <span className="input-with-dollar">
            <input type="number" className="short dollar" value={this.state.cost} name="cost" onChange={this.updateNumber} />
          </span>
        </p>

        <p>
          How will you define success for this milestone?
          <TextArea value={this.props.milestone.defineSuccess} name="defineSuccess" onChange={this.updateString} />
        </p>
      </div>
    );
  }
}

Milestone.propTypes = {
  milestone: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    activities: PropTypes.string.isRequired,
    associatedOutcomes: PropTypes.arrayOf(PropTypes.string).isRequired,
    mitaAreas: PropTypes.arrayOf(PropTypes.string).isRequired,
    cost: PropTypes.number.isRequired,
    defineSuccess: PropTypes.string.isRequired
  }).isRequired,
  outcomes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })).isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.number,
  onChange: PropTypes.func
};

Milestone.defaultProps = {
  number: 1,
  onChange: () => { }
};

export default Milestone;
