const db = require('../models/db');
const haversine = require('haversine-distance');

const addSchool = (req, res) => {
    console.log('Add School request received');
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }
        res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
    });
};

const listSchools = (req, res) => {
    console.log('List Schools request received');
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const userLocation = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };

    const query = 'SELECT * FROM schools';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: 'Database error' });
        }

        results.forEach(school => {
            const schoolLocation = { latitude: school.latitude, longitude: school.longitude };
            school.distance = haversine(userLocation, schoolLocation);
        });

        results.sort((a, b) => a.distance - b.distance);
        res.json(results);
    });
};

module.exports = { addSchool, listSchools };
