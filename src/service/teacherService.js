const { teacherRepository } = require('../repository');
const { hateoas, cache } = require('../helpers');

class TeacherService {
  async index() {
    const teachers = await teacherRepository.getAllTeachers();
    const { id } = teachers[0];
    const link = hateoas.hateoas(id);
    return { teachers, _link: link };
  }

  async store(data) {
    const teacher = await teacherRepository.createTeacher(data);
    const { id } = teacher;
    const link = hateoas.hateoas(id);
    return { teacher, _link: link };
  }

  async show(id, res) {
    if (!id) {
      return res.status(400).json({ errors: ['Missing id'] });
    }
    const teacher = await teacherRepository.getTeacher(id);
    if (!teacher) {
      return res.status(400).json({ errors: ['Teacher does not exist'] });
    }
    const cached = await cache.get(id);
    if (cached) { return (cached); }

    const link = hateoas.hateoas(id);
    cache.set(id, { teacher, _link: link });
    return { teacher, _link: link };
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
    const cached = await cache.get(id);
    const link = hateoas.hateoas(id);

    if (cached) { cache.set(id, { updatedTeacher, _link: link }); }
    return { updatedTeacher, _link: link };
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
    const link = hateoas.hateoas(id);
    return { deleteTeacher: teacher, _link: link };
  }
}
module.exports = new TeacherService();
