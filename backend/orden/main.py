import sys, os

sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

from fastapi import FastAPI
from  .routes.orders import router

app = FastAPI()
app.include_router(router, prefix="/orden")
