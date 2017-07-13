const db = require('../../models');

function getCategoryTotalCost(category) {
  return category.years.reduce((sum, ffy) => sum + ffy.total, 0);
}

function getRequestTotalCost(request) {
  return request.costs.reduce((sum, category) => sum + getCategoryTotalCost(category), 0);
}

module.exports = function requestReviewRoutes(app) {
  app.get('/review/requests', (req, res) => db.funding_request.findAll()
    .then(allRequests => res.send(allRequests.map(request => ({
      id: request.requestID,
      name: request.name,
      state: request.state,
      total: getRequestTotalCost(request)
    }))))
    .catch(err => res.status(500).send(err))
  );

  app.get('/review/requests/:requestID', (req, res) => {
    const requestID = req.params.requestID;
    return db.funding_request.findOne({ where: { requestID } })
      .then((foundRequest) => {
        if (foundRequest) {
          foundRequest.getFullObject().then(o => res.send(o));
        } else {
          res.status(404).send(`No financial request with ID '${req.params.requestID}' found`);
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
};
