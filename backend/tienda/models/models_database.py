from sqlalchemy import Column, Integer, String, ForeignKey, Double, Boolean
from sqlalchemy.orm import relationship
from database.db import Base

##Se crea la tabla de productos
class Producto(Base):
    __tablename__="productos"
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(100))
    descripcion = Column(String(100))
    precio = Column(Double)

class Tienda(Base):
    __tablename__='tienda'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    """ id_direccion=Column(Integer, ForeignKey("productos.id")) """
    id_direccion=Column(Integer)
    nombre=Column(String(100))
    estado = Column(String(100))

class Inventario(Base):
    __tablename__='inventario'
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_producto=Column(Integer, ForeignKey("productos.id"))
    id_tienda = Column(Integer, ForeignKey("tienda.id"))
    stock = Column(Integer)





