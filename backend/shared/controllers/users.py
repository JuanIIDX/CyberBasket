from sqlalchemy.orm import Session
from fastapi_pagination.ext.sqlalchemy import paginate

from ..schemas import users as user_schema
from ..models import user as user_models
from ..auth.passwords import hash_password

def fetch_user_by_id(db:Session, user_id: int) -> user_schema.UserResponse:
  user = db.query(user_models.User).filter(user_models.User.id == user_id).first()
  return user

def fetch_user_by_email(db:Session, email: str) -> user_schema.UserResponse:
  user = db.query(user_models.User).filter(user_models.User.email == email).first()
  return user

def create_user(db:Session, new_user: user_schema.UserResponse) -> user_schema.UserResponse:
  res_user = {}

  user = user_models.User(**new_user.model_dump())
  user.password = hash_password(new_user.password)

  db.add(user)
  db.commit()
  db.refresh(res_user)

  return user_schema.UserResponse(**res_user.__dict__)

def check_user_existance(db: Session, email: str, password: str) -> user_schema.UserResponse:
  hashed_password = hash_password(password)

  user = db.query(user_models.User).filter(user_models.User.email == email).filter(user_models.User.password == hashed_password).first()

  return user

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
    query=user_directions,
    transformer=lambda items: [user_schema.UserDirectionsResponse(**i.__dict__) for i in items],
  )