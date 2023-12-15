from fastapi import APIRouter, Depends
from schemas.product_schema import *
from database.db import get_db
from sqlalchemy.orm import Session
from controllers.inventario_controller import *
from models.database_models import *

"""Organizar mejor los imports"""

router = APIRouter()



@router.post("/producto",tags=["Producto"])
async def insert_prueba(info: insercion_producto_front_schema, db: Session = Depends(get_db)):
    """
    Agrega un producto a la base de datos

    Parameters:
    - info: Informacion del producto a agregar

    Returns:
    - id: id del producto agregado

    Excepcion:
    - error: error de procesamiento
    """
    try:
        #Se agrega los datos a la tabla productos
        id_producto_nuevo=insercion_tabla_producto(info, db)
        #Se agrega los datos a la tabla categorias
        insercion_tabla_inventario(id_producto_nuevo,info, db)
        #Se inserta en la tabla categoria
        insercion_tabla_categoria(id_producto_nuevo,info, db)
        #Se inserta la imagen principal
        insercion_imagen_principal(id_producto_nuevo,info, db)
        #Se insertan las imagenes decorativas
        insercion_imagenes_decorativas(id_producto_nuevo,info,db)
        return {"id": id_producto_nuevo}
    except Exception as e:
        #Si hay un error se hace rollback
        db.rollback()
        print(e)
        return {"error": "error de procesamiento"+str(e)}
    finally:
        db.close()



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

#Consigue un inventario de una tienda en especifico
@router.get("/inventario/tienda",response_model=list[inventario_schema_pagina])
def get_all_inventario(id_tienda:int,db: Session = Depends(get_db)):
    try:
        return db.query(Inventario).filter(Inventario.id_tienda==id_tienda).all()
    except Exception as e:
        print("Esta incorrecto")
        print(e)
    finally:
        db.close()




#Agrega tienda
@router.post("/tienda")
def create_new_shop(b_tienda: tienda_modelo_creacion_pagina, db: Session = Depends(get_db)):
    try:
        exist = db.query(UsuarioxTienda).filter(UsuarioxTienda.id_usuario== b_tienda.id_usuario).first()
        if exist:
            return {"message": "El usuario no puede tener mas de dos tiendas"}
        
        new_tienda = tienda_modelo(
            id_direccion=b_tienda.id_direccion,
            nombre=b_tienda.nombre,
            descripcion=b_tienda.descripcion,
            estado=b_tienda.estado
        )
        
        tienda = Tienda(**new_tienda.dict())
        db.add(tienda)
        db.commit()
        db.refresh(tienda)
        

        relacion_tienda = tienda_relacion_user_pagina(
            id_usuario=b_tienda.id_usuario,
            id_tienda=tienda.id_tienda
        )

        usu_tienda_model = UsuarioxTienda(**relacion_tienda.dict())
        db.add(usu_tienda_model)
        db.commit()
        

        return usu_tienda_model
    except Exception as e:
        print("Esta incorrecto")
        print(e)
        return {"error": "error de procesamiento"+str(e)}
    finally:
        db.close()






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
# Ruta de ejemplo en FastAPI
@router.get("/tienda_de_user",response_model=id_usuario_tienda_schema)
async def get_consulta(usuario_id: int, db: Session = Depends(get_db)):
    try:
        result = (
        db.query(UsuarioxTienda.id_tienda, Tienda.nombre)
        .join(UsuarioxTienda, UsuarioxTienda.id_tienda == Tienda.id_tienda)
        .filter(UsuarioxTienda.id_usuario == usuario_id)
        .one()
        )
        print(result)
        return result


    except Exception as e:
        print("Esta incorrecto")
        print(e)
    finally:
        db.close()







