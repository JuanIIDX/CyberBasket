from fastapi import FastAPI
from routes.recommendation import router
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()
app.include_router( router, prefix='/recommendations', tags=['recomendation'])