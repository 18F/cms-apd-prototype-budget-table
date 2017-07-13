import updeep from 'updeep';
import { Projects, Requests } from '../actions';

const stateShape = {
  currentRequest: false,
  openRequests: false,
  projects: false
};

export default function reducer(state = stateShape, action) {
  let newState = state;

  switch (action.type) {
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
