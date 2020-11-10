require('../../bootstrap');

const dev_db_environment = {
  dialect: process.env.DIALECT,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  logging:false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  },
   dialectOptions: {
    timezone:  "America/Sao_Paulo",
  },
  timezone:  "America/Sao_Paulo",
}

const test_db_environment = {
  dialect: 'sqlite',
  storage: './__tests__/database.sqlite',
  logging:false,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
}

const check_environment = (() =>{
  const environment= process.env.NODE_ENV === "test" ? 
  test_db_environment : dev_db_environment;
  return environment;
})

module.exports = check_environment();