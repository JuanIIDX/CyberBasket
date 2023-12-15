from datetime import datetime


from sqlalchemy.orm import Session, joinedload
from models.orders import Orden, Detalle_Orden, Carrito_Compra, envio,Producto,pago,Inventario, Producto
from schemas.orders import InventarioBasicSchema, OrderBase, OrderDetailBase,CarritoComprarBase, envioBase, pagoBase
import stripe
from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
from dotenv import load_dotenv
import os
from pydoc import stripid
import random
import string
from sqlalchemy.orm import class_mapper
from sqlalchemy import join, distinct, func, select, create_engine, text

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

def delete_carrito_compra(db: Session, user_id: int):
    carrito_compra = db.query(Carrito_Compra).filter(Carrito_Compra.id_user == user_id).all()
    if carrito_compra:
        for carrito in carrito_compra:
            db.delete(carrito)
        db.commit()
    else:
        raise ValueError("CarritoCompra with id {} not found".format(user_id))

def get_user_cart(db: Session, user_id: int):
   # return db.query(Carrito_Compra).options(joinedload(Carrito_Compra.producto)).filter(Carrito_Compra.id_user == user_id).all()
   return db.query(Carrito_Compra).filter(Carrito_Compra.id_user == user_id).all()

def get_product_id_by_order_id(db: Session, id_orden: int):
    result = (
        db.query(Detalle_Orden)
        .join(Orden, Detalle_Orden.id_orden == Orden.id_orden)
        .filter(Orden.id_orden == id_orden)
        .all()
    )
    return result

def get_inventario(db: Session, producto_id: int):
    inven =(
        db.query(Inventario)
        .filter( Inventario.id_producto == producto_id)
        .first()
    )
    return inven.id_inventario


def get_inventory_quantity_by_store_id(db: Session,id_orden: int, producto_id: int, id_tienda: int):
    
    result = (
        db.query(func.sum(Detalle_Orden.cantidad))
        .join(Orden, Detalle_Orden.id_orden == Orden.id_orden)
        .filter(Detalle_Orden.id_orden == id_orden, Detalle_Orden.producto_id == producto_id, Orden.id_tienda == id_tienda)
        .scalar()
    )
    result2 = (
        db.query(Inventario.cantidad)
        .filter(Inventario.id_tienda == id_tienda, Inventario.id_producto == producto_id)
        .scalar()
    )
 
        
    if result is None:
        result = 0
    if result2 is None:
        result2 = 0

    resultado = result2 - result
    #result = {obj.cantidad: obj.__dict__ for obj in result}
    return resultado



def create_order_stripe(id_user : int,db: Session):
    carrito = db.query(Carrito_Compra).filter(Carrito_Compra.id_user == id_user).all()
    impuesto_inicial = 0.19
    mi_datetime = datetime.now()
    mi_fecha = mi_datetime.date()
    subtotal = sum(item.cantidad * item.precio_unitario for item in carrito) 
    total = subtotal

    # Obtener los id_tienda directamente en esta función
    id_tienda_list = []
    for item in carrito:
        inventarios = db.query(Inventario.id_tienda).filter(Inventario.id_producto == item.id_producto).all()
        id_tienda_list.extend([inventario[0] for inventario in inventarios])

    ordenes = []
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




def update_inventory(db: Session, inventario:int, inventory: InventarioBasicSchema):

    db_inventory = db.query(Inventario).filter(Inventario.id_inventario == inventario).first()
    if db_inventory is None:
        return None
    for var, value in vars(inventory).items():
        if hasattr(db_inventory, var):
            setattr(db_inventory, var, value)
    db.commit()
    db.refresh(db_inventory)
    return db_inventory


def confirmed_payment(request: Request, db:Session):
    session_id = request.query_params["session_id"]
    mi_datetime = datetime.now()
    mi_fecha = mi_datetime.date()

    try:
        session = stripe.checkout.Session.retrieve(session_id)
        if session.payment_status == "paid":
            # El pago se realizó correctamente
            # Actualizar los datos de la orden
            orden_id = session.metadata.get('orden_id')
            get_orden_payment= get_orden(db, int(orden_id))
            ordenes = get_ordenes(db)
            usuario = get_orden_payment.id_user
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
            producto= get_product_id_by_order_id(db, int(orden_id))
            
            delete_carrito_compra(db, int(usuario))
            
            for orden in ordenes:
                if(orden.id_user == int(usuario) and orden.estado != "pagado"):
                    for item in producto:
                        inventario = get_inventario(db,item.producto_id)
                        new_inventario = InventarioBasicSchema(
                            id_tienda=orden.id_tienda,
                            id_producto=item.producto_id,
                            cantidad=get_inventory_quantity_by_store_id(db, orden.id_orden,item.producto_id,orden.id_tienda)
                        )
                        update_inventory(db, inventario,new_inventario)

                    new_orden = OrderBase(
                        id_pago=new_pago_table.id_pago,
                        id_envio=new_envio_table.id_envio,
                        impuesto=orden.impuesto,
                        estado="pagado",
                        fecha_creacion=orden.fecha_creacion,
                        fecha_actualizacion=mi_fecha,
                        id_tienda=orden.id_tienda,
                        id_user=orden.id_user
                    ) 
                    update_orden(db, orden.id_orden,new_orden)
            
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

def get_tienda_producto(db: Session, producto_id: int):

    result = (
        db.query(Inventario.id_tienda)
        .join(Carrito_Compra, Carrito_Compra.id_producto == Inventario.id_producto)
        .filter(Carrito_Compra.id_producto == producto_id)
    )
    #result = {obj.id_tienda: obj.__dict__ for obj in result}
    result = {obj.id_tienda: {"id_tienda": obj.id_tienda} for obj in result}
    return result



def create_order_from_cart(db: Session, user_id: int):

    tienda = get_tienda_producto(db, user_id)
    mi_datetime = datetime.now()
    mi_fecha = mi_datetime.date()
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
        # Crear la orden en la base de datos
        orden = OrderBase(
            id_pago=None,
            id_envio=None,
            impuesto=0,
            estado="proceso",
            fecha_creacion=mi_fecha,
            fecha_actualizacion=mi_fecha,
            id_tienda=tienda,
           # id_user=get_carrito_compra.id_user
        )
        create_orden(db, orden)

        # Crear los detalles de orden en la base de datos
        for producto in productos_para_orden:
            detalle_orden = OrderDetailBase(
                id_orden=orden.id_orden,
                producto_id=producto.id_producto,
                cantidad=producto.cantidad,
                precio_unitario=producto.precio
            )
            create_detalle_orden(db, detalle_orden)

        return {"message": "Orden creada exitosamente"}

    except Exception as e:
        return {"error": str(e)}
    
    
def get_orden_usuario(db: Session, user_id: int):
    return db.query(Orden).options(joinedload(Orden.Detalle_Orden)).filter(Orden.id_user == user_id).all()