from fastapi import APIRouter, Depends
from schemas.product_schema import *
from database.db import get_db
from sqlalchemy.orm import Session
from controllers.inventario_controller import *
from models.database_models import *

"""Organizar mejor los imports"""

router = APIRouter()

@router.get("/productos", response_model=list[Product_Schema],tags=["Productos"])
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
@router.get("/productos/home", response_model=datos_producto_home,tags=["Productos"])
async def get_consulta(pagina: int = 0, elementos: int = 24, db: Session = Depends(get_db)):
    """
    Consigue los productos para el home

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

        result=pagina_producto_home(pagina,elementos,numero_datos,numero_paginas,offset,limite,db)

        return result

    except Exception as e:
        print("Esta incorrecto "+str(e))
    finally:
        db.close()



@router.post("/producto",tags=["Producto"])
async def insert_prueba(info: insercion_producto_front_schema, db: Session = Depends(get_db)):
    """
    Agrega un producto a la base de datos

    Parameters:
    - info: Informacion del producto a agregar

    Returns:
    - id: id del producto agregado

    Excepcion:
    - error: error de procesamiento
    """
    try:
        #Se agrega los datos a la tabla productos
        id_producto_nuevo=insercion_tabla_producto(info, db)
        #Se agrega los datos a la tabla categorias
        insercion_tabla_inventario(id_producto_nuevo,info, db)
        #Se inserta en la tabla categoria
        insercion_tabla_categoria(id_producto_nuevo,info, db)
        #Se inserta la imagen principal
        insercion_imagen_principal(id_producto_nuevo,info, db)
        #Se insertan las imagenes decorativas
        insercion_imagenes_decorativas(id_producto_nuevo,info,db)
        return {"id": id_producto_nuevo}
    except Exception as e:
        #Si hay un error se hace rollback
        db.rollback()
        print(e)
        return {"error": "error de procesamiento"+str(e)}
    finally:
        db.close()



@router.get("/producto",tags=["Producto"],response_model=producto_info_schema)
async def get_producto( id_producto:int ,db: Session = Depends(get_db)):
    """
    Retorna la info de un producto

    Parameters:
    - id_producto: id del producto a consultar
    - db: Database session dependency.

    Returns:
    - info: Informacion del producto
    """
    try:
        # Realiza la consulta de cuantos productos existen
        test = (
            db.query(Producto.id_producto,Tienda.id_tienda,Producto.nombre,Tienda.nombre,Producto.descripcion, Producto.precio, Inventario.cantidad)
            .join(Inventario, Inventario.id_producto == Producto.id_producto)
            .join(Tienda,Tienda.id_tienda == Inventario.id_tienda)
            .filter(Producto.id_producto == id_producto)
            .one()
        )


        result= producto_info_schema(
                id_producto=test[0],
                id_tienda=test[1],
                nombre_producto=test[2],
                nombre_tienda=test[3],
                descripcion=test[4],
                precio=test[5],
                cantidad=test[6]
        )

        return result

        
        

    except Exception as e:
        print("Esta incorrecto"+str(e))
    finally:
        db.close()


"""
★★Metodo que retorna las imagenes decorativas de un producto
"""
@router.get("/imagenes_producto/decorativas", response_model=list[image_product_schema_1],tags=["Imagenes"]) 
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
@router.get("/imagenes_producto/principal", response_model=image_product_schema_1,tags=["Imagenes"])
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



"""
★★Datos para buscar un dato en los productos
"""
@router.get("/productos/seach", response_model=datos_producto_home,tags=["Productos"])
async def get_consulta(pagina: int = 0, elementos: int = 24,busqueda:str="", db: Session = Depends(get_db)):
    """
    Consigue los productos para la busqueda

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

        result=pagina_producto_search(pagina,elementos,numero_datos,numero_paginas,offset,limite,busqueda,db)

        return result

    except Exception as e:
        print("Esta incorrecto "+str(e))
    finally:
        db.close()


"""
★★Datos para buscar un dato en los productos con categoria
"""
@router.get("/productos/seach/category", response_model=datos_producto_home,tags=["Productos"])
async def get_consulta_categoria(pagina: int = 0, elementos: int = 24,id_categoria:int=0,busqueda:str="",  db: Session = Depends(get_db)):
    """
    Consigue los productos para la busqueda

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

        result=pagina_producto_search_categoria(pagina,elementos,numero_datos,numero_paginas,offset,limite,busqueda,id_categoria,db)

        return result

    except Exception as e:
        print("Esta incorrecto "+str(e))
    finally:
        db.close()





