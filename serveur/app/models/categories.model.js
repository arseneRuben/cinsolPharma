module.exports = (sequelize, Sequelize) => {
    const Categories = sequelize.define("categories", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      }
    });
  
    return Categories;
  };