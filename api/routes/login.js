const tokens = require('../tokens');

const user = {
  realName: 'Jane Doe',
  role: 'participant',
  eligibility: { }
};

module.exports = function loginRoute(app) {
  app.get('/login', (req, res) => {
    if (req.user) {
      res.send(Object.assign({ token: req.headers.authorization }, user));
    } else {
      res.status(401).send('Not logged in');
    }
  });

  app.post('/login', (req, res) => {
    // Build a claims token from the user identity
    const identity = {
      id: 'abc123',
      username: req.body.username,
      claims: []
    };
    const token = tokens.createTokenFromUser(identity);

    res.send(Object.assign({ token }, user));
  });
};
