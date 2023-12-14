<<<<<<< HEAD
from fastapi import APIRouter, Depends, HTTPException,Request
from fastapi.responses import HTMLResponse
=======
>>>>>>> ac90fce24d4b4fa1deec0b3132e81ef662a93468

from http.client import HTTPException
from pipes import Template
#from urllib.request import Request
import os
from fastapi import APIRouter, Depends, Request, HTTPException,Request
from fastapi.responses import HTMLResponse
#from jinja2 import Template
import jinja2
#from starlette.responses import TemplateResponse
from schemas.orders import CarritoComprarBase, InventarioBasicSchema, OrderBase, OrderDetailBase, envioBase, pagoBase

from sqlalchemy.orm import Session
from controllers.db import get_db
from controllers.orders import crear_carrito_compra, crear_envio, get_inventario, get_inventory_quantity_by_store_id, get_ordenes, get_orden, create_orden, get_product_id_by_order_id, get_user_cart, update_inventory, update_orden, delete_orden, get_detalle_ordenes, get_detalle_orden, create_detalle_orden, update_detalle_orden, delete_detalle_orden
from controllers.orders import create_checkout_session,confirmed_payment,create_order_stripe
from fastapi.templating import Jinja2Templates

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


# rutas para Carrito_Compra

@router.post("/carrito_compras")
def create_new_carrito_compra(carrito_compra: CarritoComprarBase, db: Session = Depends(get_db)):
    return crear_carrito_compra(db, carrito_compra)

@router.get("/carrito_compras/carrito/{id_carrito}")
def get_carrito(id_user: int, db: Session = Depends(get_db)):
    return True#get_carrito_compra(db, id_user)

# rutas para envio

@router.post("/envios")
def create_new_envio(envio: envioBase, db: Session = Depends(get_db)):
    return crear_envio(db, envio)

#ruta get_user_cart
@router.get("/carrito_compras/user/{id_user}")
def read_user_cart(id_user: int, db: Session = Depends(get_db)):
    return get_user_cart(db, id_user)

@router.get("/inventario/{id_tienda}")
def get_cantidad( id_orden: int, id_producto: int, id_tienda: int, db: Session = Depends(get_db)):
    return get_inventory_quantity_by_store_id(db, id_orden,id_producto,id_tienda)


# ************************* RUTA PAGO STRIPE ********************** 
@router.post("/order/payment")
def create_payment():
    return "Hola mundo"


@router.post("/create-checkout-session")
async def create_checkout_session_route(order_id:int, db: Session = Depends(get_db)):
    return create_checkout_session(order_id,db)

templates = Jinja2Templates(directory="templates")

@router.get("/success", response_class=HTMLResponse)
async def success_page(request: Request,db: Session = Depends(get_db)):
    payment = confirmed_payment(request, db)
    if payment:
        return templates.TemplateResponse("success.html", {"request": request, "payment": payment})
    else:
        # Handle unsuccessful payment
        raise HTTPException(status_code=400, detail="Payment failed")

  

@router.post("/process_orden/{id_user}")
async def create_checkout_session_orden(id_user: int,db: Session = Depends(get_db)):
    return create_order_stripe(id_user, db)

@router.put("/inventory/{id_tienda}/{id_producto}")
async def update_inventorio(inventario:int, inventory: InventarioBasicSchema, db: Session = Depends(get_db)):
    db_inventory = update_inventory(db, inventario,inventory)
    if db_inventory is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_inventory

@router.get("/producto/{id_orden}")
def get_cantidad( id_orden: int,  db: Session = Depends(get_db)):
    return get_product_id_by_order_id(db, id_orden)

@router.get("/inventory/{id_producto}")
def get_inve( id_producto: int,  db: Session = Depends(get_db)):
    return get_inventario(db, id_producto)  