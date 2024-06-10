const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Temporary storage for job postings
let jobPostings = [];

// Endpoint to accept and store job posting data
app.post('/jobpostings', (req, res) => {
    const newPostings = req.body;
    jobPostings = [...jobPostings, ...newPostings];
    res.status(201).json({ message: 'Job postings added successfully' });
});

// Endpoint to retrieve job postings
app.get('/jobpostings', (req, res) => {
    res.json(jobPostings);
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
