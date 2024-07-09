// backend/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('dbinternet', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306  // Asegúrate de incluir el puerto
});

module.exports = sequelize;
