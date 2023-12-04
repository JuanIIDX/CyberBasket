from sqlalchemy import Column, Integer, String, ForeignKey, Date, Float
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
    
#DESCOMENTAR CUANDO SE CREE LA TABLA PAGO, ENVIO Y PRODUCTO
class Orden(Base):
    __tablename__ = "Orden"
    id_orden = Column(Integer, primary_key=True,autoincrement=True)
    cliente_info = Column(String(200), nullable=False)
    numero_envio = Column(String(200), nullable=False)
    total_orden = Column(Float, nullable=False)
    id_tienda = Column(Integer,ForeignKey('tienda.id_tienda'), nullable=True)
    id_user = Column( Integer,ForeignKey('users.id'), nullable=True)   
    impuesto = Column(Float, nullable=False)
    estado = Column('estado', String(10), nullable=True,default='pendiente')
    fecha_creacion = Column('fecha_creacion', Date, nullable=False)
    fecha_actualizacion = Column('fecha_actualizacion', Date, nullable=False)
    id_envio = Column(Integer, ForeignKey('envio.id_envio'))
    id_pago = Column(Integer, ForeignKey('pago.id_pago'))
    Detalle_Ordenes = relationship('Detalle_Orden', back_populates='orden')



class Detalle_Orden(Base):
    __tablename__ = "Detalle_Orden"
    id = Column(Integer, primary_key=True,autoincrement=True)
    id_orden = Column(Integer, ForeignKey('Orden.id_orden'))
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
    
class envio(Base):
    __tablename__ = "envio"
    id_envio = Column(Integer, primary_key=True,autoincrement=True)
    costo = Column(Float)
    descripcion = Column(String(200))
    estado = Column('estado', String(10), nullable=False,default='pendiente')
    numero_envio = Column(String(200))
    orden = relationship('Orden')
    
class pago(Base):
    __tablename__ = "Pagos"
    id_pago = Column(Integer, primary_key=True,autoincrement=True)
    tipo_pago = Column(String(200))
    monto = Column(Float)
    estado = Column('estado', String(100), nullable=False,default='pendiente')
    fecha_creacion = Column('fecha_creacion', Date, nullable=False)
    orden = relationship('Orden')
