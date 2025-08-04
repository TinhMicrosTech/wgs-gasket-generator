import express from 'express';
import svg2gcode from 'svg2gcode';
import pool from '../db.js';

const router = express.Router();

router.post('/generate', async (req, res) => {
  const { name, svg, params } = req.body;
  try {
    await pool.query(
      'INSERT INTO gaskets (name, params, created_at) VALUES (?, ?, NOW())',
      [name, JSON.stringify(params)]
    );
    const gcode = svg2gcode(svg, { feedRate: 1000, scale: 1 });
    res.set({
      'Content-Disposition': 'attachment; filename="gasket.nc"',
      'Content-Type': 'text/plain'
    });
    res.send(gcode);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;