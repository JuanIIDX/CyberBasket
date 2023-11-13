# CyberBasket
Proyecto de Software 2

## Cómo integrar el middleware de autenticacion
Para integrar el middleware en un endpoint se debe hacer lo siguiente:
1. Importar el middleware del paquete shared
``` python
from fastapi import Depends
from backend.shared.auth.auth import JWTBearer
```
2. Agregarlo como dependecia en el endpoint
``` python
@app.post("/posts", dependencies=[Depends(JWTBearer())])
...
```

## Correr en local
Para correr el proyecto local es necesario tener un archivo `.env` con dos valores dentro:
```
jwt_secret=dummy_secret
jwt_algorithm=HS256
```