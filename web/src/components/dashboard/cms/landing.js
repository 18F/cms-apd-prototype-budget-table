import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import Map from './state-map';

const render = props => (
  <Map onClick={state => props.history.push(`${props.match.path}${state}`)} />
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
