# app/routes/recombee.py
from fastapi import APIRouter
from app.controllers.recombee_controller import get_recommendations

router = APIRouter()

@router.get('/recommendations/{user_id}')
async def get_recombee_recommendations(user_id: str):
    return await get_recommendations(user_id)
