// require('dotenv').config();  // To load environment variables from .env
// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middlewares
// app.use(cors());  // Enable Cross-Origin Resource Sharing (CORS)
// app.use(express.json());  // For parsing application/json

// // Import the routes for generating ideas and similar ideas
// const generateIdeasRoute = require('./api/generateIdeas');
// const generateSimilarIdeasRoute = require('./api/generateSimilarIdeas');

// // Ensure the routes are loaded correctly
// if (!generateIdeasRoute || !generateSimilarIdeasRoute) {
//     console.error("Routes are not properly loaded. Please check the route files.");
//     process.exit(1);  // Exit the server if routes are not found
// }

// // Use the routes
// app.use('/api/generate-ideas', generateIdeasRoute);
// app.use('/api/generate-similar-ideas', generateSimilarIdeasRoute);

// // Root route to confirm the server is running
// app.get('/', (req, res) => res.send('Hello from UniBridge backend!'));

// // Start the server on the defined port
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const app = express();

// Enable CORS for requests from localhost:8081
app.use(cors({
    origin: 'http://localhost:8081', // Allow requests from this frontend URL
    methods: ['GET', 'POST', 'OPTIONS'], // Allow specific HTTP methods
    allowedHeaders: ['Content-Type'], // Allow Content-Type header
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Sample POST route
app.post('/api/project-ideas', (req, res) => {
    const { subject, gradeLevel, timeframe, skillLevel, constraints } = req.body;

    // Sample logic to handle the request
    const projectIdeas = generateProjectIdeas(subject, gradeLevel, timeframe, skillLevel, constraints);

    res.json(projectIdeas); // Send back the generated project ideas
});

// Sample function to generate project ideas (replace with your actual logic)
function generateProjectIdeas(subject, gradeLevel, timeframe, skillLevel, constraints) {
    return [
        {
            idea: `Project 1 based on ${subject} for grade level ${gradeLevel}`,
            steps: ['Step 1', 'Step 2'],
            learningOutcomes: ['Learning Outcome 1', 'Learning Outcome 2'],
        },
        {
            idea: `Project 2 based on ${subject} for grade level ${gradeLevel}`,
            steps: ['Step 1', 'Step 2'],
            learningOutcomes: ['Learning Outcome 1', 'Learning Outcome 2'],
        },
    ];
}

// Start the server
app.listen(5000, () => {
    console.log('Server is running on http://192.168.5.144:5000');
});