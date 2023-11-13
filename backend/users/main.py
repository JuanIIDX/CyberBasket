from fastapi import FastAPI
from fastapi_pagination import Page, add_pagination
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from shared.database.db import get_db
from shared.schemas import users as user_schema
import shared.controllers.users as users_controller

# To migrate the predefined databases
#from database.db import Base, engine
#Base.metadata.create_all(bind=engine)

users_router = APIRouter()

@users_router.get("/{user_id}/directions", response_model=Page[user_schema.UserDirectionsResponse])
def get_users(user_id: int, db: Session = Depends(get_db)):
    return users_controller.fetch_user_directions_by_id(db=db, user_id=user_id)

app = FastAPI()
add_pagination(app)

app.include_router(users_router, prefix="/users", tags=["Users"])

@app.get("/", tags=["Root"])
def main():
    return {"message": "Hello World"}
