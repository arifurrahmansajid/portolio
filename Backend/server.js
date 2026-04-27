const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

const path = require('path');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/blogs', require('./routes/blogRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));

// Basic Route
app.get('/', (req, res) => {
    res.send('API is running and MongoDB is connected!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
