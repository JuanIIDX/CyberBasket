from utils.connection_client import get_recombee_cliente
from recombee_api_client.api_client import RecombeeClient
from recombee_api_client.api_requests import AddUser, SetItemValues

class ItemService:
    def __init__(self):
        self.item_client = get_recombee_cliente()

   
    def update_item(self, item):
        request = SetItemValues(
        item_id=item['user_id'],
        values= item.dict(),  # This will include all attributes of the item
        cascade_create=True  # This will create the item if it doesn't exist
    )
        self.client.send(request)