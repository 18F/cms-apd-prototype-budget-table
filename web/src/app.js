import 'uswds';
import 'whatwg-fetch';

import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import '../node_modules/uswds/src/stylesheets/uswds.scss';
import './styles/main.scss';

import { Login, Dashboard } from './components';

import reducers from './reducers';

const stateStore = createStore(
  reducers,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={stateStore}>
    <Router>
      <div>
        <main>
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Login} />
        </main>
      </div>
    </Router>
  </Provider>,
  document.getElementById('content')
);
