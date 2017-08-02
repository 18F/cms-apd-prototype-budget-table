module.exports = (sequelize, DataTypes) => {
  const prose = sequelize.define('prose', {
    section: DataTypes.STRING,
    text: DataTypes.STRING
  });
  return prose;
};
