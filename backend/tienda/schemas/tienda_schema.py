
from pydantic import BaseModel

##Modelo de producto
class Crea_producto(BaseModel):
    nombre: str
    descripcion: str
    precio: float


##Modelo de inventario
class Crea_inventario(BaseModel):
    id_producto: int
    id_tienda: int
    stock: int

##Modelo de inventario
class tiendaModel(BaseModel):
    id_tienda : int
    id_direccion: int
    nombre: str
    estado: bool

class categoria_tienda(BaseModel):
    id_categoria_tienda: int
    nombre: str

class categoria_tiendaXtienda(BaseModel):
    id_categoria_tienda: int
    id_tienda: int

class consulta_productos_por_tienda(BaseModel):
    nombre: str
    descripcion : str
    cantidad: int


class temporal(BaseModel):
    id_tienda : int
    nombre: str
    estado: bool

class MarcaSchema(BaseModel):
    nombre: str
    descripcion: str

class ProductoXMarcaSchema(BaseModel):
    id_producto: int
    id_marca: int




