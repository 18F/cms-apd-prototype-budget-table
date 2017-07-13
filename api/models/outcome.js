module.exports = (sequelize, DataTypes) => {
  const outcome = sequelize.define('outcome', {
    text: DataTypes.STRING
  });
  return outcome;
};
