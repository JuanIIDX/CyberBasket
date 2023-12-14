from fastapi import APIRouter, Depends
from schemas.order_schema import *
from database.db import get_db
from sqlalchemy.orm import Session
from controllers.order_controller import *
from models.database_models import *

#Imports html
from http.client import HTTPException
from fastapi import APIRouter, Depends, Request, HTTPException,Request
from fastapi.responses import HTMLResponse


#otros imports
import jinja2
from fastapi.templating import Jinja2Templates



router = APIRouter()



"""
-----------
Routers para ordenes
----------
"""
@router.get("/ordenes",tags=["Orden"])
def read_new_ordenes(db: Session = Depends(get_db)):
    return get_ordenes(db)

@router.get("/orden/{orden_id}",tags=["Orden"])
def read_new_orden(orden_id: int, db: Session = Depends(get_db)):
    return get_orden(db, orden_id)

@router.post("/orden",tags=["Orden"])
def create_new_orden(orden: OrderBase, db: Session = Depends(get_db)): 
    return create_orden(db,orden)

@router.put("/orden/{orden_id}",tags=["Orden"])
def update_new_orden(orden_id: int, orden: OrderBase, db: Session = Depends(get_db)):
    return update_orden(db, orden_id, orden)

@router.delete("/orden/{orden_id}",tags=["Orden"])
def delete_new_orden(orden_id: int, db: Session = Depends(get_db)):
    return delete_orden(db, orden_id)


"""
-----------
Routers para Detalles_orden
----------
"""

@router.get("/detalle_ordenes",tags=["Detalle Orden"])
def read_new_detalle_ordenes(db: Session = Depends(get_db)):
    return get_detalle_ordenes(db)

@router.get("/detalle_orden/{detalle_orden_id}",tags=["Detalle Orden"])
def read_new_detalle_orden(detalle_orden_id: int, db: Session = Depends(get_db)):
    return get_detalle_orden(db, detalle_orden_id)

@router.post("/detalle_orden",tags=["Detalle Orden"])
def create_new_detalle_orden(detalle_orden: OrderDetailBase, db: Session = Depends(get_db)):
    return create_detalle_orden(db, detalle_orden)

@router.put("/detalle_orden/{detalle_orden_id}",tags=["Detalle Orden"])
def update_new_detalle_orden(detalle_orden_id: int, detalle_orden: OrderDetailBase, db: Session = Depends(get_db)):
    return update_detalle_orden(db, detalle_orden_id, detalle_orden)

@router.delete("/detalle_orden/{detalle_orden_id}",tags=["Detalle Orden"])
def delete_new_detalle_orden(detalle_orden_id: int, db: Session = Depends(get_db)):
    return delete_detalle_orden(db, detalle_orden_id)


"""
----
Routers para carrito de compras
---
"""

@router.post("/carrito_compras",tags=["Carrito Compra"])
def create_new_carrito_compra(carrito_compra: CarritoComprarBase, db: Session = Depends(get_db),tags=["Carrito Compra"]):
    return crear_carrito_compra(db, carrito_compra)

@router.get("/carrito_compras/carrito/{id_carrito}",tags=["Carrito Compra"])
def get_carrito(id_user: int, db: Session = Depends(get_db)):
    return True#get_carrito_compra(db, id_user) """


"""
----
Routers para envio
---
"""
@router.post("/envios",tags=["Envio"])
def create_new_envio(envio: envioBase, db: Session = Depends(get_db)):
    return crear_envio(db, envio)

"""
----
Routers PARA PROCESOS DE STRIPE
---
"""
@router.post("/order/payment",tags=["Stripe"])
def create_payment():
    return "Hola mundo"


@router.post("/create-checkout-session",tags=["Stripe"])
async def create_checkout_session_route(order_id:int, db: Session = Depends(get_db)):
    return create_checkout_session(order_id,db)

templates = Jinja2Templates(directory="templates")

@router.get("/success",response_class=HTMLResponse, tags=["Stripe"])
async def success_page(request: Request,db: Session = Depends(get_db)):
    payment = confirmed_payment(request, db)
    if payment:
        return templates.TemplateResponse("success.html", {"request": request, "payment": payment})
    else:
        # Handle unsuccessful payment
        raise HTTPException(status_code=400, detail="Payment failed")

  

@router.post("/process_orden/{id_user}")
async def create_checkout_session_orden(id_user: int,db: Session = Depends(get_db),tags=["Stripe"]):
    return create_order_stripe(id_user, db)

@router.put("/inventory/{id_tienda}/{id_producto}")
async def update_inventorio(inventario:int, inventory: InventarioBasicSchema, db: Session = Depends(get_db),tags=["Stripe"]):
    db_inventory = update_inventory(db, inventario,inventory)
    if db_inventory is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_inventory

@router.get("/producto/{id_orden}")
def get_cantidad( id_orden: int,  db: Session = Depends(get_db),tags=["Stripe"]):
    return get_product_id_by_order_id(db, id_orden)

@router.get("/inventory/{id_producto}")
def get_inve( id_producto: int,  db: Session = Depends(get_db),tags=["Stripe"]):
    return get_inventario(db, id_producto)  

