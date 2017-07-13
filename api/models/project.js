module.exports = (sequelize, DataTypes) => {
  const fundingRequest = sequelize.models.funding_request;
  const project = sequelize.define('project', {
    projectID: { type: DataTypes.STRING, field: 'project_id' },
    name: DataTypes.STRING,
    state: DataTypes.STRING
  });

  project.hasMany(fundingRequest, { as: 'fundingRequests' });

  return project;
};
