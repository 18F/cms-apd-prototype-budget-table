const bodyParser = require('body-parser');
const corsMiddleware = require('./cors');
const tokenMiddleware = require('./token');
const schema = require('../schema/api.json');

module.exports = function middleware(app) {
  corsMiddleware(app, schema);
  tokenMiddleware(app);

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
};
