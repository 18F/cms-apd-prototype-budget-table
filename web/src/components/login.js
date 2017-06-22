import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';

class LoginComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.loginHandler = this.loginHandler.bind(this);
  }

  loginHandler(e) {
    e.preventDefault();
    if (this.state.username === 'cms') {
      this.props.history.push('/dashboard/cms');
    } else {
      this.props.history.push('/dashboard/state');
    }
  }

  render() {
    return (
      <div className="component login">
        <form className="usa-form">
          <fieldset>
            <legend className="usa-drop_text">Sign in</legend>
            <span>or <a>create an account</a></span>

            <label htmlFor="sign-in-username">Username or email address</label>
            <input id="sign-in-username" name="username" type="text" value={this.state.username} onChange={event => this.setState({ username: event.target.value })} autoCapitalize="off" autoCorrect="off" />

            <label htmlFor="sign-in-password">Password</label>
            <input id="sign-in-password" name="password" type="password" value={this.state.password} onChange={event => this.setState({ password: event.target.value })} />
            <p className="usa-form-note">
              <a title="Show password" className="usa-show_password" aria-controls="sign-in-password">
                Show password
              </a>
            </p>

            <input type="submit" value="Sign in" onClick={this.loginHandler} />

            <p><a title="Forgot username">
              Forgot username?</a></p>
            <p><a title="Forgot password">
              Forgot password?</a></p>
          </fieldset>
        </form>
      </div>
    );
  }
}

LoginComponent.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withRouter(LoginComponent);
