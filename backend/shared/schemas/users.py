from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime

class UserResponse(BaseModel):
  id: int
  name: str
  last_name: Optional[str]
  email: str
  password: str = Field(exclude=True)
  creation_date: datetime
  update_date: datetime
  status: str

  role_id: int

class RoleResponse(BaseModel):
  id: int
  name: str

class UserDirectionsResponse(BaseModel):
  id: int
  title: Optional[str]
  phone_number: Optional[str]
  address: str
  city: str
  state: str
  country: str

  user_id: int

class UserLoginSchema(BaseModel):
  email: str
  password: str
