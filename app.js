const express = require("express");

const TeacherRoute = require("./src/routes/TeacherRoute");
class App {
  constructor() {
    this.app = express();
    this.routes();
  }

  routes() {
    this.app.use("/", TeacherRoute);
  }
}

module.exports = new App().app;
