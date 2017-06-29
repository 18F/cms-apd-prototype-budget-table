import updeep from 'updeep';
import { Requests } from '../actions';

const stateShape = {
  currentRequest: { },
  openRequests: []
};

export default function reducer(state = stateShape, action) {
  let newState = state;

  switch (action.type) {
    case Requests.messages.UPDATE_COST:
      newState = updeep({ currentRequest: { costs: { [action.property]: action.value } } }, newState);
      break;

    default:
      break;
  }

  return newState;
}
