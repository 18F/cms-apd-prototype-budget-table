const fakeData = require('./fake-data');

module.exports = function requestReviewRoutes(app) {
  app.get('/projects', (req, res) => (new Promise((resolve) => {
    res.send(fakeData.projects);
    resolve();
  })));
};
