const request = require('supertest');
const app = require("../../app");
const truncate = require("../util/truncate");
const factory = require("../util/factories");

describe('Teacher', () => {
  beforeEach(async () => { await truncate(); });

  it('it is possible to register a teacher', async () => {
    const random_created_teacher = await factory.attrs('Teacher');
    const response = await request(app)
      .post('/')
      .send(random_created_teacher);
    expect(response.body.teacher).toHaveProperty('id');
  });

  it('it will not be possible to register an email already registered', async () => {
    const random_created_teacher = await factory.attrs('Teacher');
    await request(app)
      .post('/')
      .send(random_created_teacher);

    const response = await request(app)
      .post('/')
      .send(random_created_teacher);
    expect(response.status).toBe(400);
  });
});
