from fastapi import FastAPI
from database.db import Base, engine
from routers import routers

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(routers.router, tags=["Productos"])

@app.get("/", tags=["Main"])
def main():
    return {"message": "Hello World"}