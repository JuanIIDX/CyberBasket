from sqlalchemy.orm import Session, joinedload
from ..models.orders import Orden, Detalle_Orden, Carrito_Compra, envio
from ..schemas.orders import OrderBase, OrderDetailBase,CarritoComprarBase, envioBase
import stripe

def get_ordenes(db: Session):
    return db.query(Orden).all()

def get_orden(db: Session, orden_id: int):
    return db.query(Orden).filter(Orden.id == orden_id).first()

def create_orden(db: Session, orden: OrderBase):
    orden_model = Orden(**orden.dict())
    db.add(orden_model)
    db.commit()
    db.refresh(orden_model)
    return orden_model

def update_orden(db: Session, orden_id: int, orden: OrderBase):
    db_orden = db.query(Orden).filter(Orden.id == orden_id).first()
    if db_orden:
        for key, value in orden.dict().items():
            setattr(db_orden, key, value)
        db.commit()
    print(db_orden, type(orden))   
    orden_update = {**db_orden.__dict__, **orden.dict()} 
    return orden_update

def delete_orden(db: Session, orden_id: int):
    orden = db.query(Orden).filter(Orden.id == orden_id).first()
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

def crear_carrito_compra(db: Session, carrito_compra: CarritoComprarBase):
    carrito_compra_model = Carrito_Compra(**carrito_compra.dict())
    db.add(carrito_compra_model)
    db.commit()
    db.refresh(carrito_compra_model)
    return carrito_compra_model

def get_carrito_compra(db: Session, carrito_compra_id: int):
    return db.query(Carrito_Compra).filter(Carrito_Compra.id == carrito_compra_id).first()


def get_user_cart(db: Session, user_id: int):
     return db.query().options(joinedload(Carrito_Compra.user), joinedload(Carrito_Compra.producto)).filter(Carrito_Compra.user_id == user_id).all()

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