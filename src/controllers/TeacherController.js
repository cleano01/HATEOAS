class Teacher {
  async index(req, res) {
    return res.json("ok");
  }
  async store(req, res) {}
  async show(req, res) {}
  async update(req, res) {}
  async delete(req, res) {}
}

module.exports = new Teacher();
