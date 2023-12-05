from tienda.models.models_database import Producto
from sqlalchemy.orm import Session, joinedload
from ..models.orders import Orden, Detalle_Orden, Carrito_Compra, envio
from ..schemas.orders import OrderBase, OrderDetailBase,CarritoComprarBase, envioBase
import stripe
from fastapi import FastAPI, HTTPException, Depends
from fastapi.responses import JSONResponse,RedirectResponse
from dotenv import load_dotenv
import os

load_dotenv()

def get_ordenes(db: Session):
    return db.query(Orden).all()

def get_orden(db: Session, orden_id: int):
    return db.query(Orden).filter(Orden.id_orden == orden_id).first()

def create_orden(db: Session, orden: OrderBase):
    orden_model = Orden(**orden.dict())
    db.add(orden_model)
    db.commit()
    db.refresh(orden_model)
    return orden_model

def update_orden(db: Session, orden_id: int, orden: OrderBase):
    db_orden = db.query(Orden).filter(Orden.id_orden == orden_id).first()
    if db_orden:
        for key, value in orden.dict().items():
            setattr(db_orden, key, value)
        db.commit()
    print(db_orden, type(orden))   
    orden_update = {**db_orden.__dict__, **orden.dict()} 
    return orden_update

def delete_orden(db: Session, orden_id: int):
    orden = db.query(Orden).filter(Orden.id_orden == orden_id).first()
    db.delete(orden)
    db.commit()

#controladorres detalle orden

def get_detalle_ordenes(db: Session):
    return db.query(Detalle_Orden).all()

def get_detalle_orden(db: Session, detalle_orden_id: int):
    return db.query(Detalle_Orden).filter(Detalle_Orden.id == detalle_orden_id).first()

def create_detalle_orden(db: Session, detalle_orden: OrderDetailBase):
    orden_model = Detalle_Orden(**detalle_orden.dict())
    db.add(orden_model)
    db.commit()
    db.refresh(orden_model)
    return orden_model

def update_detalle_orden(db: Session, detalle_orden_id: int, detalle_orden: Detalle_Orden):
    db_orden = db.query(Detalle_Orden).filter(Detalle_Orden.id == detalle_orden_id).first()
    if db_orden:
        for key, value in detalle_orden.dict().items():
            setattr(db_orden, key, value)
        db.commit()
    print(db_orden, type(detalle_orden))   
    orden_update = {**db_orden.__dict__, **detalle_orden.dict()} 
    return orden_update

def delete_detalle_orden(db: Session, detalle_orden_id: int):
    detalle_orden = db.query(Detalle_Orden).filter(Detalle_Orden.id == detalle_orden_id).first()
    db.delete(detalle_orden)
    db.commit()
    
#controladores envio

def crear_envio(db: Session, envio_data: envioBase):
    envio_model = envio(**envio_data.dict())
    db.add(envio_model)
    db.commit()
    db.refresh(envio_model)
    return envio_model  
    
# ***************************************** PROCESO DE PAGO USANDO STRIPE ****************************
stripe.api_key = os.environ.get("STRIPE_API_KEY")

YOUR_DOMAIN = os.environ.get("YOUR_DOMAIN")
#cambiar la llave de stripe

def crear_carrito_compra(db: Session, carrito_compra: CarritoComprarBase):
    carrito_compra_model = Carrito_Compra(**carrito_compra.dict())
    db.add(carrito_compra_model)
    db.commit()
    db.refresh(carrito_compra_model)
    return carrito_compra_model

def get_carrito_compra(db: Session, carrito_compra_id: int):
    return db.query(Carrito_Compra).filter(Carrito_Compra.id == carrito_compra_id).first()


def get_user_cart(db: Session, user_id: int):
    return db.query(Carrito_Compra).options(joinedload(Carrito_Compra.producto)).filter(Carrito_Compra.id_user == user_id).all()



def create_order_stripe(db: Session, orden: OrderBase):
    carrito = get_user_cart(db, orden.user_id)
    impuesto = orden.impuesto
    subtotal = sum(item.cantidad * item.precio_unitario for item in carrito) 
    total = subtotal
    # Crear la orden
    orden_model = Orden(total)
    db.add(orden_model)
    db.commit()
    db.refresh(orden_model)
    for item in carrito:
        detalle_orden_dict = {
        "orden_id": orden_model.id,
        "producto_id": item.producto_id,
        "cantidad": item.cantidad,
        "precio_unitario": item.precio_unitario
        }
        create_detalle_orden(db, detalle_orden_dict)
    return orden_model



def payment_intent_stripe():
    pass

# funciona
def create_checkout_session(order_id: int,db):
    try:
        query = db.query(Orden).filter(Orden.id_orden == order_id).first()
        cart = db.query(Carrito_Compra).filter(Carrito_Compra.id_user == query.id_user).all()
        print(len(cart))
        productos_para_checkout = []
        for item in cart:
            productoxcarrito = db.query(Producto).filter(Producto.id_producto == item.id_producto).all()
            for producto in productoxcarrito:
                producto_dict = {
                    'price_data': {
                        'currency': 'usd',
                        'product_data': {
                        'name': producto.nombre,
                        },
                     'unit_amount': int(producto.precio * 100),  # Convertir a centavos
                },
                     'quantity': item.cantidad
                 }
                productos_para_checkout.append(producto_dict)
                
        print("Productos")
        print(len(productos_para_checkout),productos_para_checkout)
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=productos_para_checkout,
            mode='payment',
            success_url=YOUR_DOMAIN + '/orden/success',
            cancel_url=YOUR_DOMAIN + '/cancel',
        )
        return {"url": session.url}
    
    except stripe.error.StripeError as e:
        # Maneja errores de Stripe
        raise HTTPException(status_code=400, detail=str(e))
    