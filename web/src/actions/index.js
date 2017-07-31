import { api, removeAPIHeader, getProjects, getRequests, getRequest } from '../api';

export const IAPD = {
  messages: {
    UPDATE_EXECUTIVE_SUMMARY: 'IAPD: update executive summary',
    UPDATE_PROJECT_PLAN: 'IAPD: update project plan'
  },

  updateExecutiveSummary(newExecutiveSummary) {
    return { type: IAPD.messages.UPDATE_EXECUTIVE_SUMMARY, executiveSummary: newExecutiveSummary };
  },

  updateProjectPlan(newProjectPlan) {
    return { type: IAPD.messages.UPDATE_PROJECT_PLAN, projectPlan: newProjectPlan };
  }
};

export const Projects = {
  messages: {
    SET_PROJECTS: 'projects: set projects'
  },

  getProjects() {
    return (dispatch) => {
      getProjects().then((projects) => {
        dispatch({ type: Projects.messages.SET_PROJECTS, projects });
      });
    };
  }
};

export const Requests = {
  messages: {
    START_NEW_REQUEST: 'requests: start new request',
    SET_CURRENT_REQUEST: 'requests: set current request',
    SET_OPEN_REQUESTS: 'requests: set open requests',
    UPDATE_COST: 'requests: update cost'
  },

  updateCost(property, value) {
    return { type: Requests.messages.UPDATE_COST, property, value };
  },

  startNewRequest() {
    return { type: Requests.messages.START_NEW_REQUEST };
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
