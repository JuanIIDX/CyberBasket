from recombee_api_client.api_client import RecombeeClient
from recombee_api_client.api_client import RecombeeClient, Region
import os
from dotenv import load_dotenv
import os
load_dotenv()
def get_recombee_cliente():
    db_id = os.getenv('DATABASE_ID')
    private_token = os.getenv('PRIVATE_TOKEN')
    print("Varibales de entorno de utils")
    print(db_id, private_token)
    return RecombeeClient(db_id, private_token,region=Region.US_WEST)
    
    