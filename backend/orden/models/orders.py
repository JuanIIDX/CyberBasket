from sqlalchemy import Column, Integer, String, ForeignKey, Date, Float
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
    
#DESCOMENTAR CUANDO SE CREE LA TABLA PAGO, ENVIO Y PRODUCTO
class Orden(Base):
    __tablename__ = "orden"
    id = Column('id', Integer, primary_key=True)
    id_pago = Column('id_Pago', Integer,  nullable=True)
    id_envio = Column('id_Envio', Integer, nullable=True)   
    # id_pago = Column('id_Pago', Integer, ForeignKey('pago.ID_Pago'), nullable=False)
    # id_envio = Column('id_Envio', Integer, ForeignKey('envio.ID_Envio'))
    impuesto = Column('impuesto', Float, nullable=False)
    estado = Column('estado', String(10), nullable=False)
    fecha_creacion = Column('fecha_creacion', Date, nullable=False)
    fecha_actualizacion = Column('fecha_actualizacion', Date, nullable=False)
    # pago = relationship('Pago')
    # envio = relationship('Envio')
 #   detalle_ordenes = relationship('Detalle_Orden', back_populates='orden')

class Detalle_Orden(Base):
    __tablename__ = "Detalle_orden"
    id = Column('id', Integer, primary_key=True)
    orden_id = Column('orden_id', Integer, ForeignKey('orden.id'))
    producto_id = Column('producto_id', Integer)
    #producto_id = Column('producto_id', Integer, ForeignKey('producto.producto_id'))
    cantidad = Column('cantidad', Integer)
    precio_unitario = Column('precio_unitario', Float)
    #orden = relationship('Orden') 
    #producto = relationship('Producto')
    
#Orden.detalle_orden = relationship('Detalle_Orden', back_populates='orden')