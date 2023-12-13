from datetime import datetime
#from urllib.request import Request
from tienda.models.models_database import Producto
from sqlalchemy.orm import Session, joinedload
from ..models.orders import Orden, Detalle_Orden, Carrito_Compra, envio,Producto, pago
from ..schemas.orders import OrderBase, OrderDetailBase,CarritoComprarBase, envioBase, pagoBase
import stripe
from fastapi import FastAPI, HTTPException, Depends, Request
from fastapi.responses import JSONResponse,RedirectResponse
#from tienda.models.models_database import Producto
from dotenv import load_dotenv
import os
#from http.client import HTTPException
from pydoc import stripid
import random
import string
from sqlalchemy.orm import class_mapper

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

def crear_pago(db: Session, envio_data: pagoBase):
    envio_model = pago(**envio_data.dict())
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



def get_user_cart(db: Session, user_id: int):
   # return db.query(Carrito_Compra).options(joinedload(Carrito_Compra.producto)).filter(Carrito_Compra.id_user == user_id).all()
    return db.query(Carrito_Compra).filter(Carrito_Compra.id_user == user_id).all()

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
    
def create_order_from_cart(db: Session, user_id: int):
    try:
        # Obtener el carrito de compra del usuario
        cart = db.query(Carrito_Compra).filter(Carrito_Compra.id_user == user_id).all()

        # Crear una lista de productos para la orden
        productos_para_orden = []
        for item in cart:
            productoxcarrito = db.query(Producto).filter(Producto.id_producto == item.id_producto).all()
            for producto in productoxcarrito:
                producto_dict = {
                    'nombre': producto.nombre,
                    'precio': producto.precio,
                    'cantidad': item.cantidad
                }
                productos_para_orden.append(producto_dict)
                print(productos_para_orden)
        # Crear la orden en la base de datos
        orden = {
            "id_pago": None,
            "id_envio": None,
            "impuesto": 0,
            "estado": "pendiente",
            "fecha_creacion": datetime.now(),
            "fecha_actualizacion": datetime.now(),
            "id_tienda": None,
            "id_user": user_id
        }
        create_orden(db, orden)

        # Crear los detalles de orden en la base de datos
        for producto in productos_para_orden:
            detalle_orden = {
                "orden_id": orden.id_orden,
                "producto_id": producto.id_producto,
                "cantidad": producto.cantidad,
                "precio_unitario": producto.precio
            }
            create_detalle_orden(db, detalle_orden)

        return {"message": "Orden creada exitosamente"}

    except Exception as e:
        return {"error": str(e)}

def confirmed_payment(request: Request, db:Session):
    #session_id = request.query_params["session_id"]
    session_id = request.query_params.get("session_id")
    print("Mi session :",session_id)
    mi_datetime = datetime.now()
    mi_fecha = mi_datetime.date()

    try:
        session = stripe.checkout.Session.retrieve(session_id)
        print("Mi session STRIPE :",session)
        if session.payment_status == "paid":
            # El pago se realizó correctamente
            # Actualizar los datos de la orden
            orden_id = session.metadata.get('orden_id')
            get_orden_payment= get_orden(db, int(orden_id))
            if(get_orden_payment.id_orden == int(orden_id)):{
                print("Mi orden :",get_orden_payment.id_orden)
                
                
            }
            print("Mi orden :",get_orden_payment.id_orden)
            pago = {
                "tipo_pago": "card",
                "monto": session.amount_total,
                "estado": str(session.payment_status),
                "fecha_creacion": mi_fecha,
                
            }
            numero_envio = generate_tracking_number()
            new_envio = {
                "costo": 8000 ,
                "descripcion": "calle 1",
                "estado": "en proceso",
                "numero_envio": numero_envio
            }
            new_pago = pagoBase(**pago)
            new_envio = envioBase(**new_envio)

            new_envio_table  = crear_envio(db, new_envio)
            new_pago_table = crear_pago(db, new_pago)
            
            new_orden = OrderBase(
                id_pago=new_pago_table.id_pago,
                id_envio=new_envio_table.id_envio,
                impuesto=get_orden_payment.impuesto,
                estado="pagado",
                fecha_creacion=get_orden_payment.fecha_creacion,
                fecha_actualizacion=mi_fecha,
                id_tienda=get_orden_payment.id_tienda,
                id_user=get_orden_payment.id_user
            ) 
            update_orden(db, get_orden_payment.id_orden,new_orden)
            return True
        else:
            # El pago no se realizó correctamente
            raise HTTPException(status_code=400, detail="El pago no se realizó correctamente")
    except stripe.error.StripeError as e:
        # Maneja errores de Stripe
        raise HTTPException(status_code=400, detail=str(e))

def generate_tracking_number():
    numbers = ''.join(random.choices(string.digits, k=5))
    letters = ''.join(random.choices(string.ascii_uppercase + string.ascii_lowercase, k=2))
    return numbers + letters

def to_dict(obj):
    # Convert SQLAlchemy object to dictionary 
    columns = [c.key for c in class_mapper(obj.__class__).columns]
    return {c: getattr(obj, c) for c in columns}