import React from 'react';
import { withRouter } from 'react-router';
import { Route } from 'react-router-dom';

import StateDashboard from './dashboard-state';
import CMSDashboard from './dashboard-cms';

export default withRouter((props) => {
  console.log(props)
  return (
    <div>
      <Route path={`${props.match.path}/state`} component={StateDashboard} />
      <Route path={`${props.match.path}/cms`} component={CMSDashboard} />
    </div>
  );
});
