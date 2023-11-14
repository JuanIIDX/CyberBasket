import time
from typing import Dict, Optional
import jwt
from decouple import config
from backend.shared.schemas.users import UserResponse

JWT_SECRET = config("jwt_secret")
JWT_ALGORITHM = config("jwt_algorithm")


def token_response(token: str):
    return {
        "access_token": token
    }

def sign_jwt(user: UserResponse) -> Dict[str, str]:
    payload = {
        "id": user.id,
        "email": user.email,
        "expires": time.time() + 600
    }

    token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

    return token_response(token)

def decode_jwt(token: str) -> Optional[dict]:
    try:
        decoded_token = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])

        expires = decoded_token.get("expires")
        if expires is None or  expires < time.time():
            return None

        return decoded_token
    except:
        return None

