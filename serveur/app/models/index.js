const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = require("./products.model.js")(sequelize, Sequelize);
db.invoices = require("./invoices.model.js")(sequelize, Sequelize);
db.users = require("./users.model.js")(sequelize, Sequelize);
db.groups = require("./groups.model.js")(sequelize, Sequelize);
//db.groups = require("./groups.model.js")(sequelize, Sequelize);


db.groups.belongsToMany(db.users, {
  through: "roles"
});
db.users.belongsToMany(db.groups, {
  through: "roles"
});
db.users.hasMany(db.invoices, { as: "partner_id" });
db.invoices.belongsTo(db.users, {
  foreignKey: "partner_id",
  as: "user",
});

//Add default groups
db.groups = ["user", "admin", "moderator"];
module.exports = db;