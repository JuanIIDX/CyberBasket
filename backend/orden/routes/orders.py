from fastapi import APIRouter, HTTPException
from typing import List

from orden.models.orden import Orden
from orden.models.detalle_orden import Detalle_Orden
from orden.schemas.orden import OrdenCreate, OrdenOut, OrdenUpdate
from orden.schemas.detalle_orden import DetalleOrdenCreate, DetalleOrdenOut, DetalleOrdenUpdate

router = APIRouter()

# Controladores para la clase Orden

@router.post("/ordenes/", response_model=OrdenOut)
async def create_order(order: OrdenCreate):
    db_order = Orden(**order.dict())
    db_order.save()
    return db_order

@router.get("/ordenes/", response_model=List[OrdenOut])
async def read_orders(skip: int = 0, limit: int = 100):
    orders = Orden.objects.skip(skip).limit(limit)
    return orders

@router.get("/ordenes/{order_id}/", response_model=OrdenOut)
async def read_order(order_id: str):
    order = Orden.objects(id=order_id).first()
    if not order:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    return order

@router.put("/ordenes/{order_id}/", response_model=OrdenOut)
async def update_order(order_id: str, order: OrdenUpdate):
    db_order = Orden.objects(id=order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    db_order.update(**order.dict())
    return db_order

@router.delete("/ordenes/{order_id}/", response_model=OrdenOut)
async def delete_order(order_id: str):
    db_order = Orden.objects(id=order_id).first()
    if not db_order:
        raise HTTPException(status_code=404, detail="Orden no encontrada")
    db_order.delete()
    return db_order

# Controladores para la clase Detalle_Orden

@router.post("/detalles_orden/", response_model=DetalleOrdenOut)
async def create_order_detail(order_detail: DetalleOrdenCreate):
    db_order_detail = Detalle_Orden(**order_detail.dict())
    db_order_detail.save()
    return db_order_detail

@router.get("/detalles_orden/", response_model=List[DetalleOrdenOut])
async def read_order_details(skip: int = 0, limit: int = 100):
    order_details = Detalle_Orden.objects.skip(skip).limit(limit)
    return order_details

@router.get("/detalles_orden/{order_detail_id}/", response_model=DetalleOrdenOut)
async def read_order_detail(order_detail_id: str):
    order_detail = Detalle_Orden.objects(id=order_detail_id).first()
    if not order_detail:
        raise HTTPException(status_code=404, detail="Detalle de orden no encontrado")
    return order_detail

@router.put("/detalles_orden/{order_detail_id}/", response_model=DetalleOrdenOut)
async def update_order_detail(order_detail_id: str, order_detail: DetalleOrdenUpdate):
    db_order_detail = Detalle_Orden.objects(id=order_detail_id).first()
    if not db_order_detail:
        raise HTTPException(status_code=404, detail="Detalle de orden no encontrado")
    db_order_detail.update(**order_detail.dict())
    return db_order_detail

@router.delete("/detalles_orden/{order_detail_id}/", response_model=DetalleOrdenOut)
async def delete_order_detail(order_detail_id: str):
    db_order_detail = Detalle_Orden.objects(id=order_detail_id).first()
    if not db_order_detail:
        raise HTTPException(status_code=404, detail="Detalle de orden no encontrado")
    db_order_detail.delete()
    return db_order_detail
