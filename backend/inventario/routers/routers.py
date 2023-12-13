from fastapi import APIRouter, Depends
from schemas.product_schema import *
from database.db import get_db
from sqlalchemy.orm import Session
from controllers.inventario_controller import *
from models.database_models import *

"""Organizar mejor los imports"""


router = APIRouter()


#Consigue todos los productos
@router.get("/producto",response_model=list[Product_Schema])
def get_all_productos(db: Session = Depends(get_db)):
    return all_productos(db)


# Ruta de ejemplo en FastAPI
@router.get("/consulta",response_model=datos_producto_home)
async def get_consulta(pagina:int=0, elementos:int=24, db: Session = Depends(get_db)):
    try:

        ##Realiza la consulta de cuantos productos existen 
        numero_datos = db.query(Producto).count() 


        ##Realiza la consulta para saber en que pagina debe estar
        numero_paginas = (numero_datos-1)//elementos+1
        offset = pagina*elementos
        limite = offset+elementos

        # Realizar la consulta
        result = (
        db.query(Producto.nombre, Producto.descripcion).order_by(Producto.fecha_creacion).offset(offset).limit(limite)
        .all()
        )
        



        lista_productos = []
        for nombre, descripcion in result:
            lista_productos.append(test(nombre=nombre, descripcion=descripcion))




        return datos_producto_home(
            num_productos=numero_datos,
            num_paginas=numero_paginas,
            pagina_actual=pagina,
            offset=offset,
            limite=limite,
            productos=lista_productos,
         )



        # Convertir el resultado a JSON


        return result
    except Exception as e:
        print("Esta incorrecto")
    finally:
        db.close()
