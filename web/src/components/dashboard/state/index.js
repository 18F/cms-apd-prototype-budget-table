import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import Landing from './landing';
import NewRequest from './new-request';

const render = props => (
  <div className="state dashboard">
    <Route exact path={`${props.match.path}/`} component={Landing} />
    <Route exact path={`${props.match.path}/request`} component={NewRequest} />
  </div>
);
render.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter(render);
