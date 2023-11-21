import os 
from fastapi import FastAPI, HTTPException
from sqlalchemy import create_engine, Column, Integer, String, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Carga las variables de entorno desde el archivo .env
load_dotenv()


app = FastAPI()

# Configuración de la base de datos en Azure SQL
DATABASE_SERVER = os.environ.get("DATABASE_SERVER")
DATABASE_NAME = os.environ.get("DATABASE_NAME")
DATABASE_USER = os.environ.get("DATABASE_USER")
DATABASE_PASSWORD = os.environ.get("DATABASE_PASSWORD") 



# URL de la base de datos
DATABASE_URL = f"mssql+pymssql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_SERVER}/{DATABASE_NAME}"

print("info")
print(DATABASE_URL)


# Crea el motor de base de datos y la sesión de SQLAlchemy
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Declara la tabla de la base de datos
Base = declarative_base()

class Test(Base):
    __tablename__ = "test"
    id = Column(Integer, primary_key=True, index=True)
    a = Column(Integer)
    b = Column(String)

# Crea la base de datos y las tablas
Base.metadata.create_all(bind=engine)

# Inicia la aplicación FastAPI
app = FastAPI()

# Ruta para obtener datos
@app.get("/get_data/{item_id}")
def read_item(item_id: int):
    db = SessionLocal()
    data = db.query(Test).filter(Test.id == item_id).first()
    db.close()
    if data is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return data

# Función para obtener todos los datos de la tabla Test
@app.get("/tests")
def get_tests():
    # Obtenemos todos los registros de la tabla Test
    db = SessionLocal()
    tests = db.query(Test).all()

    # Devolvemos los datos de la tabla Test
    return tests

# Ruta para agregar datos
@app.post("/add_data/")
def create_item(a: int, b: str):
    db = SessionLocal()
    item = Test(a=a, b=b)
    db.add(item)
    db.commit()
    db.refresh(item)
    db.close()
    return item