"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "teachers",
      [
        {
          name: "John Doe",
          email: "John@gmail.com",
          theme: "Matematica",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Maria Rosa",
          email: "maria@gmail.com",
          theme: "História",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Ellen Moura",
          email: "ellen@gmail.com",
          theme: "Biologia",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "José Silva",
          email: "jose@gmail.com",
          theme: "Inglês",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: () => {},
};
