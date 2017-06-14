import updeep from 'updeep';
import cookies from 'react-cookie';
import { hashHistory } from 'react-router';
import { Login as LoginActions, Spenddown as SpenddownActions, DCN as DCNActions } from '../actions';
import { setAPIHeader, removeAPIHeader } from '../api';

const stateShape = {
  user: false,
  participants: [],
  dcn: {
    error: null
  },
  spenddown: null
};

export default function reducer(state = stateShape, action) {
  let newState = state;

  switch (action.type) {
    case LoginActions.messages.SET_USER:
      newState = updeep({ user: action.user }, newState);
      cookies.save('token', action.user.token);
      setAPIHeader('Authorization', action.user.token);
      break;

    case LoginActions.messages.LOGOUT:
      newState = updeep({ user: false }, newState);
      cookies.remove('token');
      removeAPIHeader('Authorization');
      hashHistory.replace('/');
      break;

    case SpenddownActions.messages.SET_CLIENT_INFO:
      {
        newState = updeep({ spenddown: action.client }, state);
        const target = `/spenddown/${action.client.dcn}`;
        if (target !== hashHistory.getCurrentLocation()) {
          setTimeout(() => hashHistory.push(`/spenddown/${action.client.dcn}`), 1);
        }
      }
      break;

    case DCNActions.messages.INVALID_DCN:
    case DCNActions.messages.DCN_NOT_FOUND:
      newState = updeep({ dcn: { error: 'Client was not found' } }, newState);
      break;

    default:
      break;
  }

  return newState;
}
