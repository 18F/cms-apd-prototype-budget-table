module.exports = (sequelize, DataTypes) => {
  const project = sequelize.define('project', {
    projectID: { type: DataTypes.STRING, field: 'project_id' },
    name: DataTypes.STRING,
    state: DataTypes.STRING
  });

  project.associate = (models) => {
    project.hasMany(models.funding_request, { as: 'fundingRequests' });
  };

  project.prototype.getFullObject = function getFullObject() {
    const obj = {
      id: this.projectID,
      name: this.name,
      description: '',
      state: this.state,
      spent: Math.round(Math.random() * 1000000),
      requests: [],
      financials: {}
    };

    return this.getFundingRequests()
      .then((requests) => {
        obj.requests = requests.map(request => ({
          id: request.requestID,
          submitted: request.createdAt.toISOString().substr(0, 10),
          approved: request.createdAt.toISOString().substr(0, 10),
          dollars: {
            added: Math.round(Math.random() * 1000000),
            subtracted: Math.round(Math.random() * 300000)
          }
        }));
      })
      .then(() => obj);
  };

  return project;
};
