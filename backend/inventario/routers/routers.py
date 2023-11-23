from fastapi import APIRouter, Depends
from schemas.inventario import *
from database.db import get_db
from sqlalchemy.orm import Session
"""from controllers.inventario import *"""
from models.inventario import *
from models.tienda import *

"""Organizar mejor los imports"""


router = APIRouter()


#Consigue todos los inv
@router.get("/inventario",response_model=list[InventarioBasicSchema])
def get_all_inventario(db: Session = Depends(get_db)):
    return db.query(Inventario).all()

