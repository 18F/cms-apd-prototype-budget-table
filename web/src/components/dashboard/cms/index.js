import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import Landing from './landing';
import ReviewRequest from './review';

const render = props => (
  <div className="cms dashboard">
    <Route exact path={`${props.match.path}/`} component={Landing} />
    <Route exact path={`${props.match.path}/review/:requestID`} component={ReviewRequest} />
  </div>
);
render.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string.isRequired
  }).isRequired
};

export default withRouter(render);
