from fastapi import APIRouter, Depends
from fastapi.responses import HTMLResponse

from schemas.orders import CarritoComprarBase, OrderBase, OrderDetailBase, envioBase

from sqlalchemy.orm import Session
from controllers.db import get_db
from controllers.orders import crear_carrito_compra, crear_envio, get_ordenes, get_orden, create_orden, get_user_cart, update_orden, delete_orden, get_detalle_ordenes, get_detalle_orden, create_detalle_orden, update_detalle_orden, delete_detalle_orden
from controllers.orders import create_checkout_session

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

# rutas para envio

@router.post("/envios")
def create_new_envio(envio: envioBase, db: Session = Depends(get_db)):
    return crear_envio(db, envio)

#ruta get_user_cart
@router.get("/carrito_compras/user/{id_user}")
def read_user_cart(id_user: int, db: Session = Depends(get_db)):
    return get_user_cart(db, id_user)


# ************************* RUTA PAGO STRIPE ********************** 
@router.post("/order/payment")
def create_payment():
    return "Hola mundo"


@router.post("/create-checkout-session")
async def create_checkout_session_route(order_id:int, db: Session = Depends(get_db)):
    return create_checkout_session(order_id,db)


@router.get("/success", response_class=HTMLResponse)
async def success_page():
    return """
    <html>
        <head>
            <title>Éxito</title>
        </head>
        <body>
            <h1>¡Pago exitoso!</h1>
            <p>Gracias por realizar el pago.</p>
        </body>
    </html>
    """