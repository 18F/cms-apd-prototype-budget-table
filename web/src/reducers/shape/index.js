import request from './request';

export default {
  request,
  app: {
    currentRequest: request,
    openRequests: false,
    projects: false
  }
};
