# app/routes/recombee.py
from fastapi import APIRouter
from services.recommendation import RecombeeService

router = APIRouter()

@router.get('/recommendations/{user_id}')
async def get_recommendations_to_user(user_id: str,count: int = 10):
    service = RecombeeService()
    return service.get_recommendations(user_id, count)
