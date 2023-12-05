from fastapi import FastAPI
from database.db import Base, engine
from routers import routers
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(routers.router, tags=["Productos"])

"""Modificar luego el origins"""

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    expose_headers=["*"]
)

@app.get("/", tags=["Main"])
def main():
    return {"message": "test7"}