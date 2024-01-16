module.exports = (sequelize, Sequelize) => {
    const Services = sequelize.define("services", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
          },
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      normal_price: {
        type: Sequelize.INTEGER
      },
      advertising_price: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      family_price: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    });
  
    return Services;
  }; 