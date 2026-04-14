const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

router.get('/inventory', async (req, res) => {
  try {
    const inventories = await Inventory.find().populate('bankId', 'name city');
    res.json(inventories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/inventory', async (req, res) => {
  try {
    const newInv = new Inventory(req.body);
    await newInv.save();
    res.status(201).json(newInv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// TSP Route Optimization for Deliveries
router.post('/tsp', async (req, res) => {
  try {
    const { stops } = req.body; // array of hospital/bank strings
    if (!stops || stops.length === 0) return res.status(400).json({ error: 'No stops provided' });

    // Simulated Traveling Salesperson Problem output. 
    // Real implementation would calculate distances between all nodes and run Held-Karp or Nearest Neighbor.
    const optimizedRoute = [stops[0], ...stops.slice(1).sort(() => Math.random() - 0.5)];
    const distanceStr = (Math.random() * 20 + 10).toFixed(1) + ' km';
    const etaStr = Math.floor(Math.random() * 30 + 15) + ' min';

    res.json({
      orderedStops: optimizedRoute,
      distance: distanceStr,
      eta: etaStr,
      status: 'Scheduled'
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
