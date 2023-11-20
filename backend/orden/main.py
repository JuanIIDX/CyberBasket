import sys, os

sys.path.append(os.path.dirname(os.path.dirname(os.path.realpath(__file__))))

from fastapi import FastAPI
from shared.database.db import get_db
from  routes.orders import router

app = FastAPI()
app.include_router(router, prefix="/orden")


# @app.get("/ordenes")
# def read_ordenes(db: Session = Depends(get_db)):
#     return get_ordenes(db)

# @app.get("/orden/{orden_id}")
# def read_orden(orden_id: int, db: Session = Depends(get_db)):
#     return get_orden(db, orden_id)

# @app.post("/orden")
# def create_orden(orden: OrdenSchema, db: Session = Depends(get_db)):
#     return create_orden(db, orden)

# @app.put("/orden/{orden_id}")
# def update_orden(orden_id: int, orden: OrdenSchema, db: Session = Depends(get_db)):
#     return update_orden(db, orden_id, orden)

# @app.delete("/orden/{orden_id}")
# def delete_orden(orden_id: int, db: Session = Depends(get_db)):
#     return delete_orden(db, orden_id)

# # routs  for Detalle_Orden

# @app.get("/detalle_ordenes")
# def read_detalle_ordenes(db: Session = Depends(get_db)):
#     return get_detalle_ordenes(db)

# @app.get("/detalle_orden/{detalle_orden_id}")
# def read_detalle_orden(detalle_orden_id: int, db: Session = Depends(get_db)):
#     return get_detalle_orden(db, detalle_orden_id)

# @app.post("/detalle_orden")
# def create_detalle_orden(detalle_orden: DetalleOrdenSchema, db: Session = Depends(get_db)):
#     return create_detalle_orden(db, detalle_orden)

# @app.put("/detalle_orden/{detalle_orden_id}")
# def update_detalle_orden(detalle_orden_id: int, detalle_orden: DetalleOrdenSchema, db: Session = Depends(get_db)):
#     return update_detalle_orden(db, detalle_orden_id, detalle_orden)

# @app.delete("/detalle_orden/{detalle_orden_id}")
# def delete_detalle_orden(detalle_orden_id: int, db: Session = Depends(get_db)):
#     return delete_detalle_orden(db, detalle_orden_id)

# route