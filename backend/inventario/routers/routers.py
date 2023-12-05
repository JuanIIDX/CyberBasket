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


