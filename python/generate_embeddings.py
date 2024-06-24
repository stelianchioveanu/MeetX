import tensorflow as tf
from transformers import RobertaTokenizer, TFRobertaModel
import pandas as pd

data = pd.read_excel('jobs.xlsx')

tokenizer = RobertaTokenizer.from_pretrained('roberta-large')
model = TFRobertaModel.from_pretrained('roberta-large')

def get_embeddings(text):
    inputs = tokenizer(text, return_tensors="tf", truncation=True, padding=True, max_length=128)
    outputs = model(inputs)
    embeddings = outputs.last_hidden_state[:, 0, :].numpy()
    return embeddings

data['embeddings'] = data['JobTitle'].apply(lambda x: get_embeddings(x).tolist())

data.to_csv('job_titles_with_embeddings.csv', index=False)