from fastapi import FastAPI
#from router import user

# To migrate the predefined databases
#from database.db import Base, engine
#Base.metadata.create_all(bind=engine)

app = FastAPI()
#app.include_router(user.router, prefix="/users", tags=["User"])

# Prueba
@app.get("/", tags=["Root"])
def main():
    return {"message": "Hello World"}
