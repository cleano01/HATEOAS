const { TeacherModel } = require('../database/index');

const getAllTeachers = () => TeacherModel.findAll({});

const createTeacher = (body) => TeacherModel.create(body);

const getTeacher = (id) => TeacherModel.findByPk(id);

const updateTeacher = (body) => TeacherModel.update(body);

module.exports = {
  getAllTeachers,
  createTeacher,
  getTeacher,
  updateTeacher,
};
