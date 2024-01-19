module.exports = (sequelize, Sequelize) => {
    const CommandLines = sequelize.define("commandLines", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      itemId: {
        type: Sequelize.INTEGER
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