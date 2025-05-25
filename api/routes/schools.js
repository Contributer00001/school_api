const express = require('express');
const router = express.Router();
const School = require('../models/school');

// Add School API
router.post('/addSchool', async (req, res) => {
  try {
    const { name, address, latitude, longitude } = req.body;

    // Input validation
    if (!name || !address || latitude === undefined || longitude === undefined) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (typeof latitude !== 'number' || typeof longitude !== 'number') {
      return res.status(400).json({ error: 'Latitude and longitude must be numbers' });
    }

    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return res.status(400).json({ error: 'Invalid coordinates' });
    }

    const schoolId = await School.addSchool({ name, address, latitude, longitude });
    res.status(201).json({ 
      message: 'School added successfully',
      schoolId 
    });
  } catch (error) {
    console.error('Error adding school:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// List Schools API
router.get('/listSchools', async (req, res) => {
  try {
    const { latitude, longitude } = req.query;

    // Input validation
    if (!latitude || !longitude) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (isNaN(lat) || isNaN(lng)) {
      return res.status(400).json({ error: 'Invalid coordinates' });
    }

    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
      return res.status(400).json({ error: 'Invalid coordinates' });
    }

    const schools = await School.listSchools(lat, lng);
    res.json({ schools });
  } catch (error) {
    console.error('Error listing schools:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router; 