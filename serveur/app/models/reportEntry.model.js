module.exports = (sequelize, Sequelize) => {
    const ReportEntry = sequelize.define("reportEntry", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      content: {
        type: Sequelize.STRING
      },
      title: {
        type: Sequelize.STRING
      }
    });
  
    return ReportEntry;
  };