import { api, removeAPIHeader } from '../api';

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

export const Spenddown = {
  messages: {
    SET_CLIENT_INFO: 'set client spend down info'
  }
};

export const DCN = {
  messages: {
    CHECK_DCN: 'check dcn',
    INVALID_DCN: 'dcn is invalid',
    DCN_NOT_FOUND: 'dcn is not found'
  },

  checkDCN(dcn) {
    if (dcn) {
      return (dispatch) => {
        api().get(`/client/${dcn}/`).then((res) => {
          switch (res.status) {
            case 200:
              dispatch({ type: Spenddown.messages.SET_CLIENT_INFO, client: res.body });
              break;

            default:
              dispatch({ type: DCN.messages.INVALID_DCN });
              break;
          }
          dispatch({ type: DCN.messages.CHECK_DCN });
        });
      };
    }

    return { type: DCN.messages.INVALID_DCN };
  }
};

export default {
  Login,
  DCN
};
