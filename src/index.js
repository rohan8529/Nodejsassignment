const express = require('express');
const db = require('./models/db');
const bodyParser = require('body-parser');
const schoolRoutes = require('./routes/schoolRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api', schoolRoutes);

const PORT = process.env.PORT || 4000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Routes:');
    console.log('POST /api/addSchool');
    console.log('GET /api/listSchools');
});
