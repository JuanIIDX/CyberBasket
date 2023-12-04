
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
    id_cliente: Optional[int] = None


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
