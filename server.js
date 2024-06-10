const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas cluster
mongoose.connect('mongodb+srv://admin:admin@cluster0.frwlr4a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err.message);
});

// Define a schema for job postings
const jobPostingSchema = new mongoose.Schema({
    image: String,
    role: String,
    companyName: String,
    url: String
});

// Define a model for job postings
const JobPosting = mongoose.model('JobPosting', jobPostingSchema);

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

app.post('/clear', async (req, res) => {
    try {
        await JobPosting.deleteMany({});
        res.status(201).json({ message: 'Job postings cleared successfully' });
    } catch (err) {
        console.error('Error clearing job postings:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to accept and store job posting data
app.post('/jobpostings', async (req, res) => {
    try {
        const newPostings = req.body;
        await JobPosting.insertMany(newPostings);
        res.status(201).json({ message: 'Job postings added successfully' });
    } catch (err) {
        console.error('Error storing job postings:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Endpoint to retrieve job postings
app.get('/jobpostings', async (req, res) => {
    try {
        const postings = await JobPosting.find();
        res.json(postings);
    } catch (err) {
        console.error('Error retrieving job postings:', err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
