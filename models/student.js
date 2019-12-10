'use strict';


module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define('Student', {
    name: DataTypes.STRING
  }, {});
  Student.associate = function(models) {
    // associations can be defined here
    Student.belongsToMany(models.Teacher, {through: models.Classroom, foreignKey: 'student_id'})

  };
  return Student;
};