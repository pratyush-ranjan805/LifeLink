const express = require('express');
const router = express.Router();
const Donor = require('../models/Donor');

router.get('/', async (req, res) => {
  try {
    const { bloodGroup, location, search } = req.query;
    let query = {};
    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (location) query.location = { $regex: location, $options: 'i' };
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    
    const donors = await Donor.find(query).populate('user', 'email city');
    res.json(donors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const newDonor = new Donor(req.body);
    await newDonor.save();
    res.status(201).json(newDonor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
