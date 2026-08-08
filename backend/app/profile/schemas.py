from typing import Optional
from pydantic import BaseModel, ConfigDict
from app.auth.schemas import UserSchema


class UpdateProfileRequest(BaseModel):
    preferred_language: Optional[str] = None
    name: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None


class ProfileResponse(BaseModel):
    success: bool = True
    data: UserSchema
