const loginRoute = require('./login');
const projectsRoutes = require('./projects');
const requestsRoutes = require('./review/requests');
const iapdRoutes = require('./iapd');

module.exports = function routes(app) {
  loginRoute(app);
  projectsRoutes(app);
  requestsRoutes(app);
  iapdRoutes(app);
};
