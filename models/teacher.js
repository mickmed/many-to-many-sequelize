'use strict';
module.exports = (sequelize, DataTypes) => {
  const Teacher = sequelize.define('Teacher', {
    name: DataTypes.STRING
  }, {});
  Teacher.associate = function(models) {
    // associations can be defined here
    Teacher.belongsToMany(models.Student, {through: models.Classroom, foreignKey: 'teacher_id'})

  };
  return Teacher;
};