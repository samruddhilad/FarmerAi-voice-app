from typing import Tuple, Optional
from sqlalchemy.orm import Session
from app.auth.repository import AuthRepository
from app.auth.schemas import UserSchema, AuthDataSchema
from app.core.security import create_access_token, create_refresh_token, decode_token


class AuthService:
    def __init__(self, db: Session):
        self.repository = AuthRepository(db)

    def _format_user_schema(self, user) -> UserSchema:
        return UserSchema(
            id=user.id,
            name=user.name,
            email=user.email,
            mobile=user.mobile,
            preferred_language=user.preferred_language or "en",
            avatar_url=user.avatar_url,
            state=user.state,
            district=user.district,
            created_at=user.created_at.isoformat() if user.created_at else None
        )

    def send_otp(self, mobile: str) -> dict:
        # In production, integrate SMS Gateway (e.g. Twilio/MSG91)
        # For development/testing, OTP is set to 123456
        user = self.repository.get_by_mobile(mobile)
        if not user:
            # Pre-register or log intention
            pass
        return {"message": "OTP sent successfully to " + mobile, "dev_otp": "123456"}

    def verify_otp(self, mobile: str, otp: str) -> AuthDataSchema:
        # Accept '123456' as standard dev OTP or any 6-digit string in dev
        user = self.repository.get_by_mobile(mobile)
        if not user:
            user = self.repository.create_user(
                name="Farmer",
                mobile=mobile,
                preferred_language="en"
            )

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        return AuthDataSchema(
            user=self._format_user_schema(user),
            access_token=access_token,
            refresh_token=refresh_token
        )

    def google_auth(self, id_token: str) -> AuthDataSchema:
        # Extract email/name or mock user creation for dev
        mock_email = f"google_user_{id_token[:6]}@example.com"
        user = self.repository.get_by_email(mock_email)
        if not user:
            user = self.repository.create_user(
                name="Google Farmer",
                email=mock_email,
                preferred_language="en"
            )

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        return AuthDataSchema(
            user=self._format_user_schema(user),
            access_token=access_token,
            refresh_token=refresh_token
        )

    def refresh_tokens(self, refresh_token: str) -> Optional[dict]:
        payload = decode_token(refresh_token)
        if not payload or payload.get("type") != "refresh":
            return None

        user_id = payload.get("sub")
        if not user_id:
            return None

        user = self.repository.get_by_id(user_id)
        if not user:
            return None

        new_access_token = create_access_token(user.id)
        new_refresh_token = create_refresh_token(user.id)

        return {
          "access_token": new_access_token,
          "refresh_token": new_refresh_token
        }
