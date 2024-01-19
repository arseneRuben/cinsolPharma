module.exports = (sequelize, Sequelize) => {
    const MedicalNoteBooks = sequelize.define("medicalNoteBooks", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    });
  
    return MedicalNoteBooks;
  };