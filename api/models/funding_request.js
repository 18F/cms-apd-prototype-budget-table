module.exports = (sequelize, DataTypes) => {

  const prose = sequelize.define('prose', {
    section: DataTypes.STRING,
    text: DataTypes.STRING
  });

  const outcome = sequelize.define('outcome', {
    text: DataTypes.STRING
  });

  const activity = sequelize.define('activity', {
    description: DataTypes.STRING,
    howItSupportsTheOutcome: { type: DataTypes.STRING, field: 'how_it_supports' }
  });

  const fundingRequest = sequelize.define('funding_request', {
    requestID: { type: DataTypes.STRING, field: 'request_id' },
    name: DataTypes.STRING,
    state: DataTypes.STRING
  }, {
    // classMethods: {
    //   associate(models) {
    //     // associations can be defined here
    //   }
    // }
  });

  outcome.hasMany(activity, { as: 'activities' });

  fundingRequest.hasMany(prose, { as: 'prose' });
  fundingRequest.hasMany(outcome, { as: 'outcomes' });

  return fundingRequest;
};
