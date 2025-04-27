const request = require('supertest');
const app = require('../src/app');
const Client = require('../models/Client');
const Program = require('../models/Program');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Test suite for Client API endpoints.
 */
describe('Client API', () => {
  let token;

  beforeAll(async () => {
    // Initialize in-memory database
    await app.locals.sequelize.sync({ force: true });

    // Create a test user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await User.create({ email: 'test@example.com', password: hashedPassword });

    // Generate JWT token
    token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  });

  afterAll(async () => {
    await app.locals.sequelize.close();
  });

  it('should register a client', async () => {
    const res = await request(app)
      .post('/api/clients')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        dob: '1990-01-01',
        contact: '1234567890',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('John Doe');
  });

  it('should enroll client in programs', async () => {
    const program = await Program.create({ name: 'TB', description: 'Tuberculosis program' });
    const client = await Client.create({
      name: 'Jane Doe',
      dob: '1985-05-05',
      contact: '9876543210',
    });

    const res = await request(app)
      .post(`/api/clients/${client.id}/enroll`)
      .set('Authorization', `Bearer ${token}`)
      .send({ programIds: [program.id] });
    expect(res.statusCode).toBe(200);
  });
});