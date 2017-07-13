const db = require('../models');

module.exports = function requestReviewRoutes(app) {
  app.get('/projects', (req, res) =>
    db.project.findAll()
      .then(projects => Promise.all(projects.map(project => project.getFullObject())))
      .then(projects => res.send(projects))
  );
};
