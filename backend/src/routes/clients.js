const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Client = require('../models/Client');
const Program = require('../models/Program');
const auth = require('../middleware/auth');
const fuzzySearch = require('../utils/fuzzySearch');

/**
 * POST /api/clients
 * Register a new client.
 */
router.post(
  '/',
  auth,
  [
    body('name').notEmpty().trim(),
    body('dob').isDate(),
    body('contact').notEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const client = await Client.create(req.body);
      res.status(201).json(client);
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

/**
 * POST /api/clients/:id/enroll
 * Enroll a client in programs.
 */
router.post('/:id/enroll', auth, async (req, res) => {
  const { programIds } = req.body;
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ error: 'Client not found' });

    const programs = await Program.findAll({ where: { id: programIds } });
    if (programs.length !== programIds.length) return res.status(400).json({ error: 'Invalid program IDs' });

    await client.addPrograms(programs);
    res.json(client);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * GET /api/clients
 * Search clients by name (fuzzy search).
 */
router.get('/', async (req, res) => {
  const { q } = req.query;
  try {
    const clients = await Client.findAll();
    const results = q ? fuzzySearch(clients, q, ['name']) : clients;
    res.json(results);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * GET /api/clients/:id
 * View client profile with enrolled programs.
 */
router.get('/:id', async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id, { include: Program });
    if (!client) return res.status(404).json({ error: 'Client not found' });
    res.json(client);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

/**
 * GET /api/clients/analytics
 * Get program enrollment counts.
 */
router.get('/analytics', async (req, res) => {
  try {
    const programs = await Program.findAll({ include: Client });
    const analytics = programs.map(p => ({
      name: p.name,
      enrolled: p.Clients?.length || 0,
    }));
    res.json(analytics);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;