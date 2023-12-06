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
@router.get("/consulta/{tienda_id}",response_model=list[consulta_productos_por_tienda])
async def get_consulta(tienda_id: int, db: Session = Depends(get_db)):
    try:
        # Realizar la consulta
        result = get_productos_por_tienda(tienda_id,db)
        # Convertir el resultado a JSON
        """ data = [{"nombre": nombre, "descripcion": descripcion, "stock": stock} for nombre, descripcion, stock in result]
        return {"data": data} """
        return result
    except Exception as e:
        print("Esta incorrecto")
    finally:
        db.close()

#Agrega producto
@router.post("/producto")
def create_new_producto(new_producto: Crea_producto, db: Session = Depends(get_db)):
    exist = exist_producto(new_producto.nombre, db)
    if exist:
        return {"message": "Producto already exist"}

    rol = create_producto(new_producto, db)
    return rol



