import shutil
from utils.connection_client import get_recombee_cliente
from fastapi import UploadFile, File
from models.model import UserBase
from recombee_api_client.api_client import RecombeeClient
from recombee_api_client.api_requests import AddUser, SetUserValues,GetUserValues,DeleteUser,ListUsers,Batch
import pandas as pd
import tempfile
from tabulate import tabulate




class UserService:
    def __init__(self):
        self.client = get_recombee_cliente()
        self.user_ids = []  # Inicializa user_ids
        self.users  = []
        self.used_emails = set()


    def get_user(self, user_id):
        return self._user_repository.get_user(user_id)

  
    
    def user_exists(self, user_id):
        # Verificar si el usuario ya existe
        try:
            request = GetUserValues(user_id=user_id)
            response = self.client.send(request)
            return response is not None  # Si la respuesta no es None, el usuario existe
        except Exception as e:
            # Manejar la excepción según tus necesidades
            return False
    def email_exists(self, email):
        # Verificar si ya existe un usuario con este correo electrónico
        return email in self.used_emails

        
    def create_user(self, user):
        user_id = user.user_id
        email = user.email

        if self.user_exists(user_id):
            print(f"El usuario con user_id {user_id} ya existe. No se creará nuevamente.")
            return None
        if self.email_exists(email):
            print(f"El correo electrónico {email} ya está en uso. No se creará un nuevo usuario con este correo electrónico.")
            return None
        
        request = SetUserValues(
        user_id=user_id,
        values={
            'name': user.name,
            'email': email,
            'last_name': user.last_name,
            # Add any other properties here
        },
        cascade_create=True  # This will create the user if it doesn't exist
        )
        #Todo : no creo que user_ids haga falta
        self.user_ids.append(user_id)
        self.used_emails.add(email) 
        self.client.send(request)

        
    def upload_users(self, file):
        # pip install openpyxl
        # pip instal python-multipart
        # NamedTemporaryFile will create a temporary file in the default system directory for temporary files
        with tempfile.NamedTemporaryFile(delete=False) as tmp:
        # Copy the contents of the uploaded file to the temporary file
            # shutil.copyfileobj(file.file, tmp) nos permite copiar el contenido del archivo subido al archivo temporal
            shutil.copyfileobj(file, tmp)
            tmp_path = tmp.name

        # Now you can read the file with pandas
        df = pd.read_excel(tmp_path)
        table = []
        request_batch = []
        for index, row in df.iterrows():
            row_dict = row.to_dict()
            row_dict['user_id'] = str(row_dict['user_id'])
            user = UserBase(**row_dict)
            table.append(user.model_dump())
            req = self.create_user(user)
            if req is not None:
                request_batch.append(req)
        
        if request_batch:
            try:
                batch_request = Batch(request_batch,TimeoutError=10000)
                self.client.send(batch_request)
                print(f"{len(request_batch)} users uploaded successfully.")
            except Exception as e:
                print(f"Error uploading users: {str(e)}")
        
        print(tabulate(table, headers="keys", tablefmt="grid"))   
            
    def delete_all_users(self):
            request = self.get_all_usersId()
            print("id's",request)
            self.delete_users_batch(request)
       
    
    def delete_users_batch(self, user_ids):
        try:
            requests = [DeleteUser(user_id=user_id) for user_id in user_ids]
            batch = Batch(requests)
            self.client.send(batch)
        except Exception as e:
            print(f"Error deleting users: {e}")
       
    # def delete_user(self, user_id):
    #     try:
    #         request = DeleteUser(user_id=user_id)
    #         self.client.send(request)
    #         print(f"User {user_id} deleted successfully.")
    #     except Exception as e:
    #         print(f"Error deleting user {user_id}: {e}")
            
            
    def get_all_usersId(self):
            request = ListUsers(count=100)  # Obtiene los primeros 100 usuarios
            response = self.client.send(request)
            return response
        
      