from sqlalchemy.orm import Session
from app.auth.schemas import (
    GoogleAuthRequest,
    SendOTPRequest,
    VerifyOTPRequest,
    RefreshTokenRequest
)
from app.auth.service import AuthService
from app.utils.response import success_response, error_response


class AuthController:
    def __init__(self, db: Session):
        self.service = AuthService(db)

    def google_auth(self, data: GoogleAuthRequest):
        res = self.service.google_auth(data.id_token)
        return success_response(res.model_dump())

    def send_otp(self, data: SendOTPRequest):
        res = self.service.send_otp(data.mobile)
        return success_response(res)

    def verify_otp(self, data: VerifyOTPRequest):
        res = self.service.verify_otp(data.mobile, data.otp)
        return success_response(res.model_dump())

    def refresh_token(self, data: RefreshTokenRequest):
        tokens = self.service.refresh_tokens(data.refresh_token)
        if not tokens:
            return error_response(
                code="INVALID_REFRESH_TOKEN",
                message="The refresh token is invalid or has expired.",
                status_code=401
            )
        return success_response(tokens)

    def logout(self):
        return success_response({"message": "Successfully logged out."})
