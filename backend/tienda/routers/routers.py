from fastapi import APIRouter, Depends
from schemas.tienda_schema import Crea_producto,Crea_inventario
from database.db import get_db
from sqlalchemy.orm import Session
from controllers.tienda_controller import *

##LUEGO SEPARAR ROUTERS SEGUN RESPONSABILIDAD


router = APIRouter()

#Agrega producto
@router.post("/producto")
def create_new_producto(new_producto: Crea_producto, db: Session = Depends(get_db)):
    exist = exist_producto(new_producto.nombre, db)
    if exist:
        return {"message": "Producto already exist"}

    rol = create_producto(new_producto, db)
    return rol


#Consigue un producto especifico
@router.get("/producto/{nombre_producto}")
def get_producto(nombre_producto: str, db: Session = Depends(get_db)):
    exist = exist_producto(nombre_producto, db)
    if not exist:
        return {"message": "User not exist"}

    return Producto(**exist.__dict__)



#Consigue todos los productos
@router.get("/producto",response_model=list[Crea_producto])
def get_all_productos(db: Session = Depends(get_db)):
    return all_productos(db)





#Agrega inventario
@router.post("/inventario")
def create_new_inventario(new_inventario: Crea_inventario, db: Session = Depends(get_db)):
    exist = exist_inventario(new_inventario.id_producto, db)
    if exist:
        return {"messague": "Producto already exist"}

    rol = create_inventario(new_inventario, db)
    return rol





#Consigue todos los inv
@router.get("/inventario",response_model=list[Crea_inventario])
def get_all_inventario(db: Session = Depends(get_db)):
    return all_Inventario(db)


#Agrega tienda
@router.post("/tienda")
def create_new_shop(new_tienda: tiendaModel, db: Session = Depends(get_db)):
    exist = exist_tienda(new_tienda.nombre, db)
    if exist:
        return {"message": "Shop name already exist"}

    rol = create_tiendas(new_tienda, db)
    return rol

#Devuelve todas las tiendas
@router.get("/tienda",response_model=list[tiendaModel])
def get_all_tiendasd(db: Session = Depends(get_db)):
    return get_all_tiendas(db)


# Ruta de ejemplo en FastAPI
@router.get("/consulta/{tienda_id}",response_model=list[consulta_productos_por_tienda])
async def get_consulta(tienda_id: int, db: Session = Depends(get_db)):
    try:
        # Realizar la consulta
        result = get_productos_por_tienda(tienda_id,db)
        # Convertir el resultado a JSON
        """ data = [{"nombre": nombre, "descripcion": descripcion, "stock": stock} for nombre, descripcion, stock in result]
        return {"data": data} """
        return result
    except Exception as e:
        print("Esta incorrecto")
    finally:
        db.close()


""" Consultas categorias por tiendas """


#Agrega categoria por tienda
@router.post("/categoria_tienda")
def create_new_categoria_tienda(new_tienda: categoria_tienda, db: Session = Depends(get_db)):
    exist = exist_categoria_tienda(new_tienda.nombre, db)
    if exist:
        return {"message": "Shop name already exist"}

    rol = create_categoria_tienda(new_tienda, db)
    return rol



#Consigue todos las categorias de las tiendas
@router.get("/categoria_tienda",response_model=list[categoria_tienda])
def get_all_categoria_tienda(db: Session = Depends(get_db)):
    return all_Categoria_tienda(db)

# Ruta de ejemplo en FastAPI
""" @router.get("/consulta_tiendas_x_categoria/{categoria_id}",response_model=list[tiendaModel])
async def get_consulta_categoria_x_tienda(categoria_id: int, db: Session = Depends(get_db)):
    try:
        result = get_tiendas_por_categoria(categoria_id,db)
        print('jhony' + result)
        data = [{"nombre": nombre, "estado": estado} for nombre, estado in result]
        return {"data": data}
    except Exception as e:
        print("Esta incorrecto")
    finally:
        db.close()  """

@router.get("/consulta_tiendas_x_categoria/{categoria_id}",response_model=list[tiendaModel])
def get_consulta_categoria_x_tienda(categoria_id: int, db: Session = Depends(get_db)):
    return get_tiendas_por_categoria(categoria_id,db)
    db.close() 

@router.get("/categoriaxtienda/{id_tienda}",response_model=list[categoria_tienda])
def get_consulta_categoria_x_tienda2(id_tienda: int, db: Session = Depends(get_db)):
    return get_categorias_por_tienda(id_tienda,db)
    db.close() 

#Agrega categoria por tienda
@router.post("/post_categoria_tienda_a_tienda")
def create_new_categoria_tienda2(new_tienda: categoria_tiendaXtienda, db: Session = Depends(get_db)):
    rol = create_categoria_tiendaXtienda(new_tienda, db)
    return rol


#Devuelve todas las marcas
@router.get("/marca",response_model=list[MarcaSchema])
def get_all_marcas(db: Session = Depends(get_db)):
    return get_all_Marcas(db)

#Devuelve todas las marcas x productos
@router.get("/marcasXProducto",response_model=list[ProductoXMarcaSchema])
def get_all_marcasxproductos(db: Session = Depends(get_db)):
    return get_all_MarcasXProductos(db)

#Agrega marcas
@router.post("/marca")
def create_new_marcas(new_tienda: MarcaSchema, db: Session = Depends(get_db)):
    rol = createMarca(new_tienda, db)
    return rol

#Agrega marca por producto
@router.post("/marcaXproducto")
def create_new_macas_productos(new_tienda: ProductoXMarcaSchema, db: Session = Depends(get_db)):
    rol = createMarcaXProducto(new_tienda, db)
    return rol

@router.get("/productosxmarcas/{id_marca}",response_model=list[MarcaSchema])
def get_consulta_productos_por_marca(id_marca: int, db: Session = Depends(get_db)):
    return get_productos_por_marca(id_marca,db)
    db.close() 
