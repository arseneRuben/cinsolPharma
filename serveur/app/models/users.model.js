module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("users", {
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING,
        allowNull: true
      },
      adress: {
        type: Sequelize.STRING,
        allowNull: true
      },
      secondary_contact: {
        type: Sequelize.STRING,
        allowNull: true
      },
      other_informations: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      birthday: {
        type: Sequelize.DATE,
        allowNull: true
      },
      birthplace: {
        type: Sequelize.STRING,
        allowNull: true
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: true
      },
      image_name: {
        type: Sequelize.STRING,
        allowNull: true
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    });
  
    return Users;
  }; 