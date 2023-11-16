from fastapi import FastAPI
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

from .models import Base
from .schemas import OrdenSchema, DetalleOrdenSchema
from .controllers import get_ordenes, get_orden, create_orden, update_orden, delete_orden, get_detalle_ordenes, get_detalle_orden, create_detalle_orden, update_detalle_orden, delete_detalle_orden

DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/ordenes")
def read_ordenes(db: Session = Depends(get_db)):
    return get_ordenes(db)

@app.get("/orden/{orden_id}")
def read_orden(orden_id: int, db: Session = Depends(get_db)):
    return get_orden(db, orden_id)

@app.post("/orden")
def create_orden(orden: OrdenSchema, db: Session = Depends(get_db)):
    return create_orden(db, orden)

@app.put("/orden/{orden_id}")
def update_orden(orden_id: int, orden: OrdenSchema, db: Session = Depends(get_db)):
    return update_orden(db, orden_id, orden)

@app.delete("/orden/{orden_id}")
def delete_orden(orden_id: int, db: Session = Depends(get_db)):
    return delete_orden(db, orden_id)

# routs  for Detalle_Orden

@app.get("/detalle_ordenes")
def read_detalle_ordenes(db: Session = Depends(get_db)):
    return get_detalle_ordenes(db)

@app.get("/detalle_orden/{detalle_orden_id}")
def read_detalle_orden(detalle_orden_id: int, db: Session = Depends(get_db)):
    return get_detalle_orden(db, detalle_orden_id)

@app.post("/detalle_orden")
def create_detalle_orden(detalle_orden: DetalleOrdenSchema, db: Session = Depends(get_db)):
    return create_detalle_orden(db, detalle_orden)

@app.put("/detalle_orden/{detalle_orden_id}")
def update_detalle_orden(detalle_orden_id: int, detalle_orden: DetalleOrdenSchema, db: Session = Depends(get_db)):
    return update_detalle_orden(db, detalle_orden_id, detalle_orden)

@app.delete("/detalle_orden/{detalle_orden_id}")
def delete_detalle_orden(detalle_orden_id: int, db: Session = Depends(get_db)):
    return delete_detalle_orden(db, detalle_orden_id)