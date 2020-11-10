const request = require('supertest');
const app = require("../../app");
const truncate = require("../util/truncate");

describe('Teacher', ()=>{
  beforeEach(async()=>{await truncate()})

  it('it is possible to register a teacher', async ()=>{
    const response = await request(app)
    .post('/')
    .send({
      name: "Rosa Maria",
      email: "rosa01@gmail.com",
      theme: "Português"
    });
    expect(response.body.teacher).toHaveProperty('id');
  });
})