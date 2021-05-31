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

  async show(id, res) {
    if (!id) {
      return res.status(400).json({ errors: ['Missing id'] });
    }
    const teacher = await teacherRepository.getTeacher(id);
    if (!teacher) {
      return res.status(400).json({ errors: ['Teacher does not exist'] });
    }
    const hateoas = teacherHateoas.hateoas(id);
    const cached = await cache.get(id);
    if (cached) { return (cached); }
    cache.set(id, { teacher, _link: hateoas });
    return { teacher, _link: hateoas };
  }

  async update(id, data, res) {
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
    const updatedTeacher = await teacherRepository.updateTeacher();
    const hateoas = teacherHateoas.hateoas(id);
    const cached = await cache.get(id);
    if (cached) { cache.set(id, { updatedTeacher, _link: hateoas }); }
    return { updatedTeacher, _link: hateoas };
  }

  async delete(id, res) {
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
    return { deleteTeacher: teacher, _link: hateoas };
  }
}
module.exports = new TeacherService();
