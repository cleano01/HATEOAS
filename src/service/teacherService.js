const { teacherRepository } = require('../repository');

const teacherHateoas = require('../helpers/hateoas/teacherHateoas');
const cache = require('../helpers/cache/cache');

class TeacherService {
  async index() {
    const teachers = await teacherRepository.getAllTeachers();
    const { id } = teachers[0];
    const hateoas = teacherHateoas.hateoas(id);
    return { teachers, _link: hateoas };
  }

  async store(data) {
    const teacher = await teacherRepository.createTeacher(data);
    const { id } = teacher;
    const hateoas = teacherHateoas.hateoas(id);
    return { teacher, _link: hateoas };
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({
          errors: ['Missing id'],
        });
      }
      const teacher = await teacherRepository.getTeacher(id);
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
      const teacher = await teacherRepository.getAllTeachers(id);
      if (!teacher) {
        return res.status(400).json({
          errors: ['Teacher does not exist'],
        });
      }
      const updatedTeacher = await teacherRepository.updateTeacher(req.body);
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
      const teacher = await teacherRepository.getTeacher(id);
      if (!teacher) {
        return res.status(400).json({
          errors: ['Teacher does not exist'],
        });
      }
      cache.del(id);
      teacherRepository.destroyTeacher(teacher);
      const hateoas = teacherHateoas.hateoas(id);

      return res.json({ deleteTeacher: teacher, _link: hateoas });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
module.exports = new TeacherService();
