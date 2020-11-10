const database = require("../../src/database/index");

module.exports = async function truncate(models) {
  return await Promise.all(
    Object.keys(database.sequelize.models).map(key=>{
      return database.sequelize.models[key].destroy({ 
        truncate: true, force: true
      });
    })
  )    
};