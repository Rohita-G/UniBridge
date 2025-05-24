require('dotenv').config();
const axios = require('axios');
const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/openai-community/gpt2"; // GPT-2 model URL

// Helper function to create a detailed prompt based on the base idea
function createPrompt(baseIdea, formData) {
  return `You are a creative project idea generator for students. Generate 3 new project ideas similar to the following project, but with unique variations:

BASE PROJECT:
Title: ${baseIdea.title}
Description: ${baseIdea.description}

Generate projects with these requirements:
- Subject: ${formData.subject}
- Grade Level: ${formData.gradeLevel}
- Project Timeframe: ${formData.timeframe}
- Skill Level: ${formData.skillLevel}
${formData.teamSize ? `- Team Size: ${formData.teamSize}` : ''}
${formData.resources ? `- Available Resources: ${formData.resources}` : ''}
${formData.interests ? `- Personal Interests: ${formData.interests}` : ''}
${formData.constraints ? `- Constraints: ${formData.constraints}` : ''}

For each project idea, provide:
1. A catchy title
2. A brief description (2-3 sentences)
3. A detailed report that includes:
   - Overview: A paragraph explaining the project
   - Materials: List of required materials
   - Steps: Step-by-step instructions
   - Learning Outcomes: What students will learn
   - Extensions: Ways to expand or modify the project

Return your response as a valid JSON object with the following structure:
{
  "ideas": [
    {
      "title": "Project Title",
      "description": "Brief description of the project",
      "report": {
        "overview": "Detailed overview paragraph",
        "materials": ["Material 1", "Material 2", ...],
        "steps": ["Step 1", "Step 2", ...],
        "learningOutcomes": ["Learning outcome 1", "Learning outcome 2", ...],
        "extensions": ["Extension 1", "Extension 2", ...]
      }
    },
    ...
  ]
}`;
}

async function generateSimilarIdeas(req, res) {
  try {
    const { baseIdea, formData } = req.body;
    
    // Validate the request body
    if (!baseIdea || !formData) {
      return res.status(400).json({ error: "Base idea and form data are required." });
    }

    // Create a detailed prompt based on the base idea and form data
    const prompt = createPrompt(baseIdea, formData);
    
    // Make API call to Hugging Face using GPT-2 model
    const response = await axios.post(
      HUGGINGFACE_API_URL,
      {
        inputs: prompt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Ensure the API response contains the expected data
    if (!response.data || !response.data[0]) {
      return res.status(500).json({ error: "No valid response from Hugging Face API" });
    }

    const content = response.data[0]?.generated_text || "";
    console.log("GPT-2 Response:", content);
    
    // Parse the JSON response
    let ideas;
    try {
      ideas = JSON.parse(content).ideas;
    } catch (err) {
      console.error("Error parsing GPT response JSON:", err);
      return res.status(500).json({ error: "Failed to parse AI response" });
    }

    // Always include the original idea
    const allIdeas = [baseIdea, ...ideas];
    
    return res.status(200).json({ ideas: allIdeas });
  } catch (error) {
    console.error("Error generating similar ideas from GPT-2:", error.response?.data || error.message);
    return res.status(500).json({ error: "An error occurred while generating similar project ideas" });
  }
}

module.exports = generateSimilarIdeas;