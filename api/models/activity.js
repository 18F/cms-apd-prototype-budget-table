module.exports = (sequelize, DataTypes) => {
  const activity = sequelize.define('activity', {
    description: DataTypes.STRING,
    howItSupportsTheOutcome: { type: DataTypes.STRING, field: 'how_it_supports' }
  });

  activity.prototype.getFullObject = function getFullObject() {
    return Promise.resolve({
      id: this.id,
      outcome: this.outcomeId,
      description: this.description,
      howItSupportsTheOutcome: this.howItSupportsTheOutcome
    });
  };

  return activity;
};
