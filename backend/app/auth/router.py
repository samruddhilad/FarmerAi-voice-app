from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.auth.schemas import (
    GoogleAuthRequest,
    SendOTPRequest,
    VerifyOTPRequest,
    RefreshTokenRequest
)
from app.auth.controller import AuthController

router = APIRouter(prefix="/auth", tags=["Auth"])


@router.post("/google", summary="Authenticate via Google OAuth token")
def google_auth(data: GoogleAuthRequest, db: Session = Depends(get_db)):
    controller = AuthController(db)
    return controller.google_auth(data)


@router.post("/send-otp", summary="Send mobile OTP for verification")
def send_otp(data: SendOTPRequest, db: Session = Depends(get_db)):
    controller = AuthController(db)
    return controller.send_otp(data)


@router.post("/verify-otp", summary="Verify OTP and receive JWT tokens")
def verify_otp(data: VerifyOTPRequest, db: Session = Depends(get_db)):
    controller = AuthController(db)
    return controller.verify_otp(data)


@router.post("/refresh", summary="Refresh access token using refresh token")
def refresh_token(data: RefreshTokenRequest, db: Session = Depends(get_db)):
    controller = AuthController(db)
    return controller.refresh_token(data)


@router.post("/logout", summary="Logout current user session")
def logout(db: Session = Depends(get_db)):
    controller = AuthController(db)
    return controller.logout()
