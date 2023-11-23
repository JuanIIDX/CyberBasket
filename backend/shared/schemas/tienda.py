from pydantic import BaseModel, Field
from datetime import datetime


class TiendaBasicSchema(BaseModel):
    id_tienda:int
    id_direccion:int
    nombre:str
    descripcion:str
