from pydantic import BaseModel


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