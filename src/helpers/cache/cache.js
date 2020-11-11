const {redis} =  require('../../config/redisConfig')

class Cache {
  constructor(){
    this.redis = redis;
  }

  async get(key){
    try {      
      const value = await this.redis.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      return res.status(400).json({
        error: error.errors.map((err) => err),
      });
    }   
  }

  set(key, value, timeExp=60 * 15){ 
    try {
      return this.redis.set(key, JSON.stringify(value),
              "EX", timeExp);
    } catch (error) { 
      return res.status(400).json({
        error: error.errors.map((err) => err),
      });
    }    
  }

  del(key){
    try {
      return this.redis.del(key);     
    } catch (error) {
      return res.status(400).json({
        error: error.errors.map((err) => err),
      });      
    }
  }

  async delPrefix(prefix){
    try {
      const keys = (await this.redis.keys(`cache:${prefix}:*`)).map((key) =>{
        key.replace("cache:", "");
      });
    } catch (error) {
      return res.status(400).json({
        error: error.errors.map((err) => err),
      });
    }    
  }
}
module.exports = new Cache();