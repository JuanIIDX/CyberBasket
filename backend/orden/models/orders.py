from sqlalchemy import Column, Integer, String, ForeignKey, Date, Float,Double,Boolean,DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from typing import List
from pydantic import BaseModel
#from shared.models.user import User
#from tienda.models.models_database import Producto, Tienda

Base = declarative_base()


    
#DESCOMENTAR CUANDO SE CREE LA TABLA PAGO, ENVIO Y PRODUCTO
class Producto(Base):
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
    

class User(Base):
  __tablename__ = "users"

  id = Column(Integer, primary_key=True)
  name = Column(String(100), nullable=False)
  last_name = Column(String(100), nullable=True)
  email = Column(String(100), unique=True)
  password = Column(String(100))
  creation_date = Column(DateTime(timezone=False))
  update_date = Column(DateTime(timezone=False))
  status = Column(String(20))

  role_id = Column(Integer, ForeignKey("roles.id"))

  role = relationship("Role", back_populates="users")
  directions = relationship("UserDirections", back_populates="user")


class Role(Base):
  __tablename__ = "roles"

  id = Column(Integer, primary_key=True)
  name = Column(String(100))

  users = relationship("User", back_populates="role")

class UserDirections(Base):
  __tablename__ = "user_directions"

  id = Column(Integer, primary_key=True)
  title = Column(String(100))
  phone_number = Column(String(100))
  address = Column(String(100))
  city = Column(String(100))
  state = Column(String(100))
  country = Column(String(100))

  user_id = Column(Integer, ForeignKey("users.id"))

  user = relationship("User", back_populates="directions")
class Orden(Base):
    __tablename__ = "Orden"
    id_orden = Column(Integer, primary_key=True)
    id_tienda = Column(Integer,ForeignKey('Tienda.id_tienda'), nullable=True)
    id_user = Column( Integer,ForeignKey('User.id'), nullable=True)   
    impuesto = Column(Float, nullable=False)
    estado = Column('estado', String(10), nullable=True,default='pendiente')
    fecha_creacion = Column('fecha_creacion', Date, nullable=False)
    fecha_actualizacion = Column('fecha_actualizacion', Date, nullable=False)
    id_envio = Column(Integer, ForeignKey('Envio.id_envio'))
    id_pago = Column(Integer, ForeignKey('Pagos.id_pago'))

    Detalle_Orden = relationship('Detalle_Orden', back_populates='orden')
    envio_b = relationship("envio", back_populates="orden")

class Detalle_Orden(Base):
    __tablename__ = "Detalle_orden"
    id = Column(Integer, primary_key=True,autoincrement=True)
    id_orden = Column(Integer, ForeignKey('Orden.id_orden'))
    producto_id = Column(Integer,ForeignKey('Producto.id_producto'))
    cantidad = Column(Integer)
    precio_unitario = Column(Float)
    orden = relationship('Orden',back_populates='Detalle_Orden') 
    #producto = relationship(Producto)


class Carrito_Compra(Base):
    __tablename__ = "Carrito_Compras"
    id_carrito = Column(Integer, primary_key=True,autoincrement=True)
    id_producto = Column(Integer, ForeignKey("Producto.id_producto"))
    id_user = Column(Integer, ForeignKey("User.id"))
    cantidad = Column(Integer)
    precio_unitario = Column(Float)
    estado = Column('estado', String(10), nullable=False,default='pendiente')
    #user = relationship(User)
    
class envio(Base):
    __tablename__ = "Envio"
    id_envio = Column(Integer, primary_key=True,autoincrement=True)
    costo = Column(Float)
    descripcion = Column(String(200))
    estado = Column('estado', String(10), nullable=False,default='pendiente')
    numero_envio = Column(String(200))
    orden = relationship("Orden", back_populates="envio_b")

    
class pago(Base):
    __tablename__ = "Pagos"
    id_pago = Column(Integer, primary_key=True,autoincrement=True)
    tipo_pago = Column(String(200))
    monto = Column(Float)
    estado = Column('estado', String(100), nullable=False,default='pendiente')
    fecha_creacion = Column('fecha_creacion', Date, nullable=False)
    orden = relationship('Orden')


