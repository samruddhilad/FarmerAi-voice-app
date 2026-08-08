from typing import Optional
from fastapi import Header
from app.core.security import decode_token


def get_current_user_id_optional(authorization: Optional[str] = Header(None)) -> Optional[str]:
    if not authorization:
        return None
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            return None
        payload = decode_token(token)
        if payload and payload.get("type") == "access":
            return payload.get("sub")
    except Exception:
        pass
    return None
