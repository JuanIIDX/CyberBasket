from fastapi import FastAPI
from database.db import Base, engine
from routers import routers
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI()
app.include_router(routers.router, tags=["Productos"])

origins = [
    "https://127.0.0.1:4200",
    "http://127.0.0.1:4200"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Main"])
def main():
    return {"message": "test1"}