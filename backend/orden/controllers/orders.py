from tienda.models.models_database import Producto
from sqlalchemy.orm import Session, joinedload
from ..models.orders import Orden, Detalle_Orden, Carrito_Compra, envio,Producto,pago,Inventario
from ..schemas.orders import OrderBase, OrderDetailBase,CarritoComprarBase, envioBase, pagoBase
import stripe
from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
#from tienda.models.models_database import Producto
from dotenv import load_dotenv
import os
from datetime import datetime
import random
import string
from sqlalchemy.orm import class_mapper



load_dotenv()

def get_ordenes(db: Session):
    return db.query(Orden).all()

def get_orden(db: Session, orden_id: int):
        return db.query(Orden).options(joinedload(Orden.Detalle_Orden)).filter(Orden.id_orden == orden_id).first()

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

def crear_pago(db: Session, data: pagoBase):
    envio_model = pago(**data.dict())
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



def create_order_stripe(id_user : int,db: Session):
    carrito = db.query(Carrito_Compra).filter(Carrito_Compra.id_user == id_user).all()
    impuesto_inicial = 0.19
    mi_datetime = datetime.now()
    mi_fecha = mi_datetime.date()
    subtotal = sum(item.cantidad * item.precio_unitario for item in carrito) 
    total = subtotal

    # Obtener los id_tienda directamente en esta función
    id_tienda_list = []
    print("CARRITO",len(carrito))
    for item in carrito:
        inventarios = db.query(Inventario.id_tienda).filter(Inventario.id_producto == item.id_producto).all()
        id_tienda_list.extend([inventario[0] for inventario in inventarios])

    ordenes = []
    print("ID TIENDA LIST",id_tienda_list)
    # Crear una orden para cada tienda
    for id_tienda in id_tienda_list:
        orden_model = OrderBase(
            impuesto=impuesto_inicial,
            estado="en proceso",
            fecha_creacion=mi_fecha,
            fecha_actualizacion=mi_fecha,
            id_user=id_user,
            id_tienda=id_tienda
        )
        ordenes.append(orden_model)
    print("ORDNE MODEL",ordenes)
    if(len(ordenes) > 0):
        for i in ordenes:
            for item in carrito:
                orden_creada = create_orden(db,i)
                detalle_orden_dict = OrderDetailBase(
                    id_orden=orden_creada.id_orden,
                    producto_id=item.id_producto,
                    cantidad=item.cantidad,
                    precio_unitario=item.precio_unitario
                )
                detalles = create_detalle_orden(db, detalle_orden_dict)
            if detalles is not None:
                return {"orden_creada": detalles.id}
            else:
                return None
# funciona
def create_checkout_session(order_id: int,db):
    try:
        query = db.query(Orden).filter(Orden.id_orden == order_id).first()
        cart = db.query(Carrito_Compra).filter(Carrito_Compra.id_user == query.id_user).all()
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
                
        session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=productos_para_checkout,
            mode='payment',
            success_url=YOUR_DOMAIN + '/orden/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url=YOUR_DOMAIN + '/cancel',
            metadata={
                'orden_id': order_id,
            }
        )
        session.success_url = session.success_url.replace('{CHECKOUT_SESSION_ID}', session.id)
        return JSONResponse(content={"session": session.url})

    
    except stripe.error.StripeError as e:
        # Maneja errores de Stripe
        raise HTTPException(status_code=400, detail=str(e))


       



def confirmed_payment(request: Request, db:Session):
    session_id = request.query_params["session_id"]
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
