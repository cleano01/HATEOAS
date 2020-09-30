const { TeacherModel } = require("../database/index");
const teacherHateoas = require("../helpers/hateoas/teacherHateoas");
class TeacherController {
  async index(req, res) {
    try {
      const teachers = await TeacherModel.findAll({});

      const { id } = teachers[0];
      const hateoas = teacherHateoas.hateoas(id);

      return res.json({ teachers, _link: hateoas });
    } catch (error) {
      return res.status(400).json({
        error: error.errors.map((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const teacher = await TeacherModel.create(req.body);
      const { id } = teacher;

      const hateoas = teacherHateoas.hateoas(id);

      return res.json({ teacher, _link: hateoas });
    } catch (error) {
      return res.status(400).json({
        error: error.errors.map((err) => err.message),
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["Missing id"],
        });
      }
      const hateoas = teacherHateoas.hateoas(id);

      const teacher = await TeacherModel.findByPk(id);

      if (!teacher) {
        return res.status(400).json({
          errors: ["Teacher does not exist"],
        });
      }

      return res.json({ teacher, _link: hateoas });
    } catch (error) {
      return res.status(400).json({
        error: error.errors.map((err) => err.message),
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["Missing id"],
        });
      }
      const hateoas = teacherHateoas.hateoas(id);

      const teacher = await TeacherModel.findByPk(id);

      if (!teacher) {
        return res.status(400).json({
          errors: ["Teacher does not exist"],
        });
      }
      const updatedTeacher = await teacher.update(req.body);
      return res.json({ updatedTeacher, _link: hateoas });
    } catch (error) {
      return res.status(400).json({
        error: error.errors.map((err) => err.message),
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["Missing id"],
        });
      }
      const hateoas = teacherHateoas.hateoas(id);

      const teacher = await TeacherModel.findByPk(id);

      if (!teacher) {
        return res.status(400).json({
          errors: ["Teacher does not exist"],
        });
      }

      await teacher.destroy();

      return res.json({ deleteTeacher: teacher, _link: hateoas });
    } catch (error) {
      return res.status(400).json({
        error: error.errors.map((err) => err.message),
      });
    }
  }
}

module.exports = new TeacherController();
