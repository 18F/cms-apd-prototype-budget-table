import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextArea from '@18f/redux-textarea-debounce';
import Section from '../../collapsible';
import { IAPD as IAPDActions } from '../../../actions';

import Person from './person';

class StaffingRequirements extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      neededSkills: props.staffing.other.neededSkills,
      internalStaff: props.staffing.other.internalStaff,
      externalStaff: props.staffing.other.externalStaff,
      anyCostAllocated: props.staffing.other.anyCostAllocated,
      anyCostAllocatedString: '',
      costAllocatedStaff: props.staffing.other.costAllocatedStaff,
      totalAllocationCosts: props.staffing.other.totalAllocationCosts,
      costAllocationMethodologies: props.staffing.other.costAllocationMethodologies
    };

    if (this.state.anyCostAllocated === true) {
      this.state.anyCostAllocatedString = 'Yes';
    } else if (this.state.anyCostAllocated === false) {
      this.state.anyCostAllocatedString = 'No';
    }

    this.triggerChange = () => {
      this.props.updateOtherStaffing(this.state);
    };

    this.updateNumber = (e) => {
      this.setState({ [e.target.name]: Number(e.target.value) }, this.triggerChange);
    };

    this.updateText = (e) => {
      this.setState({ [e.target.name]: e.target.value }, this.triggerChange);
    };

    this.updateAnyCostAllocated = (e) => {
      this.setState({ anyCostAllocated: e.target.value === 'Yes', anyCostAllocatedString: e.target.value }, this.triggerChange);
    };

    this.addKeyPerson = (e) => {
      e.preventDefault();
      this.props.addKeyStaff();
    };

    this.getCostAllocationBits = () => {
      if (this.state.anyCostAllocated === true) {
        return (
          <div>
            <p>
              How many staff or contractors will be cost allocated?
              <input type="number" className="short" value={this.state.costAllocatedStaff} name="costAllocatedStaff" onChange={this.updateNumber} />
            </p>

            <p>
              What are your total allocation costs?
              <span className="input-with-dollar">
                <input type="number" className="short" value={this.state.totalAllocationCosts} name="totalAllocationCosts" onChange={this.updateNumber} />
              </span>
            </p>

            <p>
              Provide a short description (no more than 200 words) of your
              cost-allocation methodologies.
              <TextArea value={this.state.costAllocationMethodologies} name="costAllocationMethodologies" onChange={this.updateText} />
            </p>
          </div>
        );
      }

      return null;
    };
  }

  render() {
    return (
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

        <Person title="Project director" index={-1} person={this.props.staffing.director} />

        {this.props.staffing.keyStaff.map((p, i) => <Person key={p.id} title={`Key staff member #${i + 2}`} index={i} person={p} />)}

        <a href="" onClick={this.addKeyPerson}>Add another key staff member +</a>

        <h3>Broader staffing needs</h3>

        <p>
          Please describe the skills you&rsquo;ll need to complete your project;
          separate individual skills using commas.
          <TextArea value={this.state.neededSkills} name="neededSkills" onChange={this.updateText} />
        </p>

        <p>
          How many internal staff members will work on this project?
          <input type="number" className="short" value={this.state.internalStaff} name="internalStaff" onChange={this.updateNumber} />
        </p>

        <p>
          How many external staff members will work on this project?
          <input type="number" className="short" value={this.state.externalStaff} name="externalStaff" onChange={this.updateNumber} />
        </p>

        <p>
          Will any staff or contractors be cost allocated?
          <select onChange={this.updateAnyCostAllocated} value={this.state.anyCostAllocatedString}>
            <option disabled value="">select YES or NO</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </p>

        {this.getCostAllocationBits()}

      </Section>
    );
  }
}

StaffingRequirements.propTypes = {
  staffing: PropTypes.shape({
    director: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      percentTime: PropTypes.number.isRequired,
      responsibilities: PropTypes.string.isRequired
    }),
    keyStaff: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      percentTime: PropTypes.number.isRequired,
      responsibilities: PropTypes.string.isRequired
    })).isRequired,
    other: PropTypes.shape({
      neededSkills: PropTypes.string.isRequired,
      internalStaff: PropTypes.number.isRequired,
      externalStaff: PropTypes.number.isRequired,
      anyCostAllocated: PropTypes.bool,
      costAllocatedStaff: PropTypes.number,
      totalAllocationCosts: PropTypes.number,
      costAllocationMethodologies: PropTypes.string.isRequired
    })
  }).isRequired,
  updateOtherStaffing: PropTypes.func.isRequired,
  addKeyStaff: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  staffing: state.currentRequest.staffing
});

const mapDispatchToProps = dispatch => ({
  updateOtherStaffing(newOtherStaffing) {
    dispatch(IAPDActions.updateStaffingOther(newOtherStaffing));
  },
  addKeyStaff() {
    dispatch(IAPDActions.addStaffKeyPerson());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StaffingRequirements);
