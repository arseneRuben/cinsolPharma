module.exports = (sequelize, Sequelize) => {
    const Commands = sequelize.define("commands", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      amount: {
        type: Sequelize.INTEGER
      },
      direction: {
        type: Sequelize.INTEGER,
        default: 1
      }
    });
  
    return Commands;
  };