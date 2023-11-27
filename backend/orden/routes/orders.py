from fastapi import APIRouter, Depends

from orden.schemas.orders import OrderBase, OrderDetailBase

from sqlalchemy.orm import Session
from shared.database.db import get_db
from orden.controllers.orders import get_ordenes, get_orden, create_orden, update_orden, delete_orden, get_detalle_ordenes, get_detalle_orden, create_detalle_orden, update_detalle_orden, delete_detalle_orden

router = APIRouter()

# rutas para la clase Orden

@router.get("/ordenes")
def read_new_ordenes(db: Session = Depends(get_db)):
    return get_ordenes(db)

@router.get("/orden/{orden_id}")
def read_new_orden(orden_id: int, db: Session = Depends(get_db)):
    return get_orden(db, orden_id)

@router.post("/orden")
def create_new_orden(orden: OrderBase, db: Session = Depends(get_db)): 
    return create_orden(db,orden)

@router.put("/orden/{orden_id}")
def update_new_orden(orden_id: int, orden: OrderBase, db: Session = Depends(get_db)):
    return update_orden(db, orden_id, orden)

@router.delete("/orden/{orden_id}")
def delete_new_orden(orden_id: int, db: Session = Depends(get_db)):
    return delete_orden(db, orden_id)

# rutas para Detalle_Orden

@router.get("/detalle_ordenes")
def read_new_detalle_ordenes(db: Session = Depends(get_db)):
    return get_detalle_ordenes(db)

@router.get("/detalle_orden/{detalle_orden_id}")
def read_new_detalle_orden(detalle_orden_id: int, db: Session = Depends(get_db)):
    return get_detalle_orden(db, detalle_orden_id)

@router.post("/detalle_orden")
def create_new_detalle_orden(detalle_orden: OrderDetailBase, db: Session = Depends(get_db)):
    return create_detalle_orden(db, detalle_orden)

@router.put("/detalle_orden/{detalle_orden_id}")
def update_new_detalle_orden(detalle_orden_id: int, detalle_orden: OrderDetailBase, db: Session = Depends(get_db)):
    return update_detalle_orden(db, detalle_orden_id, detalle_orden)

@router.delete("/detalle_orden/{detalle_orden_id}")
def delete_new_detalle_orden(detalle_orden_id: int, db: Session = Depends(get_db)):
    return delete_detalle_orden(db, detalle_orden_id)

