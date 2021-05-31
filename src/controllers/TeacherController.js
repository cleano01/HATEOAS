const { teacherService } = require('../service');

class TeacherController {
  async index(req, res) {
    try {
      const response = await teacherService.index();
      return res.json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async store(req, res) {
    try {
      const response = await teacherService.store(req.body);
      return res.json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      const response = await teacherService.show(id, res);
      return res.json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const response = await teacherService.update(id, req.body, res);
      return res.json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const response = await teacherService.delete(id);
      return res.json(response);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}
module.exports = new TeacherController();
