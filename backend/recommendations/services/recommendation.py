# services/recombee_service.py
from ..utils.connection_client import get_recombee_cliente
from recombee_api_client.api_requests import AddDetailView, RecommendItemsToUser, SearchItems


class RecombeeService:
    def __init__(self):
        self.client = get_recombee_cliente()
        
        
    def add_detail_view(self, user_id: str, item_id: str):
        request = AddDetailView(user_id, item_id, cascade_create=True)
        self.client.send(request)
        

    def get_recommendations(self, user_id: str, count: int):
        request = RecommendItemsToUser(user_id, count,return_properties=True)
        response = self.client.send(request)
        return response
    
    def search_items(self, query: str, count: int):
        request = SearchItems(query, count,return_properties=True)
        response = self.client.send(request)
        return response
    
   