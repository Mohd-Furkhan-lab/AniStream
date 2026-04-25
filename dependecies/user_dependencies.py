from fastapi import Depends, HTTPException, Header
from typing import Optional
from auth.Jwttoken import verify_token  

def get_payload(authorization: Optional[str] = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Not logged in")
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid auth scheme")
        return verify_token(token)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=401, detail=str(e))

def is_admin(payload: dict = Depends(get_payload)) -> bool:
    if payload.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admins only")
    return True

def get_user_id(payload: dict = Depends(get_payload)) -> str:
    return payload["user_id"]

def is_logged_in(payload: dict = Depends(get_payload)) -> dict:
    return payload