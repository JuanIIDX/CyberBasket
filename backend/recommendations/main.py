from fastapi import FastAPI
import os
from dotenv import load_dotenv
load_dotenv()
consumer_key = os.getenv('API_KEY')

app = FastAPI()