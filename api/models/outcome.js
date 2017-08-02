module.exports = (sequelize, DataTypes) => {
  const outcome = sequelize.define('outcome', {
    text: DataTypes.STRING
  });

  outcome.associate = (models) => {
    outcome.hasMany(models.activity, { as: 'activities' });
  };

  outcome.prototype.getFullObject = function getFullObject() {
    const obj = {
      id: this.id,
      priority: 1,
      outcome: this.text,
      example: '',
      measures: ''
    };

    return this.getActivities()
      .then(activities => Promise.all(activities.map(activity => activity.getFullObject())))
      .then(activities => (obj.activities = activities))
      .then(() => obj);
  };

  return outcome;
};
