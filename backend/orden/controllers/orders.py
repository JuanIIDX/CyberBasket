from sqlalchemy.orm import Session
from ..models.orders import Orden, Detalle_Orden
from ..schemas.orders import OrderBase, OrderDetailBase

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

def create_detalle_orden(db: Session, detalle_orden: Detalle_Orden):
    db.add(detalle_orden)
    db.commit()
    db.refresh(detalle_orden)
    return detalle_orden

def update_detalle_orden(db: Session, detalle_orden: Detalle_Orden):
    db.merge(detalle_orden)
    db.commit()
    return detalle_orden

def delete_detalle_orden(db: Session, detalle_orden_id: int):
    detalle_orden = db.query(Detalle_Orden).filter(Detalle_Orden.id == detalle_orden_id).first()
    db.delete(detalle_orden)
    db.commit()