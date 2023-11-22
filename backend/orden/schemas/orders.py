
from datetime import date
from typing import List, Optional
from pydantic import BaseModel

class OrderBase(BaseModel):
    id_pago: int
    id_envio: int
    impuesto: float
    estado: str
    fecha_creacion: date
    fecha_actualizacion: Optional[date] = None


class OrderDetailBase(BaseModel):
    orden_id: int
    producto_id: int
    cantidad: int
    precio_unitario: float


