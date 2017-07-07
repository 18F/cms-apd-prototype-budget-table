const loginRoute = require('./login');
const requestsRoutes = require('./review/requests');

module.exports = function routes(app) {
  loginRoute(app);
  requestsRoutes(app);
};
