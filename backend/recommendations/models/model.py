from pydantic import BaseModel,validator
from datetime import datetime


class UserBase(BaseModel):
    user_id: str
    name: str
    email: str
    last_name: str
    
class ItemBase(BaseModel):
    item_id: str
    name: str
    description: str
    price: float
    category: str
    brand : str
    discount : float
    @validator('price')
    def validate_price(cls, price):
        if price < 0:
            raise ValueError("Price cannot be negative")
        return price