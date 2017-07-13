const fakeData = require('../fake-data');

function getRequests() {
  return new Promise((resolve) => {
    resolve(fakeData.requests);
  });
}

function getCategoryTotalCost(category) {
  return category.years.reduce((sum, ffy) => sum + ffy.total, 0);
}

function getRequestTotalCost(request) {
  return request.costs.reduce((sum, category) => sum + getCategoryTotalCost(category), 0);
}

module.exports = function requestReviewRoutes(app) {
  app.get('/review/requests', (req, res) => getRequests()
    .then(allRequests => res.send(allRequests.map(request => ({
      id: request.id,
      name: request.name,
      state: request.state,
      total: getRequestTotalCost(request)
    }))))
    .catch(err => res.status(500).send(err))
  );

  app.get('/review/requests/:requestID', (req, res) => {
    const requestID = req.params.requestID;
    return getRequests()
      .then((allRequests) => {
        const foundRequest = allRequests.find(request => request.id === requestID);
        if (foundRequest) {
          res.send(foundRequest);
        } else {
          res.status(404).send(`No financial request with ID '${req.params.requestID}' found`);
        }
      })
      .catch((err) => {
        res.status(500).send(err);
      });
  });
};
