const { TeacherModel } = require('../database/index');
const {
  getAllTeachers, createTeacher, getTeacher, updateTeacher, destroyTeacher,
} = require('../repository/teacherRepository');
const teacherHateoas = require('../helpers/hateoas/teacherHateoas');
const cache = require('../helpers/cache/cache');

class TeacherController {
  async index(req, res) {
    try {
      const teachers = await getAllTeachers();
      const { id } = teachers[0];
      const hateoas = teacherHateoas.hateoas(id);
      return res.json({ teachers, _link: hateoas });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const teacher = await createTeacher(req.body);
      const { id } = teacher;
      const hateoas = teacherHateoas.hateoas(id);
      return res.json({ teacher, _link: hateoas });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Missing id'],
        });
      }
      const teacher = await getTeacher(id);
      if (!teacher) {
        return res.status(400).json({
          errors: ['Teacher does not exist'],
        });
      }
      const hateoas = teacherHateoas.hateoas(id);
      const cached = await cache.get(id);
      if (cached) { return res.json(cached); }
      cache.set(id, { teacher, _link: hateoas });

      return res.json({ teacher, _link: hateoas });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Missing id'],
        });
      }
      const teacher = await getAllTeachers(id);
      if (!teacher) {
        return res.status(400).json({
          errors: ['Teacher does not exist'],
        });
      }
      const updatedTeacher = await updateTeacher(req.body);
      const hateoas = teacherHateoas.hateoas(id);
      const cached = await cache.get(id);
      if (cached) { cache.set(id, { updatedTeacher, _link: hateoas }); }
      return res.json({ updatedTeacher, _link: hateoas });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Missing id'],
        });
      }
      const teacher = await getTeacher(id);
      if (!teacher) {
        return res.status(400).json({
          errors: ['Teacher does not exist'],
        });
      }
      const hateoas = teacherHateoas.hateoas(id);
      cache.del(id);
      destroyTeacher(teacher);
      return res.json({ deleteTeacher: teacher, _link: hateoas });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
module.exports = new TeacherController();
