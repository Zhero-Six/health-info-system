const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Program = require('../models/Program');
const auth = require('../middleware/auth');

/**
 * POST /api/programs
 * Create a new health program.
 */
router.post(
  '/',
  auth,
  [
    body('name').notEmpty().trim(),
    body('description').notEmpty().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    try {
      const program = await Program.create(req.body);
      res.status(201).json(program);
    } catch {
      res.status(500).json({ error: 'Server error' });
    }
  }
);

/**
 * GET /api/programs
 * List all programs.
 */
router.get('/', async (req, res) => {
  try {
    const programs = await Program.findAll();
    res.json(programs);
  } catch {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;