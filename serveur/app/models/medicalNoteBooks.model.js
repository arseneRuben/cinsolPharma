module.exports = (sequelize, Sequelize) => {
    const MedicalNoteBooks = sequelize.define("medicalNoteBooks", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    });
  
    return MedicalNoteBooks;
  };