# app/controllers/recombee_controller.py
from fastapi import HTTPException
from app.services.recombee_service import RecombeeService

recombee_service = RecombeeService()

async def get_recommendations(user_id: str):
    try:
        recommendations = await recombee_service.get_recommendations(user_id)
        return recommendations
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Error fetching recommendations: {str(e)}')
