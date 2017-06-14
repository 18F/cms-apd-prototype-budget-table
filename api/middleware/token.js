const tokens = require('../tokens');

module.exports = function token(app) {
  app.use((req, res, next) => {
    // Disable the reassignment rule here because we actually
    // do want to modify the req object.
    delete req.user; // eslint-disable-line no-param-reassign

    if (req.headers.authorization) {
      try {
        // Attach the user object to the request, so it can
        // easily be checked elsewhere.  Disable the eslint
        // rule because this is in fact what we want.
        req.user = tokens.getUserFromToken(req.headers.authorization); // eslint-disable-line no-param-reassign
      } catch (e) {
        // If there's an authorization token that we can't
        // verify, send back a 401 and bail out of the
        // request altogether.
        res.status(401).send('Invalid token');

        // [TODO] Remove this, replace with proper logging.
        console.log(e); // eslint-disable-line no-console

        return;
      }
    }
    next();
  });
};
