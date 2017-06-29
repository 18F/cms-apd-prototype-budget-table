const fs = require('fs');
const path = require('path');

function getRequests() {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, 'requests-data.json'), { encoding: 'utf8' }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const requests = JSON.parse(data);
          resolve(requests);
        } catch (e) {
          reject(e);
        }
      }
    });
  });
}

module.exports = function requestReviewRoutes(app) {
  app.get('/review/requests', (req, res) => getRequests()
    .then(allRequests => res.send(allRequests.map(request => ({ id: request.id, name: request.name }))))
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
