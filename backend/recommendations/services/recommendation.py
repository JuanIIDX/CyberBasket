# services/recombee_service.py
from recombee_api_client.api_client import RecombeeClient
from recombee_api_client.api_requests import RecommendItemsToUser
from utils.connection_client import get_recombee_cliente

class RecombeeService:
    def __init__(self):
        self.client = get_recombee_cliente()

    def get_recommendations(self, user_id: str, count: int):
        request = RecommendItemsToUser(user_id, count)
        response = self.client.send(request)
        return response