from fastapi import FastAPI
from .routes.recommendation import router
from dotenv import load_dotenv
import sys, os
sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))
load_dotenv()
app = FastAPI()
app.include_router( router, prefix='/recommendation', tags=['recomendation'])
