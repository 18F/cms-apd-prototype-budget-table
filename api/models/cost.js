module.exports = (sequelize, DataTypes) => {
  const cost = sequelize.define('cost', {
    category: DataTypes.STRING,
    cost: DataTypes.DOUBLE,
    ffy: DataTypes.INTEGER,
    ffp: DataTypes.FLOAT,
    expenseType: DataTypes.STRING
  });

  cost.prototype.getFullObject = function getFullObject() {
    return Promise.resolve({
      id: this.id,
      category: this.category,
      cost: this.cost,
      ffy: this.ffy,
      ffp: this.ffp,
      expenseType: this.expenseType
    });
  };

  return cost;
};
