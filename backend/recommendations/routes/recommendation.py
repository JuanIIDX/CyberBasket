# app/routes/recombee.py
from fastapi import APIRouter, Body, UploadFile, File
from models.model import UserBase
from services.recommendation import RecombeeService
from services.user import UserService

router = APIRouter()
service = RecombeeService()
service_user = UserService()

@router.get("/recommendations/{user_id}")
async def get_recommendations_to_user(user_id: str,count: int = 10):
    return service.get_recommendations(user_id, count)

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


# def track_item_view(self, user_id: str, item_id: str):
#         request = AddDetailView(user_id, item_id)
#         self.client.send(request)

#     def recommend_based_on_views(self, user_id: str, count: int):
#         request = RecommendItemsToUser(user_id, count)
#         recommendations = self.client.send(request)
#         return recommendations