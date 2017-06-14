const loginRoute = require('./login');
const clientRoutes = require('./client');

module.exports = function routes(app) {
  loginRoute(app);
  clientRoutes(app);
};
