from sqlalchemy import Column, Integer, String, ForeignKey, Date, Float
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Orden(Base):
    __tablename__ = "orden"
    id = Column('ID_OrdenPro', Integer, primary_key=True)
    
    
class Orden(Base):
    __tablename__ = "orden"
    id = Column('ID_OrdenPro', Integer, primary_key=True)
    id_pago = Column('ID_Pago', Integer, ForeignKey('pago.ID_Pago'), nullable=False)
    id_envio = Column('ID_Envio', Integer, ForeignKey('envio.ID_Envio'))
    impuesto = Column('Impuesto', Float, nullable=False)
    estado = Column('Estado', String(10), nullable=False)
    fecha_creacion = Column('Fecha_Creacion', Date, nullable=False)
    fecha_actualizacion = Column('Fecha_Actualizacion', Date, nullable=False)
    pago = relationship('Pago')
    envio = relationship('Envio')


class Detalle_Orden(Base):
    __tablename__ = "detalle_orden"
    id = Column('ID_DetalleOrd', Integer, primary_key=True)
    orden_id = Column('ID_OrdenPro', Integer, ForeignKey('orden.ID_OrdenPro'))
    producto_id = Column('ID_Producto', Integer, ForeignKey('producto.ID_Producto'))
    cantidad = Column('Cantidad', Integer)
    precio_unitario = Column('Precio_Unitario', Float)
    orden = relationship('Orden', back_populates='detalle_ordenes')
    producto = relationship('Producto', back_populates='detalle_ordenes')
    Orden.detalle_ordenes = relationship('Detalle_Orden', back_populates='orden')