module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      code: {
        type: Sequelize.STRING
      },
      unit_price: {
        type: Sequelize.INTEGER
      },
      threshold_qty: {
        type: Sequelize.INTEGER
      }
    });
  
    return Product;
  };