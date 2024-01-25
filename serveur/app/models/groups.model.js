module.exports = (sequelize, Sequelize) => {
    const Groups = sequelize.define("groups", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      }
    });
  
    return Groups;
  };