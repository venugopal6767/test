const express = require('express');
const pool = require('../db');
const auth = require('../middleware/auth');
const metrics = require('../middleware/metrics');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE user_id=$1 ORDER BY created_at DESC', [req.user.id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  try {
    await pool.query('INSERT INTO tasks (user_id, title, description, status) VALUES ($1, $2, $3, false)', [req.user.id, title, description]);
    metrics.increment('tasksCreated');
    res.status(201).json({ msg: 'Task created' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  const { title, description, status } = req.body;
  try {
    await pool.query('UPDATE tasks SET title=$1, description=$2, status=$3, updated_at=NOW() WHERE id=$4 AND user_id=$5', [title, description, status, req.params.id, req.user.id]);
    metrics.increment('tasksUpdated');
    res.json({ msg: 'Task updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await pool.query('DELETE FROM tasks WHERE id=$1 AND user_id=$2', [req.params.id, req.user.id]);
    metrics.increment('tasksDeleted');
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;