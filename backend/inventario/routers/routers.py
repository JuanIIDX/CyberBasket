from fastapi import APIRouter, Depends
from schemas.product_schema import *
from database.db import get_db
from sqlalchemy.orm import Session
from controllers.inventario_controller import *
from models.database_models import *

"""Organizar mejor los imports"""

router = APIRouter()

@router.get("/producto", response_model=list[Product_Schema])
def get_all_productos(db: Session = Depends(get_db)):
    """
    Get all products.

    Parameters:
    - db: Database session dependency.

    Returns:
    - List of products.
    """
    return all_productos(db)


"""
★★Datos para consular productos en el Home
"""
@router.get("/consulta", response_model=datos_producto_home)
async def get_consulta(pagina: int = 0, elementos: int = 24, db: Session = Depends(get_db)):
    """
    Get product data for home page.

    Parameters:
    - pagina: Page number (default: 0).
    - elementos: Number of elements per page (default: 24).
    - db: Database session dependency.

    Returns:
    - Product data for home page.
    """
    try:
        # Realiza la consulta de cuantos productos existen
        numero_datos = db.query(Producto).count()

        # Realiza la consulta para saber en que pagina debe estar
        numero_paginas = (numero_datos - 1) // elementos + 1
        offset = pagina * elementos
        limite = offset + elementos

        # Realizar la consulta
        result = (
            db.query(Producto.id_producto, Producto.nombre, Marca.nombre, Producto.precio)
            .join(ProductoXMarca, Producto.id_producto == ProductoXMarca.id_producto)
            .join(Marca, ProductoXMarca.id_marca == Marca.id_marca)
            .order_by(Producto.fecha_creacion)
            .offset(offset)
            .limit(limite)
            .all()
        )

        lista_productos = []
        for id_producto, nombre_producto, nombre_marca, precio in result:
            lista_productos.append(
                productos_home(
                    id_producto=id_producto,
                    nombre_producto=nombre_producto,
                    nombre_marca=nombre_marca,
                    precio_producto=precio,
                )
            )

        return datos_producto_home(
            num_productos=numero_datos,
            num_paginas=numero_paginas,
            pagina_actual=pagina,
            offset=offset,
            limite=limite,
            productos=lista_productos,
        )

    except Exception as e:
        print("Esta incorrecto")
    finally:
        db.close()


"""
★★Funcion para agregar un producto a la base de datos
"""

@router.post("/prueba_para_insertar")
async def insert_prueba(info: insercion_producto_schema, db: Session = Depends(get_db)):
    try:
        """Inserta el producto en la tabla de productos"""
        producto_insercion = producto_schema(
            nombre=info.nombre_producto, 
            descripcion=info.descripcion_producto,
            precio=info.precio_producto,
            fecha_creacion=datetime.now(), 
            fecha_actualizacion=datetime.now(),
            lista_imagenes=info.lista_imagenes
        )
        producto_model = Producto(**producto_insercion.dict())
        db.add(producto_model)
        db.commit()

        ##Se obtiene el ID de insercion para el producto
        db.refresh(producto_model)
        id_insercion=producto_model.id_producto

        """Inserta la tabla en inventario"""
        inventario_insercion = inventario_schema(
            id_tienda=info.tienda_id, 
            id_producto=id_insercion,
            cantidad=info.stock
        )
        inventario_model = Inventario(**inventario_insercion.dict())
        db.add(inventario_model)
        db.commit()

        """Inserta la tabla en productoXcategoria"""
        prod_cate_insercion = productoXcategoria_schema(
            id_producto=id_insercion, 
            id_categoria=1
        )
        
        prod_cate_model = ProductoXcategoria(**prod_cate_insercion.dict())
        db.add(prod_cate_model)
        db.commit()

        """EN SERIO OPTIMIZAR LUEGO ESTE CODIGO--------------------------"""
        """Inserta las imagenes que tiene, optimizar luego"""
        if(info.lista_imagenes[0]!=""):
            print("--0--")
            print(info.lista_imagenes[0])

            imagen_insercion = imagen_prod_schema(
                id_producto=id_insercion,
                tipo="principal",
                base64content=info.lista_imagenes[0],
                nombre="1",
                fecha_creacion=datetime.now(),
                fecha_modificacion=datetime.now()
            )
        
            imagen_model = Imagenes_Producto(**imagen_insercion.dict())
            db.add(imagen_model)
            db.commit()

        if(info.lista_imagenes[1]!=""):
            print("--1--")
            print(info.lista_imagenes[1])

            imagen_insercion = imagen_prod_schema(
                id_producto=id_insercion,
                tipo="decorativa",
                base64content=info.lista_imagenes[1],
                nombre="2",
                fecha_creacion=datetime.now(),
                fecha_modificacion=datetime.now()
            )
        
            imagen_model = Imagenes_Producto(**imagen_insercion.dict())
            db.add(imagen_model)
            db.commit()

        if(info.lista_imagenes[2]!=""):
            print("--2--")
            print(info.lista_imagenes[2])

            imagen_insercion = imagen_prod_schema(
                id_producto=id_insercion,
                tipo="decorativa",
                base64content=info.lista_imagenes[2],
                nombre="3",
                fecha_creacion=datetime.now(),
                fecha_modificacion=datetime.now()
            )
        
            imagen_model = Imagenes_Producto(**imagen_insercion.dict())
            db.add(imagen_model)
            db.commit()
        
        if(info.lista_imagenes[3]!=""):
            print("--3--")
            print(info.lista_imagenes[3])

            imagen_insercion = imagen_prod_schema(
                id_producto=id_insercion,
                tipo="decorativa",
                base64content=info.lista_imagenes[3],
                nombre="4",
                fecha_creacion=datetime.now(),
                fecha_modificacion=datetime.now()
            )
        
            imagen_model = Imagenes_Producto(**imagen_insercion.dict())
            db.add(imagen_model)
            db.commit()
        
        """sI LLEGASTE HASTA AQUI RECUERDA OPTIMIZAR LUEGO ESTE CODIGO AAAAAAAAAAAAAAAAAAAA--------------------------"""
        
        if(info.lista_imagenes[4]!=""):
            print("--4--")
            print(info.lista_imagenes[4])

            imagen_insercion = imagen_prod_schema(
                id_producto=id_insercion,
                tipo="decorativa",
                base64content=info.lista_imagenes[4],
                nombre="5",
                fecha_creacion=datetime.now(),
                fecha_modificacion=datetime.now()
            )
        
            imagen_model = Imagenes_Producto(**imagen_insercion.dict())
            db.add(imagen_model)
            db.commit()
            

        """CAMBIAR TODO ESTO LUEGOOOOOOOOOOOO"""


        return {"id": producto_model.id_producto}
    except Exception as e:
        db.rollback()
        print(e)
        return {"error": "error de procesamiento"}
    finally:
        db.close()


"""
★★Datos que retornan la info de un producto en especifico
"""
@router.get("/producto/", response_model=product_schema_1)
async def get_consulta(producto_id: int,db: Session = Depends(get_db)):

    try:
        result = (
            db.query(Producto.id_producto, Producto.nombre,Producto.descripcion,Producto.precio,Inventario.cantidad)
            .join(Inventario, Inventario.id_producto == Producto.id_producto)
            .filter(Producto.id_producto == producto_id)
            .one()
        )

        return result
        


    except Exception as e:
        print("Esta incorrecto")
    finally:
        db.close()


"""
★★Metodo que retorna las imagenes decorativas de un producto
"""
@router.get("/imagenes_producto/decorativas", response_model=list[image_product_schema_1])
async def get_consulta(producto_id: int,db: Session = Depends(get_db)):

    try:
        result = (
            db.query(Producto.id_producto, Imagenes_Producto.nombre,Imagenes_Producto.tipo,Imagenes_Producto.base64content)
            .join(Imagenes_Producto, Imagenes_Producto.id_producto == Producto.id_producto)
            .filter(Producto.id_producto == producto_id).filter(Imagenes_Producto.tipo == "decorativa")
            .all()
        )

        return result

    except Exception as e:
        print("Esta incorrecto")
    finally:
        db.close()

"""
★★Metodo que retorna la imagen principal de un producto
"""
@router.get("/imagenes_producto/principal", response_model=image_product_schema_1)
async def get_consulta(producto_id: int,db: Session = Depends(get_db)):

    try:
        result = (
            db.query(Producto.id_producto, Imagenes_Producto.nombre,Imagenes_Producto.tipo,Imagenes_Producto.base64content)
            .join(Imagenes_Producto, Imagenes_Producto.id_producto == Producto.id_producto)
            .filter(Producto.id_producto == producto_id).filter(Imagenes_Producto.tipo == "principal")
            .one()
        )

        return result
        


    except Exception as e:
        print("Esta incorrecto")
    finally:
        db.close()


