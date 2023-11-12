from schemas.tienda_schema import *
from models.models_database import *


def create_producto(new_producto: Crea_producto, db):

    producto = Producto(**new_producto.dict())
    db.add(producto)
    db.commit()
    db.refresh(producto)
    return producto

def exist_producto(producto_name: str, db):
    producto = db.query(Producto).filter(Producto.nombre == producto_name).first()
    return producto

def all_productos(db):
    return db.query(Producto).all()

def create_inventario(new_inventario: Crea_inventario, db):

    usr = Inventario(**new_inventario.dict())
    ## Acá va la logica de consulta en la base de datos
    db.add(usr)
    db.commit()
    db.refresh(usr)
    return usr

def exist_inventario(inventario_id: str, db):
    usr = db.query(Inventario).filter(Producto.id== inventario_id).first()
    return usr

def all_productos(db):
    return db.query(Producto).all()

def all_Inventario(db):
    return db.query(Inventario).all()



""" controladores para tienda """

def create_tiendas(new_tienda: tiendaModel, db):

    tienda = Tienda(**new_tienda.dict())
    db.add(tienda)
    db.commit()
    db.refresh(tienda)
    return tienda


def get_all_tiendas(db):
    return db.query(Tienda).all()

def exist_tienda(nombre: str, db):
    usr = db.query(Tienda).filter(Tienda.nombre== nombre).first()
    return usr


def get_productos_por_tienda(tienda_id: int,db):
    result = (
        db.query(Producto.nombre, Producto.descripcion, Inventario.stock)
        .join(Inventario, Inventario.id_producto == Producto.id)
        .join(Tienda, Inventario.id_tienda == Tienda.id)
        .filter(Tienda.id == tienda_id)
        .all()
    )
    return result
