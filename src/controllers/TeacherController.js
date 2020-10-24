const { TeacherModel } = require("../database/index");
const teacherHateoas = require("../helpers/hateoas/teacherHateoas");
const cache = require("../helpers/cache/cache");

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
      const cached = await cache.get(id);
      if(cached){return res.json(cached);}
      
      cache.set(id, { teacher, _link: hateoas });
      return res.json({ teacher, _link: hateoas });
    } catch (error) {
      return res.status(400).json({
        error: error.errors.map((err) => err),
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

      const cached = await cache.get(id);
      if(cached){
        cache.set(id, { updatedTeacher, _link: hateoas });
      }

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
      cache.del(id);

      await teacher.destroy();
      return res.json({ deleteTeacher: teacher,
      _link: hateoas });
    } catch (error) {
      return res.status(400).json({
        error: error.errors.map((err) => err.message),
      });
    }
  }
}
module.exports = new TeacherController();
