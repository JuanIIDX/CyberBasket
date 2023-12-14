from pydantic import BaseModel, Field
from datetime import datetime
from typing import List

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

class productos_home(BaseModel):
    id_producto: int
    nombre_producto: str
    nombre_tienda: str
    precio_producto: float

class datos_producto_home(BaseModel):
    num_productos: int
    num_paginas: int
    pagina_actual: int
    offset: int
    limite: int
    productos: list[productos_home]

##Esquemas para la pagina de producto





##Esquemas para el dashboard del usuario









"""
Esquemas para insercion productos
"""
class insercion_producto_front_schema(BaseModel):
    tienda_id: int
    nombre_producto: str
    descripcion_producto: str
    precio_producto: float
    id_categoria: int
    stock: int
    lista_imagenes: list[str]

class producto_insercion_schema(BaseModel):
    nombre: str
    descripcion: str
    precio: float
    fecha_creacion: datetime
    fecha_actualizacion: datetime


"""
Esquemas para info productos
"""
class producto_info_schema(BaseModel):
    id_producto: int
    id_tienda: int
    nombre_producto: str
    nombre_tienda: str
    descripcion: str
    precio: float
    cantidad: int







class producto_schema_pagina(BaseModel):
    id_tienda: int
    nombre: str
    descripcion: str
    precio: float
    cantidad: int








"""
Esquemas para imagenes de producto
"""
class image_product_schema_1(BaseModel):
    id_producto: int
    nombre: str
    tipo: str
    base64content: str








"""
ESQUEMAS GENERICOS
Esquemas para todos las tablas de la base de datos
"""

class producto_schema(BaseModel):
    nombre: str
    descripcion: str
    precio: float
    fecha_creacion: datetime
    fecha_actualizacion: datetime

class inventario_schema(BaseModel):
    id_tienda: int
    id_producto: int
    cantidad: int

class productoXcategoria_schema(BaseModel):
    id_producto: int
    id_categoria: int

class imagen_prod_schema(BaseModel):
    id_producto: int
    tipo: str
    base64content: str
    nombre: str
    fecha_creacion: datetime
    fecha_modificacion: datetime










