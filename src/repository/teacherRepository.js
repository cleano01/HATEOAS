const { TeacherModel } = require('../database/index');

const getAllTeachers = () => {
  const teachers = TeacherModel.findAll({});
  return teachers;
};

module.exports = {
  getAllTeachers,
};
