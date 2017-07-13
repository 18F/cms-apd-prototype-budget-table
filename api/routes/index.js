const loginRoute = require('./login');
const projectsRoutes = require('./projects');
const requestsRoutes = require('./review/requests');

module.exports = function routes(app) {
  loginRoute(app);
  projectsRoutes(app);
  requestsRoutes(app);
};
