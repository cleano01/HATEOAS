module.exports = (sequelize, Sequelize) => {
  const Teacher = sequelize.define("teachers", {
    name: {
      type: Sequelize.STRING,
      defaultValue: "",
      validade: {
        len: {
          args: [3, 255],
          msg: "Empty name field, must be 3 out of 255 characters",
        },
      },
    },

    email: {
      type: Sequelize.STRING,
      defaultValue: "",
      unique: {
        msg: "Email already exists",
      },
      validate: {
        isEmail: {
          msg: "Invalid email",
        },
      },
    },

    theme: {
      type: Sequelize.STRING,
      defaultValue: "",
      validade: {
        len: {
          args: [3, 255],
          msg: "Empty theme field, must be 3 out of 255 characters",
        },
      },
    },
  });
  return Teacher;
};
