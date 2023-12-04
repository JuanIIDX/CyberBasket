from sqlalchemy import Column, Integer, String, ForeignKey, Double, Boolean,DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Direccion(Base):
    __tablename__='direccion'
    id_direccion=Column(Integer, primary_key=True, index=True)
    nombre=Column(String(50))
    apellido=Column(String(50))
    email=Column(String(50))
    telefono1=Column(String(50))
    telefono2=Column(String(50))
    direccion=Column(String(50))
    codigo_postal=Column(String(50))
    ciudad=Column(String(50))
    estado=Column(String(50))

##Se crea la tabla de productos
class Producto(Base ):
    __tablename__='producto'
    id_producto=Column(Integer, primary_key=True,autoincrement=True)
    nombre=Column(String(100))
    descripcion=Column(String(100))
    url_imagen=Column(String(100))
    precio=Column(Double)
    fecha_creacion=Column(DateTime)
    fecha_actualizacion=Column(DateTime)

class Tienda(Base):
    __tablename__='tienda'
    id_tienda = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_direccion=Column(Integer, ForeignKey("direccion.id_direccion"))
    nombre=Column(String(100))
    estado = Column(Boolean)

class Inventario(Base):
    __tablename__ = "inventario"
    id_inventario=Column(Integer, primary_key=True,autoincrement=True)
    id_tienda=Column(Integer, ForeignKey("tienda.id_tienda"))
    id_producto=Column(Integer, ForeignKey("producto.id_producto"))
    cantidad=Column(Integer)
    #role = relationship("Role", back_populates="users")


class Categoria_tienda(Base):
    __tablename__='categoria_tienda'
    id_categoria_tienda = Column(Integer, primary_key=True, index=True, autoincrement=True)
    nombre = Column(String(100))

class Categoria_tiendaXtienda(Base):
    __tablename__='categoria_tiendaXtienda'
    id_CTxT = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_categoria_tienda=Column(Integer, ForeignKey("categoria_tienda.id_categoria_tienda"))
    id_tienda = Column(Integer, ForeignKey("tienda.id_tienda"))



