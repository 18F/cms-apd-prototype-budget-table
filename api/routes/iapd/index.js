const cache = require('./cache');

module.exports = function iapdRoutes(app) {
  app.get('/iapd', (req, res) => {
    res.send(cache.all().map(apd => ({
      id: apd.id,
      state: apd.state,
      status: apd.status,
      reviewRemaining: apd.reviewRemaining
    })));
  });

  app.get('/iapd/:id', (req, res) => {
    const iapd = cache.get(req.params.id);
    if (iapd) {
      res.send(iapd);
    } else {
      res.sendStatus(404);
    }
  });

  app.post('/iapd', (req, res) => {
    cache.update(req.body);
    res.send(req.body);
  });
};
