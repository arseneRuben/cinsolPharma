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
db.services = require("./services.model.js")(sequelize, Sequelize);
//table `category` of products
db.categories = require("./categories.model.js")(sequelize, Sequelize);
db.payments = require("./payments.model.js")(sequelize, Sequelize);
db.commands = require("./commands.model.js")(sequelize, Sequelize);
db.commandLines = require("./commandLines.model.js")(sequelize, Sequelize);
db.medicalNoteBooks = require("./medicalNoteBooks.model.js")(sequelize, Sequelize);
db.reportEntry = require("./reportEntry.model.js")(sequelize, Sequelize);


db.groups.belongsToMany(db.users, {
  through: "roles"
});
db.users.belongsToMany(db.groups, {
  through: "roles"
});
db.invoices.belongsTo(db.users, {
  foreignKey: "partner_id",
  as: "user",
});
db.products.belongsTo(db.categories, {
  foreignKey: "category_id",
  as: "categories",
});
db.payments.belongsTo(db.invoices, {
  foreignKey: "invoice_id",
  as: "invoices",
});
db.payments.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "users",
});
db.commands.belongsTo(db.users, {
  foreignKey: "staff_id",
  as: "users",
});
db.commands.belongsTo(db.invoices, {
  foreignKey: "invoice_id",
  as: "invoices",
});
db.commandLines.belongsTo(db.commands, {
  foreignKey: "command_id",
  as: "commands",
});
db.commandLines.belongsTo(db.products,{
  foreignKey: "product_id",
  as: "products",
  allowNull: true
})
db.commandLines.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "users",
});
db.commandLines.belongsTo(db.services, {
  foreignKey: "service_id",
  as: "services",
});
db.medicalNoteBooks.belongsTo(db.users, {
  foreignKey: "user_id",
  as: "users",
});
db.reportEntry.belongsTo(db.medicalNoteBooks, {
  foreignKey: "medicalNoteBook_id",
  as: "medicalNoteBook",
});


module.exports = db;