import updeep from 'updeep';
import shape from './shape/';
import { Projects, Requests } from '../actions';

import iapdReducer from './iapd';

const stateShape = shape.app;

export default function reducer(state = stateShape, action) {
  let newState = state;

  newState = updeep({ currentRequest: iapdReducer(state.currentRequest, action) }, newState);

  switch (action.type) {
    case Requests.messages.START_NEW_REQUEST:
      newState = updeep({ currentRequest: shape.request() }, newState);
      break;

    case Projects.messages.SET_PROJECTS:
      newState = updeep({ projects: action.projects }, newState);
      break;

    case Requests.messages.SET_CURRENT_REQUEST:
      newState = updeep({ currentRequest: action.request }, newState);
      break;

    case Requests.messages.SET_OPEN_REQUESTS:
      newState = updeep({ openRequests: action.requests }, newState);
      break;

    case Requests.messages.UPDATE_COST:
      newState = updeep({ currentRequest: { costs: { [action.property]: action.value } } }, newState);
      break;

    default:
      break;
  }

  return newState;
}
