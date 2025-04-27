const request = require('supertest');
const app = require('../src/app');
const Program = require('../models/Program');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * Test suite for Program API endpoints.
 */
describe('Program API', () => {
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

  it('should create a program', async () => {
    const res = await request(app)
      .post('/api/programs')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Malaria',
        description: 'Malaria treatment program',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Malaria');
  });
});