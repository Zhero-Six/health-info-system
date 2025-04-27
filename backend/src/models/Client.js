const { DataTypes } = require('sequelize');

/**
 * Program model for storing health program information.
 * @param {Sequelize} sequelize - Sequelize instance.
 * @returns {Model} Program model.
 */
module.exports = (sequelize) => {
  return sequelize.define('Program', {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.STRING, allowNull: false },
  });
};