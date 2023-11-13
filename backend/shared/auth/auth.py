from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

from .jwt import decode_jwt


class JWTBearer(HTTPBearer):
    def __init__(self, auto_error: bool = True):
        super(JWTBearer, self).__init__(auto_error=auto_error)

    async def __call__(self, request: Request):
        credentials: HTTPAuthorizationCredentials = await super(JWTBearer, self).__call__(request)
        if credentials is None:
            raise HTTPException(status_code=403, detail="Invalid authorization code.")

        if not credentials.scheme == "Bearer":
            raise HTTPException(status_code=403, detail="Invalid authentication scheme.")

        if not self.is_jwt_valid(credentials.credentials):
            raise HTTPException(status_code=401, detail="Invalid token or expired token.")

        return credentials.credentials


    def is_jwt_valid(self, jwtoken: str) -> bool:
        payload = decode_jwt(jwtoken)

        if payload is None:
            return False

        return True