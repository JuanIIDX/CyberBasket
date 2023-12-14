
from datetime import date
from typing import List, Optional
from pydantic import BaseModel


class OrderBase(BaseModel):
    id_pago: Optional[int] = None
    id_envio: Optional[int] = None
    impuesto: float
    estado: str
    fecha_creacion: date
    fecha_actualizacion: date
    id_tienda: Optional[int] = None
    id_user: Optional[int] = None
    
    
class OrderUpdateBase(BaseModel):
    id_orden : int
    id_pago: Optional[int] = None
    id_envio: Optional[int] = None
    impuesto: float
    estado: str
    fecha_creacion: date
    fecha_actualizacion: date
    id_tienda: Optional[int] = None
    id_user: Optional[int] = None


class OrderDetailBase(BaseModel):
    id_orden: int
    producto_id: int
    cantidad: int
    precio_unitario: float

class CarritoComprarBase(BaseModel):
    id_producto: int
    id_user: int
    cantidad: int
    precio_unitario: float
    estado: str
    
class envioBase(BaseModel):
    costo: float
    descripcion: str
    estado: str
    numero_envio: str
    
class pagoBase(BaseModel):
    tipo_pago: str
    monto: float
    estado: str
    fecha_creacion: date



class CartItem(BaseModel):
    product_id: int
    quantity: int
    price: float
    user_id: int

class OrderInfo(BaseModel):
    user_id: int  # Puedes ajustar los campos según tus necesidades
    product_id: int = None  # Producto directo (opcional)
    quantity: int = 1  # Cantidad de productos (por defecto 1)
    cart_items: List[CartItem] = None  # Carrito de compras (opcional)

class InventarioBasicSchema(BaseModel):
    id_tienda: int
    id_producto: int
    cantidad:int


