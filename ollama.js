const express = require('express')
const { default: ollama } = require('ollama');

const app = express();
const port = 5001;

app.get('/llm', async (req, res) => {

  console.log(req.query);

  const transcription = req.query.message || "";

  const prompt = "Use the text below this message to generate a simple prompt of no more than ten words for a simple, beautiful, concrete, and vividly colorful illustration in a childrens book including strange and magical creatures for an AI image model like stable diffusion. Respond with prompt only and no additional commentary. If no text is provided just respond with 'Subconscious portal dreaming'. Here is the text:\n\n[" + transcription + "]";

  try {
    const response = await ollama.chat({
      model: 'llama3',
      messages: [{ role: 'user', content: prompt }]
    })

    console.log("Transcription received! Generating prompt:", JSON.stringify({
      transcription: transcription,
      response: response.message.content
    }, null, 2));

    if (response && response.message.content) {
      return res.json({
        response: response.message.content
      });
    } else {
      return res.status(500).json({ error: 'Invalid response format from Ollama', response: response.data });
    }
  } catch (error) {
    if (error.response) {
      return res.status(500).json({ error: error.message, status_code: error.response.status });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});