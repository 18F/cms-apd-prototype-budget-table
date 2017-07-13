const path = require('path');
const Sequelize = require('sequelize');

const db = {};

const connectionString = process.env.DATABASE_URL || 'postgres://localhost/cms_prototype';

const sequelize = new Sequelize(connectionString, { logging: false });

const modelFiles = ['funding_request', 'project'];
for (const modelFile of modelFiles) {
  const model = sequelize.import(path.join(__dirname, modelFile));
  db[model.name] = model;
}

for (const modelName of Object.keys(db)) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
