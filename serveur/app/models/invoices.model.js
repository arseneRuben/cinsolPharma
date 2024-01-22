module.exports = (sequelize, Sequelize) => {
  const Invoices = sequelize.define("invoices", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    invoiceNumber: {
      type: Sequelize.STRING
    }
  });

  return Invoices;
};