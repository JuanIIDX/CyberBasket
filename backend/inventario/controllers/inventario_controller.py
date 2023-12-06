from schemas.product_schema import *
from models.database_models import *


def exist_producto(producto_name: str, db):
    producto = db.query(Producto).filter(Producto.nombre == producto_name).first()
    return producto

def all_productos(db):
    return db.query(Producto).all()

def create_producto(new_producto: Crea_producto, db):

    producto = Producto(**new_producto.dict())
    db.add(producto)
    db.commit()
    db.refresh(producto)
    return producto

def get_productos_por_tienda(tienda_id: int,db):
    result = (
        db.query(Producto.nombre, Producto.descripcion, Inventario.cantidad)
        .join(Inventario, Inventario.id_producto == Producto.id_producto)
        .join(Tienda, Inventario.id_tienda == Tienda.id_tienda)
        .filter(Tienda.id_tienda == tienda_id)
        .all()
    )
    print(result)
    return result
