from ..models.model import ItemBase
from ..utils.connection_client import get_recombee_cliente
from recombee_api_client.api_client import RecombeeClient
from recombee_api_client.api_requests import GetItemValues, SetItemValues,RecommendItemsToUser,DeleteItem,ListItems,Batch
class ItemService:
    def __init__(self):
        self.client = get_recombee_cliente()
    
    def create_item(self, item: ItemBase):
        request = SetItemValues(
            item_id=item.item_id,
            values= {
                "name": item.name,
                "description": item.description, 
                "price": item.price,
                "category": item.category,
                "brand": item.brand,
                "discount": item.discount,
            },
            cascade_create=True # This will include all attributes of the item
            )
        self.client.send(request)
     
    def get_all_items(self): 
        try:
            request = ListItems(return_properties= True,count=100)
            response = self.client.send(request)
            return response 
        except Exception as e:
            print(f"Error getting items: {e}")
    
    
    def get_item(self, item_id: str):
        try:
            request = GetItemValues(item_id=item_id)
            response = self.client.send(request)
            return response
        except Exception as e:
            print(f"Error getting item: {e}")
    
    def delete_item(self, item_id: str):
        try:
            request = DeleteItem(item_id=item_id)
            self.client.send(request)
        except Exception as e:
            print(f"Error deleting item: {e}")
    
    
    
    def upload_items_from_json(self, data):
        for item_data in data:
            try:
                item_obj = ItemBase.model_validate(item_data)
                self.create_item(item_obj)
            except Exception as e:
                print(f"Error creating item: {e}")
                # raise ??