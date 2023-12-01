from schemas.tienda_schema import *
from models.models_database import *


def create_producto(new_producto: Crea_producto, db):

    producto = Producto(**new_producto.dict())
    db.add(producto)
    db.commit()
    db.refresh(producto)
    return producto

def exist_producto(producto_name: str, db):
    producto = db.query(Producto).filter(Producto.nombre == producto_name).first()
    return producto

def all_productos(db):
    return db.query(Producto).all()

def create_inventario(new_inventario: Crea_inventario, db):

    usr = Inventario(**new_inventario.dict())
    ## Acá va la logica de consulta en la base de datos
    db.add(usr)
    db.commit()
    db.refresh(usr)
    return usr

def exist_inventario(inventario_id: str, db):
    usr = db.query(Inventario).filter(Producto.id== inventario_id).first()
    return usr

def all_productos(db):
    return db.query(Producto).all()

def all_Inventario(db):
    return db.query(Inventario).all()

def all_Categoria_tienda(db):
    return db.query(Categoria_tienda).all()



""" controladores para tienda """

def create_tiendas(new_tienda: tiendaModel, db):

    tienda = Tienda(**new_tienda.dict())
    db.add(tienda)
    db.commit()
    db.refresh(tienda)
    return tienda


def get_all_tiendas(db):
    return db.query(Tienda).all()

def exist_tienda(nombre: str, db):
    usr = db.query(Tienda).filter(Tienda.nombre== nombre).first()
    return usr


def get_productos_por_tienda(tienda_id: int,db):
    result = (
        db.query(Producto.nombre, Producto.descripcion, Inventario.cantidad)
        .join(Inventario, Inventario.id_producto == Producto.id_producto)
        .join(Tienda, Inventario.id_tienda == Tienda.id_tienda)
        .filter(Tienda.id_tienda == tienda_id)
        .all()
    )
    print(result)
    return result

""" controladores para catogorias x tienda """

def create_categoria_tienda(new_tienda: Categoria_tienda, db):

    tienda = Categoria_tienda(**new_tienda.dict())
    db.add(tienda)
    db.commit()
    db.refresh(tienda)
    return tienda

def get_all_categorias_tiendas(db):
    return db.query(Categoria_tienda).all()

def exist_categoria_tienda(nombre: str, db):
    usr = db.query(Categoria_tienda).filter(Categoria_tienda.nombre== nombre).first()
    return usr

""" controladores categorias_tiendasxtiendas """

def create_categoria_tiendaXtienda(new_tienda: Categoria_tiendaXtienda, db):

    tienda = Categoria_tiendaXtienda(**new_tienda.dict())
    db.add(tienda)
    db.commit()
    db.refresh(tienda)
    return tienda

def get_tiendas_por_categoria(categoria_id: int, db):
    result = (
        db.query(Tienda.id_tienda, Tienda.nombre, Tienda.estado, Tienda.id_direccion)
        .join(Categoria_tiendaXtienda, Categoria_tiendaXtienda.id_tienda == Tienda.id_tienda)
        .filter(Categoria_tiendaXtienda.id_categoria_tienda == categoria_id)
        .order_by(Tienda.nombre)
        .all()
    )
    return result 


def get_categorias_por_tienda(tienda_id: int, db):
    result = (
        db.query(Categoria_tienda.id_categoria_tienda, Categoria_tienda.nombre)
        .join(Categoria_tiendaXtienda, Categoria_tiendaXtienda.id_categoria_tienda == Categoria_tienda.id_categoria_tienda)
        .filter(Categoria_tiendaXtienda.id_tienda == tienda_id)
        .order_by(Categoria_tienda.id_categoria_tienda)
        .all()
    )
    return result 

""" --------- marcas de productos----------- """

""" post marca """
def createMarca(marca: Marca, db):
    cmarca = Marca(**marca.dict())
    db.add(cmarca)
    db.commit()
    db.refresh(cmarca)
    return cmarca

""" post marcaxproducto """
def createMarcaXProducto(NewproductMarca: ProductoXMarca, db):
    productMarca = ProductoXMarca(**NewproductMarca.dict())
    db.add(productMarca)
    db.commit()
    db.refresh(productMarca)
    return productMarca

""" Trae todas las marcas """
def get_all_Marcas(db):
    return db.query(Marca).all()

""" Trae todos los registros de las relaciones entre marcas y productos """
def get_all_MarcasXProductos(db):
    return db.query(ProductoXMarca).all()

def get_productos_por_marca(marca_id: int, db):
    result = (
        db.query(Producto)
        .join(ProductoXMarca, ProductoXMarca.id_producto == Producto.id_producto)
        .filter(ProductoXMarca.id_marca == marca_id)
        .order_by(Producto.id_producto)
        .all()
    )
    return result 