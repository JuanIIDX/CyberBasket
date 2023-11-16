from fastapi import FastAPI
from routes.recommendation import router

import os
from dotenv import load_dotenv
load_dotenv()
consumer_key = os.getenv('API_KEY')

app = FastAPI()
app.include_router( router, prefix='/recombee', tags=['recombee'])