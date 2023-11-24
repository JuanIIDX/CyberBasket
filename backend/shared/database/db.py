
import os
from dotenv import load_dotenv

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

load_dotenv()

# Configuración de la base de datos en Azure SQL
DATABASE_SERVER = os.environ.get("DATABASE_SERVER")
DATABASE_NAME = os.environ.get("DATABASE_NAME")
DATABASE_USER = os.environ.get("DATABASE_USER")
DATABASE_PASSWORD = os.environ.get("DATABASE_PASSWORD")
DATABASE_URL = f"mssql+pymssql://{DATABASE_USER}:{DATABASE_PASSWORD}@{DATABASE_SERVER}/{DATABASE_NAME}"

Base = declarative_base()
engine = create_engine(DATABASE_URL, echo=True, future=True)

# Crea el motor de base de datos y la sesión de SQLAlchemy
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

print("database connected successfully!")

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()