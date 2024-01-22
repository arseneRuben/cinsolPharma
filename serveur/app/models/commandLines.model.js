module.exports = (sequelize, Sequelize) => {
    const CommandLines = sequelize.define("commandLines", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      unit_price: {
        type: Sequelize.INTEGER
      },
      qty: {
        type: Sequelize.INTEGER
      }
    });
  
    return CommandLines;
  };