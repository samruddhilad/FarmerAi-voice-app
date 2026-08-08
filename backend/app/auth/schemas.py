from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class UserSchema(BaseModel):
    id: str
    name: str
    email: Optional[str] = None
    mobile: Optional[str] = None
    preferred_language: str = "en"
    avatar_url: Optional[str] = None
    state: Optional[str] = None
    district: Optional[str] = None
    created_at: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class GoogleAuthRequest(BaseModel):
    id_token: str


class SendOTPRequest(BaseModel):
    mobile: str = Field(..., min_length=10, max_length=15)


class VerifyOTPRequest(BaseModel):
    mobile: str = Field(..., min_length=10, max_length=15)
    otp: str = Field(..., min_length=4, max_length=6)


class RefreshTokenRequest(BaseModel):
    refresh_token: str


class AuthDataSchema(BaseModel):
    user: UserSchema
    access_token: str
    refresh_token: str


class AuthResponse(BaseModel):
    success: bool = True
    data: AuthDataSchema


class SendOTPResponse(BaseModel):
    success: bool = True
    data: dict
