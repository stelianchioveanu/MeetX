from flask import Flask, request, jsonify
import tensorflow as tf
from transformers import RobertaTokenizer, TFRobertaModel
import json

app = Flask(__name__)

tokenizer = RobertaTokenizer.from_pretrained('roberta-large')
model = TFRobertaModel.from_pretrained('roberta-large')

def get_embeddings(text):
    inputs = tokenizer(text, return_tensors="tf", truncation=True, padding=True, max_length=128)
    outputs = model(inputs)
    embeddings = outputs.last_hidden_state[:, 0, :].numpy()
    return embeddings.tolist()

@app.route('/embeddings', methods=['POST'])
def embeddings():
    data = request.get_json()
    text = data['text']
    embeddings = get_embeddings(text)
    return jsonify({'embeddings': embeddings})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)