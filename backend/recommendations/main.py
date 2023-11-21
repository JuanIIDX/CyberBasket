from fastapi import FastAPI
from routes.recommendation import router
from dotenv import load_dotenv
import os
load_dotenv()
app = FastAPI()
app.include_router( router, prefix='/recommendation', tags=['recomendation'])
