const { TeacherModel } = require('../database/index');

const getAllTeachers = () => {
  const teachers = TeacherModel.findAll({});
  return teachers;
};

const createTeacher = (body) => {
  const teacher = TeacherModel.create(body);
  return teacher;
};

module.exports = {
  getAllTeachers,
  createTeacher,
};
