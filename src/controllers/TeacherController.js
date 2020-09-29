const { TeacherModel } = require("../database/index");

class TeacherController {
  async index(req, res) {
    try {
      const teachers = await TeacherModel.findAll({});
      res.json({ teachers });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.maps((err) => err.message),
      });
    }
  }

  async store(req, res) {
    try {
      const teacher = await TeacherModel.create(req.body);
      return res.json({ teacher });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.maps((err) => err.message),
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

      const teacher = await TeacherModel.findByPk(id);

      if (!teacher) {
        return res.status(400).json({
          errors: ["Teacher does not exist"],
        });
      }

      return res.json({ teacher });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.maps((err) => err.message),
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

      const teacher = await TeacherModel.findByPk(id);

      if (!teacher) {
        return res.status(400).json({
          errors: ["Teacher does not exist"],
        });
      }
      const updatedTeacher = await teacher.update(req.body);
      return res.json({ updatedTeacher });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.maps((err) => err.message),
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

      const teacher = await TeacherModel.findByPk(id);

      if (!teacher) {
        return res.status(400).json({
          errors: ["Teacher does not exist"],
        });
      }

      await teacher.destroy();

      return res.json({ deleteTeacher: teacher });
    } catch (error) {
      return res.status(400).json({
        errors: error.errors.maps((err) => err.message),
      });
    }
  }
}

module.exports = new TeacherController();
