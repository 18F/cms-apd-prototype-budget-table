import { api, removeAPIHeader, getRequests, getRequest } from '../api';

export const Requests = {
  messages: {
    SET_CURRENT_REQUEST: 'requests: set current request',
    SET_OPEN_REQUESTS: 'requests: set open requests',
    UPDATE_COST: 'requests: update cost'
  },

  updateCost(property, value) {
    return { type: Requests.messages.UPDATE_COST, property, value };
  },

  setCurrentRequest(requestID) {
    return (dispatch) => {
      getRequest(requestID).then((request) => {
        dispatch({ type: Requests.messages.SET_CURRENT_REQUEST, request });
      });
    };
  },

  getOpenRequests() {
    return (dispatch) => {
      getRequests().then((requests) => {
        dispatch({ type: Requests.messages.SET_OPEN_REQUESTS, requests });
      });
    };
  }
};

export const API = {
  messages: {
    GET_STATE_OPEN_REQUESTS: 'api: fetch open requests for a state'
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

export default { Requests, Login };
