from flask import Flask, request, jsonify
import ollama
import random
import urllib.parse

app = Flask(__name__)

@app.route('/generate-image-prompt', methods=['POST'])
def generate_image_prompt():
    data = request.json
    text_blob = data.get("text_blob")

    print("foo"+text_blob)

    if not text_blob:
        return jsonify({'error': 'text_blob is required'}), 400

    try:

        prompts = ['a vivid and colorful childrens book illustration that includes silly and magical creatures', 'a highly realistic scene with a focus on the details']
        selectedPrompt = random.choice(prompts)
        text_blob = text_blob[-3000:]
        response = ollama.generate(model='llama3', prompt="Write a prompt of no more than twenty words for an AI image model like Stable Diffusion or Midjourney for a "+ selectedPrompt + ", and references the below text:\n\n"+ text_blob)
        print(response)  # Debugging: Print the response to see its structure
        print(type(response))  # Debugging: Print the type of the response

        if response:
            image_prompt = response['response']
            return jsonify({'image_prompt': image_prompt})
        else:
            return jsonify({'error': 'Invalid response format from ollama', 'response': response}), 500
    except ollama.ResponseError as e:
        return jsonify({'error': str(e), 'status_code': e.status_code}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)