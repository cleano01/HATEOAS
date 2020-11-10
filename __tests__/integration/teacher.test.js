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

  it('it will not be possible to register an email already registered', async ()=>{

    await request(app)
      .post('/')
      .send({
        name: "Rosa Maria",
        email: "rosa01@gmail.com",
        theme: "Português"
    });    

    const response = await request(app)
    .post('/')
    .send({
      name: "Rosa Maria",
      email: "rosa01@gmail.com",
      theme: "Português"
    });
    expect(response.status).toBe(400);
  });
})