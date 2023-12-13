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

##Modelo de producto
class Product_Schema(BaseModel):
    nombre: str
    descripcion: str
    precio: float




class Products_Home(BaseModel):
    nombre: str
    cantidad: int


##Esquemas para los datos de la pagina de inicio
class test(BaseModel):
    nombre: str
    descripcion: str

class datos_producto_home(BaseModel):
    num_productos: int
    num_paginas: int
    pagina_actual: int
    offset: int
    limite: int
    productos: list[test]

##Esquemas para la pagina de producto




##Esquemas para el dashboard del usuario









