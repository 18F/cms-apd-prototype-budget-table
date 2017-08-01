import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import debounce from 'debounce';
import TextArea from '../../textarea';
import { IAPD as IAPDActions } from '../../../actions';

class Person extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.person.id,
      name: props.person.name,
      email: props.person.email,
      percentTime: props.person.percentTime,
      responsibilities: props.person.responsibilities
    };

    this.triggerUpdate = debounce(() => {
      if (this.props.index < 0) {
        this.props.updateDirector(this.state);
      } else {
        this.props.updateKeyStaff(this.props.index, this.state);
      }
    }, 200);

    this.updateText = (e) => {
      this.setState({ [e.target.name]: e.target.value }, this.triggerUpdate);
    };

    this.updateNumber = (e) => {
      this.setState({ [e.target.name]: Number(e.target.value) }, this.triggerUpdate);
    };

    this.updateResponsibilities = (responsibilities) => {
      this.setState({ responsibilities }, this.triggerUpdate);
    };
  }

  render() {
    return (
      <div className="staff">
        <span className="small bold">{this.props.title}</span>
        <label htmlFor={`person_name_${this.props.person.id}`}>
          Name
          <input type="text" value={this.state.name} id={`person_name_${this.props.person.id}`} name="name" onChange={this.updateText} />
        </label>

        <label htmlFor={`person_email_${this.props.person.id}`}>
          Email
          <input type="text" value={this.state.email} id={`person_email_${this.props.person.id}`} name="email" onChange={this.updateText} />
        </label>

        <label htmlFor={`person_time_${this.props.person.id}`}>
          % weekly time allocated to this project
          <input className="short" type="number" value={this.state.percentTime} id={`person_time_${this.props.person.id}`} name="percentTime" onChange={this.updateNumber} />
        </label>
        <br />
        Key job responsibilities (separate using commas)
        <TextArea value={this.state.responsibilities} onChange={this.updateResponsibilities} />
      </div>
    );
  }
}

Person.propTypes = {
  index: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  person: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    percentTime: PropTypes.number.isRequired,
    responsibilities: PropTypes.string.isRequired
  }).isRequired,
  updateDirector: PropTypes.func.isRequired,
  updateKeyStaff: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  updateDirector(newDirector) {
    dispatch(IAPDActions.updateStaffingDirector(newDirector));
  },
  updateKeyStaff(staffIndex, newStaff) {
    dispatch(IAPDActions.updateStaffingKeyStaff(staffIndex, newStaff));
  }
});

export default connect(null, mapDispatchToProps)(Person);
