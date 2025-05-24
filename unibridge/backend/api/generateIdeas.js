// const express = require('express');
// const router = express.Router();
// const axios = require('axios');  // Importing axios is fine, make sure it's used

// require('dotenv').config();

// // Helper function to create a detailed prompt
// function createPrompt(formData) {
//   return `You are a creative project idea generator for students. You generate detailed, engaging, and educational project ideas based on specific requirements.

// CREATE 3 PROJECT IDEAS WITH THE FOLLOWING REQUIREMENTS:
// - Subject: ${formData.subject}
// - Grade Level: ${formData.gradeLevel}
// - Project Timeframe: ${formData.timeframe}
// - Skill Level: ${formData.skillLevel}
// ${formData.teamSize ? `- Team Size: ${formData.teamSize}` : ''}
// ${formData.resources ? `- Available Resources: ${formData.resources}` : ''}
// ${formData.interests ? `- Personal Interests: ${formData.interests}` : ''}
// ${formData.constraints ? `- Constraints: ${formData.constraints}` : ''}

// For each project idea, provide:
// 1. A catchy title
// 2. A brief description (2-3 sentences)
// 3. A detailed report that includes:
//    - Overview: A paragraph explaining the project
//    - Materials: List of required materials
//    - Steps: Step-by-step instructions
//    - Learning Outcomes: What students will learn
//    - Extensions: Ways to expand or modify the project

// Return your response as a valid JSON object with the following structure:
// {
//   "ideas": [
//     {
//       "title": "Project Title",
//       "description": "Brief description of the project",
//       "report": {
//         "overview": "Detailed overview paragraph",
//         "materials": ["Material 1", "Material 2", ...],
//         "steps": ["Step 1", "Step 2", ...],
//         "learningOutcomes": ["Learning outcome 1", "Learning outcome 2", ...],
//         "extensions": ["Extension 1", "Extension 2", ...]
//       }
//     },
//     ...
//   ]
// }`;
// }

// async function generateIdeas(req, res) {
//   try {
//     const formData = req.body;

//     // Add logging to see the incoming request data
//     console.log('Received formData:', formData);

//     // Validate formData
//     if (!formData.subject || !formData.gradeLevel) {
//       return res.status(400).json({ error: "Subject and Grade Level are required." });
//     }

//     const prompt = createPrompt(formData);

//     // Make the API request to Hugging Face
//     const response = await axios.post(
//       'https://api-inference.huggingface.co/models/openai-community/gpt2',
//       { inputs: prompt },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//           'Content-Type': 'application/json'
//         },
//         timeout: 30000
//       }
//     );

//     // Log the Hugging Face API response for debugging
//     console.log('Hugging Face API response:', response.data);

//     // Ensure proper parsing of the response
//     const textOutput = response.data?.[0]?.generated_text || "No response generated";
//     console.log('Generated text:', textOutput);

//     return res.status(200).json({ text: textOutput });

//   } catch (error) {
//     console.error("Error generating ideas:", error.response ? error.response.data : error.message);
//     return res.status(500).json({ error: "An error occurred while generating project ideas" });
//   }
// }

// router.post('/generate-ideas', generateIdeas);

// module.exports = router;


// generateIdeas.js
const { HfInference } = require('@huggingface/inference');

const hf = new HfInference(process.env.HF_API_KEY);

async function generateProjectIdeas(subject) {
  const prompt = `Give 3 unique project ideas for the subject: ${subject}. Be creative, concise, and student-friendly.`;

  const result = await hf.textGeneration({
    model: 'gpt2',
    inputs: prompt,
    parameters: {
      max_new_tokens: 100,
      temperature: 0.7,
    },
  });

  return result.generated_text;
}

module.exports = generateProjectIdeas;