import updeep from 'updeep';
import { Requests } from '../actions';

const stateShape = {
  currentRequest: {
    id: 'FR-MMIS-2017-01-R01',
    costs: {
      ddiInternal: 0,
      ddiExternal: 0,
      omInternal: 0,
      omExternal: 0,
      otherInternal: 0,
      otherExternal: 0,
      otherInteragency: 0
    }
  },
  openRequests: [{
    id: '1',
    name: 'first request'
  }]
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
