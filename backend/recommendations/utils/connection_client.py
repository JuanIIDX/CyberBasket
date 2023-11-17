from recombee_api_client.api_client import RecombeeClient
import os
def get_recombee_cliente():
    db_id = os.getenv('DATABASE_ID')
    private_token = os.getenv('PRIVATE_TOKEN')
    return RecombeeClient(db_id, private_token)
    
    
    
    