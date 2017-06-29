import { api, removeAPIHeader } from '../api';

export const Requests = {
  messages: {
    SET_OPEN_REQUESTS: 'requests: set open requests',
    UPDATE_COST: 'requests: update cost'
  },

  updateCost(property, value) {
    return { type: Requests.messages.UPDATE_COST, property, value };
  }
};

export const API = {
  messages: {
    FETCH_STATE_OPEN_REQUESTS: 'api: fetch open requests for a state'
  },

  fetchOpenStateRequests(stateID) {
    return (dispatch) => {
      api().get(`/state/${stateID}/open/`).then((res) => {
        dispatch({ type: Requests.SET_OPEN_REQUESTS, requests: res.body });
      });
    };
  }
};

export const Login = {
  messages: {
    SET_USER: 'set user object',
    LOGOUT: 'log user out'
  },

  login(username, password) {
    return (dispatch) => {
      api().post('/login', { body: { username, password } }).then((res) => {
        dispatch({ type: Login.messages.SET_USER, user: res.body });
      });
    };
  },

  logout() {
    return { type: Login.messages.LOGOUT };
  },

  getUserInfo() {
    return (dispatch) => {
      api().get('/login').then((res) => {
        if (res.status === 200) {
          dispatch({ type: Login.messages.SET_USER, user: res.body });
        } else {
          removeAPIHeader('Authorization');
        }
      });
    };
  }
};

export default {
  Login
};
