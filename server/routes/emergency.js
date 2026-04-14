const express = require('express');
const router = express.Router();
const Emergency = require('../models/Emergency');
const Donor = require('../models/Donor');

router.get('/', async (req, res) => {
  try {
    const emergencies = await Emergency.find({ status: 'active' }).sort({ createdAt: -1 });
    res.json(emergencies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newEmergency = new Emergency(req.body);
    await newEmergency.save();
    res.status(201).json(newEmergency);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// BFS Logic simulation for nearest donors
router.post('/bfs', async (req, res) => {
  try {
    const { bloodGroup, latitude, longitude, location } = req.body;
    // Get all available donors of matching blood group
    let query = { status: 'active' };
    if (bloodGroup) query.bloodGroup = bloodGroup;
    
    let donors = await Donor.find(query);
    
    // In a real scenario, this would use a graph of connected nodes (hospitals -> donors)
    // Here we simulate BFS by sorting/filtering based on proximity/simulated levels.
    // For prototype purposes, we map them into "BFS Levels" randomly or by simulated distance.
    
    const matched = donors.map((d, index) => {
      // Simulate distance between 1 and 15 km randomly for the demo
      const dist = (Math.random() * 10 + 1).toFixed(1);
      return {
        _id: d._id,
        name: d.name,
        bloodGroup: d.bloodGroup,
        location: d.location,
        distance: parseFloat(dist),
        distString: `${dist} km`,
        level: index < 2 ? 1 : index < 5 ? 2 : 3 // Simulated BFS level depth
      };
    }).sort((a, b) => a.distance - b.distance);

    res.json(matched);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
