from fastapi import FastAPI, HTTPException
from fastapi_pagination import Page, add_pagination
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from shared.database.db import get_db
from shared.schemas import users as user_schema
from shared.controllers import users as users_controller
from shared.auth.jwt import sign_jwt
from shared.auth.auth import JWTBearer

# To migrate the predefined databases
# from shared.database.db import Base, engine
# Base.metadata.create_all(bind=engine)
# print("database migrated successfully!")

users_router = APIRouter()


@users_router.get(
    "/{user_id}/directions", response_model=Page[user_schema.UserDirectionsResponse]
)
def get_user_directions(user_id: int, db: Session = Depends(get_db)):
    return users_controller.fetch_user_directions_by_id(db=db, user_id=user_id)


@users_router.post("/")
def create_user(user: user_schema.UserCreation, db: Session = Depends(get_db)):
    user_created = users_controller.create_user(db=db, new_user=user)
    # FIXME: Uncomment this line to sync the user with recombee
    # users_controller.sync_user_recombee(user_created)
    response = sign_jwt(user_created)
    response["user"] = user_created.model_dump(mode="json")
    return response


@users_router.post("/login")
def login(data: user_schema.UserLoginSchema, db: Session = Depends(get_db)):
    user_fetched = users_controller.check_user_existance(
        db=db, email=data.email, password=data.password
    )

    if user_fetched is None:
        raise HTTPException(status_code=401, detail="Invalid email or password.")

    response = sign_jwt(user_fetched)
    response["user"] = user_fetched.model_dump(mode="json")

    return response


# Example on how to use authentication in an endpoint
@users_router.post("/test", dependencies=[Depends(JWTBearer())])
def test():
    return {"greeting": "hello world"}


app = FastAPI()
add_pagination(app)

app.include_router(users_router, prefix="/users", tags=["Users"])
