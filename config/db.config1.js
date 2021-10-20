const env = require('./env.js');
 
const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: 0,
  define: {
    timestamps: false
  },
 
  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  }
});
 
const db1 = {};
 
db1.Sequelize = Sequelize;
db1.sequelize = sequelize;
 
db1.form = require('../models/declaration.model.js')(sequelize, Sequelize);
// console.log(db)
 
module.exports = db1