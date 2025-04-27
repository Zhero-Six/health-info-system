const { DataTypes } = require('sequelize');

/**
 * User model for storing doctor credentials.
 * @param {Sequelize} sequelize - Sequelize instance.
 * @returns {Model} User model.
 */
module.exports = (sequelize) => {
  return sequelize.define('User', {
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  });
};