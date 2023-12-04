
from datetime import date
from typing import List, Optional
from pydantic import BaseModel


class OrderBase(BaseModel):
    cliente_info: str
    numero_envio: str
    total_orden: float
    id_tienda: Optional[int] = None
    id_cliente: Optional[int] = None
    impuesto: float
    estado: str
    fecha_creacion: date
    fecha_actualizacion: date

class OrderDetailBase(BaseModel):
    orden_id: int
    producto_id: int
    cantidad: int
    precio_unitario: float

class CarritoComprarBase(BaseModel):
    producto_id: int
    user_id: int
    cantidad: int
    precio_unitario: float
    estado: str


