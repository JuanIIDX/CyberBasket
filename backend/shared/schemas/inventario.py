from pydantic import BaseModel, Field
from datetime import datetime

class InventarioBasicSchema(BaseModel):
    id_inventario: int
    id_tienda: int
    id_producto: int

class ProductoBasicSchema(BaseModel):
    id_producto:int
    nombre:str
    descripcion:str
    imagen:str
    precio:float
    fecha_creacion:datetime
    fecha_actualizacion:datetime


