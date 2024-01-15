module.exports = (sequelize, Sequelize) => {
  const Invoices = sequelize.define("invoices", {
    title: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    published: {
      type: Sequelize.BOOLEAN
    }
  });

  return Invoices;
};