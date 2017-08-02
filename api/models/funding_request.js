module.exports = (sequelize, DataTypes) => {
  const fundingRequest = sequelize.define('funding_request', {
    requestID: { type: DataTypes.STRING, field: 'request_id' },
    name: DataTypes.STRING,
    state: DataTypes.STRING
  });

  fundingRequest.associate = (models) => {
    fundingRequest.hasMany(models.prose, { as: 'prose' });
    fundingRequest.hasMany(models.outcome, { as: 'outcomes' });
    fundingRequest.hasMany(models.cost, { as: 'costs' });
  };

  fundingRequest.prototype.getFullObject = function getFullObject() {
    const obj = {
      id: this.requestID,
      name: this.name,
      submitters: [],
      submitted: this.createdAt.toISOString().substr(0, 10),
      prose: {},
      outcomes: [],
      activities: [],
      costs: [],
      mdbt: {
        development: {
          internal: 0,
          external: 0
        },
        operations: {
          internal: 0,
          external: 0
        },
        other: {
          internal: 0,
          external: 0,
          interagency: 0
        }
      }
    };

    const awaiting = [];

    awaiting.push(this.getProse()
      .then((proses) => {
        for (const prose of proses) {
          obj.prose[prose.section] = prose.text;
        }
      }));

    awaiting.push(this.getCosts()
      .then(costs => Promise.all(costs.map(cost => cost.getFullObject())))
      .then((costs) => {
        for (const cost of costs) {
          let requestCost = obj.costs.find(reqCost => (reqCost.category === cost.category && reqCost.ffp === cost.ffp && reqCost.expenseType === cost.expenseType));
          if (!requestCost) {
            requestCost = {
              category: cost.category,
              type: cost.type,
              ffp: cost.ffp,
              years: []
            };
            obj.costs.push(requestCost);
          }

          requestCost.years.push({
            ffy: cost.ffy,
            total: cost.cost
          });
        }
      })
    );

    awaiting.push(this.getOutcomes()
      .then(outcomes => Promise.all(outcomes.map(outcome => outcome.getFullObject())))
      .then(outcomes => (obj.outcomes = outcomes))
      .then(() => {
        for (const outcome of obj.outcomes) {
          for (const activity of outcome.activities) {
            if (!obj.activities.find(foundActivity => foundActivity.id === activity.id)) {
              obj.activities.push(activity);
            }
          }
        }
      })
    );

    return Promise.all(awaiting).then(() => obj);
  };

  return fundingRequest;
};
