from fastapi import FastAPI
from  routes.orders import router
app = FastAPI()
#app.mount("/static", StaticFiles(directory="static"), name="static")
app.include_router(router, prefix="/orden")
@app.get("/", tags=["Main"])
def main():
    return {"message": "Hello cyberbasket"}
