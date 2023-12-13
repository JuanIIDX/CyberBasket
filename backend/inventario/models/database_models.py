from sqlalchemy import Column, Integer, String, DateTime, ForeignKey,Double,Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base


BaseModel = declarative_base()


#Carrito compras
#Categoria producto
#Categoria tienda
#Categoria TiendaXTienda
#Detalle Orden
#Direccion
#Envio
#Imagenes Producto

class Inventario(BaseModel):
  __tablename__ = "inventario"
  id_inventario=Column(Integer, primary_key=True,autoincrement=True)
  id_tienda=Column(Integer, ForeignKey("tienda.id_tienda"))
  id_producto=Column(Integer, ForeignKey("producto.id_producto"))
  cantidad=Column(Integer)
  #role = relationship("Role", back_populates="users")

class Marca(BaseModel):
  __tablename__ = "marca"
  id_marca=Column(Integer, primary_key=True,autoincrement=True)
  nombre=Column(String(255))
  descripcion=Column(String(1000))


#Orden
#Pagos

class Producto(BaseModel):
  __tablename__='producto'
  id_producto=Column(Integer, primary_key=True,autoincrement=True)
  nombre=Column(String(100))
  descripcion=Column(String(100))
  url_imagen=Column(String(100))
  precio=Column(Double)
  fecha_creacion=Column(DateTime)
  fecha_actualizacion=Column(DateTime)

class ProductoXMarca(BaseModel):
  __tablename__ = "productoxmarca"
  id_productoxmarca=Column(Integer, primary_key=True,autoincrement=True)
  id_producto=Column(Integer, ForeignKey("producto.id_producto"))
  id_marca=Column(Integer, ForeignKey("marca.id_marca"))


#Producto X Categoria


class TiendaXMarca(BaseModel):
  __tablename__ = "tiendaxmarca"
  id_tiendaxmarca=Column(Integer, primary_key=True,autoincrement=True)
  id_tienda=Column(Integer, ForeignKey("tienda.id_producto"))
  id_marca=Column(Integer, ForeignKey("marca.id_marca"))


class Tienda(BaseModel):
    __tablename__='tienda'
    id_tienda = Column(Integer, primary_key=True, index=True, autoincrement=True)
    id_direccion=Column(Integer, ForeignKey("direccion.id_direccion"))
    nombre=Column(String(100))
    """estado = Column(Boolean)"""

#Users

























  #Otros
"""   class Direccion(BaseModel):
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
    estado=Column(String(50)) """







