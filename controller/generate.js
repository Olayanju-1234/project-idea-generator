const axios = require('axios');

// Controller for generating project ideas
async function generateIdea(req, res) {
  const selectedField = req.body.selectedField; // Get the selected field from the request
  const apiKey = process.env.OPENAI_API_KEY;
  const model = 'gpt-3.5-turbo'; // You can use 'gpt-4' for the newer model

  try {
    // Define predefined prompts based on user selections
    const predefinedPrompts = {
      'generate-nodejs-project': 'Generate a project idea for a Node.js application.',
      'generate-python-project': 'Generate a project idea for a Python application.',
      'generate-react-project': 'Generate a project idea for a React application.',
      'generate-angular-project': 'Generate a project idea for an Angular application.',
      'generate-vue-project': 'Generate a project idea for a Vue application.',
      'generate-flutter-project': 'Generate a project idea for a Flutter application.',
      'generate-ionic-project': 'Generate a project idea for an Ionic application.',
      'generate-django-project': 'Generate a project idea for a Django application.',
      'generate-rails-project': 'Generate a project idea for a Rails application.',
      'generate-laravel-project': 'Generate a project idea for a Laravel application.',
      'generate-express-project': 'Generate a project idea for an Express application.',
      'generate-spring-project': 'Generate a project idea for a Spring application.',
      'generate-csharp-project': 'Generate a project idea for a C# application.',
    };

    // Get the prompt based on the selected field
    const prompt = predefinedPrompts[selectedField];

    if (!prompt) {
      res.status(400).json({ error: 'Invalid or unsupported field selection.' });
      return;
    }

    const response = await axios.post('https://api.openai.com/v1/chat/completions', {
      model,
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that generates project ideas.'
        },
        {
          role: 'user',
          content: prompt
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    const idea = response.data.choices[0].message.content;
    res.json({ idea });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate idea' });
  }
}

module.exports = {
  generateIdea,
};
