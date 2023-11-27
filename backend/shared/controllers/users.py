# The line `return users_controller.fetch_user_directions_by_id(db=db, user_id=user_id)` is
# calling the `fetch_user_directions_by_id` function from the `users_controller` module. This
# function is responsible for fetching the directions associated with a specific user from the
# database.
from typing import Optional

from sqlalchemy.orm import Session
from fastapi_pagination.ext.sqlalchemy import paginate

from ..schemas import users as user_schema
from ..models import user as user_models
from ..auth.passwords import hash_password
from recommendations.services.user import UserService

user_service = UserService() 

def fetch_user_by_id(db:Session, user_id: int) -> user_schema.UserResponse:
  user = db.query(user_models.User).filter(user_models.User.id == user_id).first()
  return user

def fetch_user_by_email(db:Session, email: str) -> user_schema.UserResponse:
  user = db.query(user_models.User).filter(user_models.User.email == email).first()
  return user

def create_user(db:Session, new_user: user_schema.UserCreation) -> user_schema.UserResponse:
  user = user_models.User(**new_user.model_dump())
  user.password = hash_password(new_user.password)

  db.add(user)
  db.commit()
  db.refresh(user)

  return user_schema.UserResponse(**user.__dict__)

def check_user_existance(db: Session, email: str, password: str) -> Optional[user_schema.UserResponse]:
  hashed_password = hash_password(password)

  user = db.query(user_models.User).filter(user_models.User.email == email).filter(user_models.User.password == hashed_password).first()

  if user is None:
    return None

  return user_schema.UserResponse(**user.__dict__)

def fetch_role(db:Session, role_name: str):
  role = db.query(user_models.Role).filter(user_models.Role.name == role_name).first()
  return role

def create_role(db:Session, new_role: user_schema.RoleResponse):
  res_role = {}
  role = user_models.Role(**new_role.model_dump())

  db.add(role)
  db.commit()
  db.refresh(res_role)

  return user_schema.RoleResponse(**res_role.__dict__)

def fetch_user_directions_by_id(db:Session, user_id: int):
  user_directions = db.query(user_models.UserDirections).filter(user_models.UserDirections.user_id == user_id)
  user_directions = user_directions.order_by(user_models.UserDirections.id)

  return paginate(
    user_directions,
    transformer=lambda items: [user_schema.UserDirectionsResponse(**i.__dict__) for i in items],
  )



def sync_user_recombee(user):
    count = len(user_service.get_all_usersId()) + 1
    user_recombe = {
        "user_id": str(count),
        "name": user.name,
        "email": user.email,
        "last_name": user.last_name,
    }
    user_service.create_user(user_recombe)
    
  