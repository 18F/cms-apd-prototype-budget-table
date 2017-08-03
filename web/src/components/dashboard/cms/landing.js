import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Map from 'react-us-state-map';

const render = props => (
  <div className="cms dashboard">
    <header>
      <h3>CMS MMIS <small>overview</small></h3>
    </header>

    <h3>Pick a state</h3>

    <Map onClick={state => props.history.push(`${props.match.path}${state}`)} />
  </div>
);

render.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter(render);
