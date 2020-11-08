const request = require('supertest');
const app = require("../../app");


describe('Teacher', ()=>{
  it('it is possible to register a teacher', async ()=>{
    const response = await request(app)
    .post('/')
    .send({
      name: "Rosa Maria",
      email: "rosa02@gmail.com",
      theme: "Português"
    });
    expect(response.body.teacher.id).toEqual(1)    
  })
})