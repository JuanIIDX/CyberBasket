from models.model import ItemBase
from utils.connection_client import get_recombee_cliente
from recombee_api_client.api_client import RecombeeClient
from recombee_api_client.api_requests import AddUser, SetItemValues,RecommendItemsToUser,DeleteItem,ListItems,Batch
from tabulate import tabulate
class ItemService:
    def __init__(self):
        self.client = get_recombee_cliente()

   
    def update_item(self, item):
        request = SetItemValues(
        item_id=item['user_id'],
        values= item.dict(),  # This will include all attributes of the item
        cascade_create=True  # This will create the item if it doesn't exist
    )
        self.client.send(request)
    
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
     

    def upload_items_from_json(self, data):
        for item_data in data:
            try:
                item_obj = ItemBase.model_validate(item_data)
                self.create_item(item_obj)
            except Exception as e:
                print(f"Error creating item: {e}")
                # raise ??