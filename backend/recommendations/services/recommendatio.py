class RecombeeService:
    def __init__(self) -> None:
        pass
    #  def __init__(self):
    #     self.base_url = 'https://rapi.recombee.com/v1'
    #     self.headers = {
    #         'Content-Type': 'application/json',
    #         'Authorization': f'Token {RECOMBEE_API_KEY}'
    #     }

    # async def get_recommendations(self, user_id, item_count=5):
    #     # Implementa lógica para obtener recomendaciones de Recombee
    #     # Utiliza httpx para realizar solicitudes HTTP
    #     # Devuelve las recomendaciones como un objeto JSON

    #     # Ejemplo:
    #     url = f'{self.base_url}/personalized/user/{user_id}/recommend/'
    #     params = {'count': item_count}
    #     async with httpx.AsyncClient() as client:
    #         response = await client.get(url, headers=self.headers, params=params)
    #         return response.json()