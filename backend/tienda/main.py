from fastapi import FastAPI
from database.db import Base, engine
from routers import routers
import os
#sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))


Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(routers.router, tags=["Productos"])

@app.get("/", tags=["Main"])
def main():
    return {"message": "Hello World"}