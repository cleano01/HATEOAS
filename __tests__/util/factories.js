const faker = require('faker');
const { factory } = require('factory-girl');
const Teacher = require('../../src/models/Teacher');

factory.define('Teacher', Teacher, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  theme: "Português",
});

module.exports = factory;
