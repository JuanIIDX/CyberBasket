from sqlalchemy import Column, Integer, String, DateTime, ForeignKey,Double,Boolean
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base


BaseModel = declarative_base()


#Carrito compras
class Categoria_Producto(BaseModel):
  __tablename__ = "categoria_producto"
  id_categoria=Column(Integer, primary_key=True,autoincrement=True)
  nombre=Column(String(100))
#Categoria tienda
#Categoria TiendaXTienda
#Detalle Orden
#Direccion
#Envio


class Imagenes_Producto(BaseModel):
  __tablename__ = "imagenes_producto"
  id_img_prod=Column(Integer, primary_key=True,autoincrement=True)
  id_producto=Column(Integer, ForeignKey("producto.id_producto"))
  tipo=Column(String(255))
  base64content=Column(String)
  nombre=Column(String(255))
  fecha_creacion=Column(DateTime)
  fecha_modificacion=Column(DateTime)



#------------------------------------AGREGAR IMAGENES USUARIO
#------------------------------------AGREGAR IMAGENES TIENDA

class Inventario(BaseModel):
  __tablename__ = "inventario"
  id_inventario=Column(Integer, primary_key=True,autoincrement=True)
  id_tienda=Column(Integer, ForeignKey("tienda.id_tienda"))
  id_producto=Column(Integer, ForeignKey("producto.id_producto"))
  cantidad=Column(Integer)

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
    id_direccion=Column(Integer)
    nombre=Column(String(100))
    descripcion=Column(String(100))
    estado = Column(Boolean)

class ProductoXcategoria(BaseModel):
  __tablename__ = "productoxcategoria"
  id_prod_cate=Column(Integer, primary_key=True,autoincrement=True)
  id_producto=Column(Integer, ForeignKey("producto.id_producto"))
  id_categoria=Column(Integer, ForeignKey("categoria_producto.id_categoria"))

#Users
class UsuarioxTienda(BaseModel):
  __tablename__ = "usuarioxtienda"
  id_user_tienda=Column(Integer, primary_key=True,autoincrement=True)
  id_tienda=Column(Integer, ForeignKey("tienda.id_tienda"))
  id_usuario=Column(Integer, ForeignKey("users.id"))

class User(BaseModel):
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
  #directions = relationship("UserDirections", back_populates="user")

class Role(BaseModel):
  __tablename__ = "roles"

  id = Column(Integer, primary_key=True)
  name = Column(String(100))
  users = relationship("User", back_populates="role")

























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







