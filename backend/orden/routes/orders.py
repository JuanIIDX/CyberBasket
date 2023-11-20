from fastapi import APIRouter, Depends, HTTPException
from typing import List

from orden.models.orders import Orden
from orden.models.orders import Detalle_Orden
from orden.schemas.orders import OrderBase, OrderDetailBase

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from shared.database.db import get_db
from orden.controllers.orders import get_ordenes, get_orden, create_orden, update_orden, delete_orden, get_detalle_ordenes, get_detalle_orden, create_detalle_orden, update_detalle_orden, delete_detalle_orden

router = APIRouter()

# Controladores para la clase Orden

@router.get("/ordenes")
def read_ordenes(db: Session = Depends(get_db)):
    return get_ordenes(db)

@router.get("/orden/{orden_id}")
def read_orden(orden_id: int, db: Session = Depends(get_db)):
    return get_orden(db, orden_id)

@router.post("/orden")
def create_orden(orden: OrderBase, db: Session = Depends(get_db)):
    return create_orden(db, orden)

@router.put("/orden/{orden_id}")
def update_orden(orden_id: int, orden: OrderBase, db: Session = Depends(get_db)):
    return update_orden(db, orden_id, orden)

@router.delete("/orden/{orden_id}")
def delete_orden(orden_id: int, db: Session = Depends(get_db)):
    return delete_orden(db, orden_id)

# routs  for Detalle_Orden

@router.get("/detalle_ordenes")
def read_detalle_ordenes(db: Session = Depends(get_db)):
    return get_detalle_ordenes(db)

@router.get("/detalle_orden/{detalle_orden_id}")
def read_detalle_orden(detalle_orden_id: int, db: Session = Depends(get_db)):
    return get_detalle_orden(db, detalle_orden_id)

@router.post("/detalle_orden")
def create_detalle_orden(detalle_orden: OrderDetailBase, db: Session = Depends(get_db)):
    return create_detalle_orden(db, detalle_orden)

@router.put("/detalle_orden/{detalle_orden_id}")
def update_detalle_orden(detalle_orden_id: int, detalle_orden: OrderDetailBase, db: Session = Depends(get_db)):
    return update_detalle_orden(db, detalle_orden_id, detalle_orden)

@router.delete("/detalle_orden/{detalle_orden_id}")
def delete_detalle_orden(detalle_orden_id: int, db: Session = Depends(get_db)):
    return delete_detalle_orden(db, detalle_orden_id)

# @router.post("/ordenes/", response_model=OrdenOut)
# async def create_order(order: OrdenCreate):
#     db_order = Orden(**order.dict())
#     db_order.save()
#     return db_order

# @router.get("/ordenes/", response_model=List[OrdenOut])
# async def read_orders(skip: int = 0, limit: int = 100):
#     orders = Orden.objects.skip(skip).limit(limit)
#     return orders

# @router.get("/ordenes/{order_id}/", response_model=OrdenOut)
# async def read_order(order_id: str):
#     order = Orden.objects(id=order_id).first()
#     if not order:
#         raise HTTPException(status_code=404, detail="Orden no encontrada")
#     return order

# @router.put("/ordenes/{order_id}/", response_model=OrdenOut)
# async def update_order(order_id: str, order: OrdenUpdate):
#     db_order = Orden.objects(id=order_id).first()
#     if not db_order:
#         raise HTTPException(status_code=404, detail="Orden no encontrada")
#     db_order.update(**order.dict())
#     return db_order

# @router.delete("/ordenes/{order_id}/", response_model=OrdenOut)
# async def delete_order(order_id: str):
#     db_order = Orden.objects(id=order_id).first()
#     if not db_order:
#         raise HTTPException(status_code=404, detail="Orden no encontrada")
#     db_order.delete()
#     return db_order

# # Controladores para la clase Detalle_Orden

# @router.post("/detalles_orden/", response_model=DetalleOrdenOut)
# async def create_order_detail(order_detail: DetalleOrdenCreate):
#     db_order_detail = Detalle_Orden(**order_detail.dict())
#     db_order_detail.save()
#     return db_order_detail

# @router.get("/detalles_orden/", response_model=List[DetalleOrdenOut])
# async def read_order_details(skip: int = 0, limit: int = 100):
#     order_details = Detalle_Orden.objects.skip(skip).limit(limit)
#     return order_details

# @router.get("/detalles_orden/{order_detail_id}/", response_model=DetalleOrdenOut)
# async def read_order_detail(order_detail_id: str):
#     order_detail = Detalle_Orden.objects(id=order_detail_id).first()
#     if not order_detail:
#         raise HTTPException(status_code=404, detail="Detalle de orden no encontrado")
#     return order_detail

# @router.put("/detalles_orden/{order_detail_id}/", response_model=DetalleOrdenOut)
# async def update_order_detail(order_detail_id: str, order_detail: DetalleOrdenUpdate):
#     db_order_detail = Detalle_Orden.objects(id=order_detail_id).first()
#     if not db_order_detail:
#         raise HTTPException(status_code=404, detail="Detalle de orden no encontrado")
#     db_order_detail.update(**order_detail.dict())
#     return db_order_detail

# @router.delete("/detalles_orden/{order_detail_id}/", response_model=DetalleOrdenOut)
# async def delete_order_detail(order_detail_id: str):
#     db_order_detail = Detalle_Orden.objects(id=order_detail_id).first()
#     if not db_order_detail:
#         raise HTTPException(status_code=404, detail="Detalle de orden no encontrado")
#     db_order_detail.delete()
#     return db_order_detail
