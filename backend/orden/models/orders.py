from sqlalchemy import Column, Integer, String, ForeignKey, Date, Float
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
    
#DESCOMENTAR CUANDO SE CREE LA TABLA PAGO, ENVIO Y PRODUCTO
class Orden(Base):
    __tablename__ = "ordenes"
    id_orden = Column(Integer, primary_key=True)
    cliente_info = Column(String(200), nullable=False)
    numero_envio = Column(String(200), nullable=False)
    total_orden = Column(Float, nullable=False)
    id_tienda = Column(Integer,ForeignKey('tienda.id_tienda'), nullable=True)
    id_user = Column( Integer,ForeignKey('users.id'), nullable=True)   
    impuesto = Column(Float, nullable=False)
    estado = Column('estado', String(10), nullable=True,default='pendiente')
    fecha_creacion = Column('fecha_creacion', Date, nullable=False)
    fecha_actualizacion = Column('fecha_actualizacion', Date, nullable=False)
    Detalle_Ordenes = relationship('Detalle_Orden', back_populates='orden')


class Detalle_Orden(Base):
    __tablename__ = "Detalle_Ordenes"
    id_detalle_orden = Column('id', Integer, primary_key=True,autoincrement=True)
    orden_id = Column(Integer, ForeignKey('ordenes.id'))
    producto_id = Column(Integer,ForeignKey('productos.id_producto'))
    cantidad = Column(Integer)
    precio_unitario = Column(Float)
    orden = relationship('Orden',back_populates='Detalle_Ordenes') 
    producto = relationship('Producto')


class Carrito_Compra(Base):
    __tablename__ = "Carrito_Compras"
    id_carrito = Column(Integer, primary_key=True,autoincrement=True)
    producto_id = Column(Integer, ForeignKey('productos.id'))
    user_id = Column(Integer, ForeignKey('users.id'))
    cantidad = Column(Integer)
    precio_unitario = Column(Float)
    estado = Column('estado', String(10), nullable=False,default='pendiente')
    producto = relationship('Producto')
    user = relationship('User')