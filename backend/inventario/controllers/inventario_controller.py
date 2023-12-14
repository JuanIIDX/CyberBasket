from schemas.product_schema import *
from models.database_models import *
from database.db import get_db
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from controllers.inventario_controller import *
from models.database_models import *

def exist_producto(producto_name: str, db):
    producto = db.query(Producto).filter(Producto.nombre == producto_name).first()
    return producto

def all_productos(db):
    return db.query(Producto).all()

"""
★★Controladores para busqueda en el home
"""
def pagina_producto_home(pagina:int, elementos:int, num_datos:int,num_paginas:int,offset:int, limite:int,db: Session = Depends(get_db)):
        # Realizar la consulta
        result = (
            db.query(Producto.id_producto, Producto.nombre, Tienda.nombre, Producto.precio)
            .join(  Inventario, Producto.id_producto == Inventario.id_producto)
            .join( Tienda, Inventario.id_tienda == Tienda.id_tienda)
            .order_by(Producto.fecha_creacion)
            .offset(offset)
            .limit(limite)
            .all()
        )

        lista_productos = []
        for id_producto, nombre_producto, nombre_tienda, precio in result:
            lista_productos.append(
                productos_home(
                    id_producto=id_producto,
                    nombre_producto=nombre_producto,
                    nombre_tienda=nombre_tienda,
                    precio_producto=precio,
                )
            )

        return datos_producto_home(
            num_productos=num_datos,
            num_paginas=num_paginas,
            pagina_actual=pagina,
            offset=offset,
            limite=limite,
            productos=lista_productos,
        )



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

