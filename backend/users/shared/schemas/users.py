from typing import Optional
from pydantic import BaseModel, Field
from datetime import datetime

class UserResponse(BaseModel):
  id: Optional[int]
  name: str
  last_name: Optional[str]
  email: str
  password: str = Field(exclude=True)
  creation_date: Optional[datetime] = Field(default=datetime.now())
  update_date: Optional[datetime] = Field(default=datetime.now())
  status: Optional[str] = Field(default="created")

  role_id: Optional[int]

class RoleResponse(BaseModel):
  id: int
  name: str

class UserDirectionsResponse(BaseModel):
  id: int
  title: Optional[str]
  phone_number: Optional[str]
  address: str
  city: Optional[str]
  state: Optional[str]
  country: Optional[str]

  user_id: Optional[int]

class UserCreation(BaseModel):
  name: str
  last_name: Optional[str] = Field(default="")
  email: str
  password: str = Field(exclude=True)
  creation_date: Optional[datetime] = Field(default=datetime.now())
  update_date: Optional[datetime] = Field(default=datetime.now())
  status: Optional[str] = Field(default="created")
  role_id: int = Field(default=1)

class UserLoginSchema(BaseModel):
  email: str
  password: str
