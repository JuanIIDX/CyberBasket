# app/routes/recombee.py
from fastapi import APIRouter, Body, UploadFile, File,Response
from ..models.model import *
from ..services.recommendation import RecombeeService
from ..services.user import UserService
from ..services.item import *
import json

router = APIRouter()
service_recomendation = RecombeeService()
service_user = UserService()
service_item = ItemService()


@router.post("/users/")
async def create_user(user: UserBase = Body(...)):
    service_user.create_user(user.model_dump())
    return {"detail": "User created successfully"}

@router.post("/upload_users")
async def upload_users(file: UploadFile = File(...)):
    service_user.upload_users(file.file)
    return {"detail": "Users uploaded successfully"}


@router.delete("/delete_all_users")
async def delete_all_users_r():
    service_user.delete_all_users()
    return {"detail": "All users deleted successfully"}


@router.post("/upload_items")
async def upload_items(file: UploadFile = File(...)):
    # Read the file
    content = await file.read()
    data = json.loads(content)
    # Call upload_items_from_json
    service_item.upload_items_from_json(data)
    return {"message": "Items uploaded successfully"}

@router.get("/items")
async def get_all_items():
    return service_item.get_all_items()

@router.get("/items/{item_id}")
async def get_item_by_id(item_id: str):
    return service_item.get_item(item_id)


@router.post("/add_detail_view")
async def add_detail_view(user_id: str, item_id: str):
    service_recomendation.add_detail_view(user_id, item_id)
    return {"message": "Detail view added successfully"}


@router.get("/recommendations/{user_id}")
async def get_recommendations(user_id: str):
    resp = service_recomendation.get_recommendations(user_id, 5)
    return resp

