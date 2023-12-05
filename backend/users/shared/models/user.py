from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from ..database.db import Base

class User(Base):
  __tablename__ = "users"

  id = Column(Integer, primary_key=True)
  name = Column(String(100), nullable=False)
  last_name = Column(String(100), nullable=True)
  email = Column(String(100), unique=True)
  password = Column(String(100))
  creation_date = Column(DateTime(timezone=False))
  update_date = Column(DateTime(timezone=False))
  status = Column(String(20))

  role_id = Column(Integer, ForeignKey("roles.id"))

  role = relationship("Role", back_populates="users")
  directions = relationship("UserDirections", back_populates="user")

class Role(Base):
  __tablename__ = "roles"

  id = Column(Integer, primary_key=True)
  name = Column(String(100))

  users = relationship("User", back_populates="role")

class UserDirections(Base):
  __tablename__ = "user_directions"

  id = Column(Integer, primary_key=True)
  title = Column(String(100))
  phone_number = Column(String(100))
  address = Column(String(100))
  city = Column(String(100))
  state = Column(String(100))
  country = Column(String(100))

  user_id = Column(Integer, ForeignKey("users.id"))

  user = relationship("User", back_populates="directions")
