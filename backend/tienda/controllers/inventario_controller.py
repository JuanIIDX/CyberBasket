from schemas.product_schema import *
from models.database_models import *
from database.db import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from controllers.inventario_controller import *
from models.database_models import *




"""
★★Controladores para insercion de productos
"""
def insercion_tabla_producto(info: insercion_producto_front_schema, db: Session = Depends(get_db)):
    producto_insercion = producto_insercion_schema(
        nombre=info.nombre_producto, 
        descripcion=info.descripcion_producto,
        precio=info.precio_producto,
        fecha_creacion=datetime.now(), 
        fecha_actualizacion=datetime.now(),
    )


    producto_model = Producto(**producto_insercion.dict())
    db.add(producto_model)
    db.commit()
    db.refresh(producto_model)
    return producto_model.id_producto

def insercion_tabla_inventario(id_producto:int,info: insercion_producto_front_schema, db: Session = Depends(get_db)):
    inventario_insercion = inventario_schema(
        id_tienda=info.tienda_id, 
        id_producto=id_producto,
        cantidad=info.stock
    )
    inventario_model = Inventario(**inventario_insercion.dict())
    db.add(inventario_model)
    db.commit()


def insercion_tabla_categoria(id_producto:int,info: insercion_producto_front_schema, db: Session = Depends(get_db)):
    prod_cate_insercion = productoXcategoria_schema(
        id_producto=id_producto, 
        id_categoria=info.id_categoria
    )
    
    prod_cate_model = ProductoXcategoria(**prod_cate_insercion.dict())
    db.add(prod_cate_model)
    db.commit()

def insercion_imagen_principal(id_producto:int,info: insercion_producto_front_schema, db: Session = Depends(get_db)):
    if(info.lista_imagenes[0]!=""):
        print("--0--")
        print(info.lista_imagenes[0])

        imagen_insercion = imagen_prod_schema(
            id_producto=id_producto,
            tipo="principal",
            base64content=info.lista_imagenes[0],
            nombre="imagen_"+str(id_producto)+"_principal",
            fecha_creacion=datetime.now(),
            fecha_modificacion=datetime.now()
        )

        imagen_model = Imagenes_Producto(**imagen_insercion.dict())
        db.add(imagen_model)
        db.commit()

def insercion_imagenes_decorativas(id_producto:int,info: insercion_producto_front_schema, db: Session = Depends(get_db)):
    for i in range(1,len(info.lista_imagenes)):
        if(info.lista_imagenes[i]!=""):
            imagen_insercion = imagen_prod_schema(
                id_producto=id_producto,
                tipo="decorativa",
                base64content=info.lista_imagenes[i],
                nombre="imagen_"+str(id_producto)+"_secundaria_"+str(i+1),
                fecha_creacion=datetime.now(),
                fecha_modificacion=datetime.now()
            )

            imagen_model = Imagenes_Producto(**imagen_insercion.dict())
            db.add(imagen_model)
            db.commit()


    """
    ---controladores de tienda 
    """

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
        db.query(Producto.nombre, Producto.descripcion, Inventario.cantidad)
        .join(Inventario, Inventario.id_producto == Producto.id_producto)
        .join(Tienda, Inventario.id_tienda == Tienda.id_tienda)
        .filter(Tienda.id_tienda == tienda_id)
        .all()
    )
    print(result)
    return result

""" controladores para catogorias x tienda """

