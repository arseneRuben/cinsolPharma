module.exports = (sequelize, Sequelize) => {
    const Payments = sequelize.define("resetpasswordtoken", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      email: {
        type: Sequelize.STRING
      },
      token_value: {
        type: Sequelize.STRING
      },
      created_at: {
        type: Sequelize.DATE
      },
      expired_at: {
        type: Sequelize.DATE
      },
      used: {
        type: Sequelize.INTEGER
      },
      inserted_at: {
        type: Sequelize.DATE
      }
    });
  
    return Payments;
  };