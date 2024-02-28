const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('task_weather', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3308
});

module.exports = sequelize;