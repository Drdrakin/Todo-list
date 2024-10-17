const DataTypes = require('sequelize');
const connection = require('../database/index.js');

// Mapeando a model de 'task'
const Task = connection.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false, 
  },
}, {
  tableName: 'Tasks', 
  timestamps: true,
});

module.exports = Task;
