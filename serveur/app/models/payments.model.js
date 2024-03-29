module.exports = (sequelize, Sequelize) => {
    const Payments = sequelize.define("payments", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      amount: {
        type: Sequelize.INTEGER
      }
    });
  
    return Payments;
  };