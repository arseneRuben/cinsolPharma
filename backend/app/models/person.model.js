// person.model.js

module.exports = (sequelize, Sequelize) => {
  const Person = sequelize.define("person", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    typeId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    firstname: {
      type: Sequelize.STRING,
      allowNull: true
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false
    },
    primary_contact: {
      type: Sequelize.STRING,
      allowNull: true
    },
    address: {
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
      allowNull: false
    },
    gender: {
      type: Sequelize.STRING,
      allowNull: false
    },
    birthplace: {
      type: Sequelize.STRING,
      allowNull: false
    },
    created_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    image_name: {
      type: Sequelize.STRING,
      allowNull: true
    },
    updated_at: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
      userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
              model: 'user',
              key: 'id'
          }
      },
  });

  Person.belongsTo(User, { foreignKey: 'userId' });

  return Person;
};