module.exports = {
  up(queryInterface, Sequelize) {
    const autoID = {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    };

    const dateType = { allowNull: false, type: Sequelize.DATE };

    const foreignKey = targetModel => ({
      type: Sequelize.INTEGER,
      references: {
        model: targetModel,
        key: 'id'
      }
    });

    return queryInterface.createTable('projects', {
      id: autoID,
      project_id: {
        type: Sequelize.TEXT
      },
      name: {
        type: Sequelize.TEXT
      },
      state: {
        type: Sequelize.TEXT
      },
      createdAt: dateType,
      updatedAt: dateType
    }).then(() => queryInterface.createTable('funding_requests', {
      id: autoID,
      request_id: {
        type: Sequelize.TEXT
      },
      name: {
        type: Sequelize.TEXT
      },
      state: {
        type: Sequelize.TEXT
      },
      projectId: foreignKey('projects'),
      createdAt: dateType,
      updatedAt: dateType
    })).then(() => queryInterface.createTable('proses', {
      id: autoID,
      section: Sequelize.TEXT,
      text: Sequelize.TEXT,
      fundingRequestId: foreignKey('funding_requests'),
      createdAt: dateType,
      updatedAt: dateType
    })).then(() => queryInterface.createTable('outcomes', {
      id: autoID,
      text: Sequelize.TEXT,
      fundingRequestId: foreignKey('funding_requests'),
      createdAt: dateType,
      updatedAt: dateType
    })).then(() => queryInterface.createTable('activities', {
      id: autoID,
      description: Sequelize.TEXT,
      how_it_supports: Sequelize.TEXT,
      outcomeId: foreignKey('outcomes'),
      createdAt: dateType,
      updatedAt: dateType
    }));
  },
  down(queryInterface) {
    return queryInterface.dropTable('funding_requests')
      .then(() => queryInterface.dropTable('projects'));
  }
};
