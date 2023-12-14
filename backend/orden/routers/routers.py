from fastapi import APIRouter, Depends
from schemas.order_schema import *
from database.db import get_db
from sqlalchemy.orm import Session
from controllers.order_controller import *
from models.database_models import *



router = APIRouter()

"""
-----------
Routers para ordenes
----------
"""
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


"""
-----------
Routers para Detalles_orden
----------
"""

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


"""
----
Controlador para carrito de compras
---
"""

@router.post("/carrito_compras")
def create_new_carrito_compra(carrito_compra: CarritoComprarBase, db: Session = Depends(get_db)):
    return crear_carrito_compra(db, carrito_compra)

""" @router.get("/carrito_compras/carrito/{id_carrito}")
def get_carrito(id_user: int, db: Session = Depends(get_db)):
    return True#get_carrito_compra(db, id_user) """


"""
----
Controlador para envio
---
"""
@router.post("/envios")
def create_new_envio(envio: envioBase, db: Session = Depends(get_db)):
    return crear_envio(db, envio)

""" #ruta get_user_cart
@router.get("/carrito_compras/user/{id_user}")
def read_user_cart(id_user: int, db: Session = Depends(get_db)):
    return get_user_cart(db, id_user) """

""" @router.get("/inventario/{id_tienda}")
def get_cantidad( id_orden: int, id_producto: int, id_tienda: int, db: Session = Depends(get_db)):
    return get_inventory_quantity_by_store_id(db, id_orden,id_producto,id_tienda)
 """