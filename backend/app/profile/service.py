from typing import Optional
from sqlalchemy.orm import Session
from app.profile.repository import ProfileRepository
from app.profile.schemas import UpdateProfileRequest
from app.auth.schemas import UserSchema


class ProfileService:
    def __init__(self, db: Session):
        self.repository = ProfileRepository(db)

    def _to_schema(self, user) -> UserSchema:
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

    def get_user_profile(self, user_id: Optional[str] = None) -> UserSchema:
        user = None
        if user_id:
            user = self.repository.get_profile(user_id)
        if not user:
            user = self.repository.get_or_create_default_profile()
        return self._to_schema(user)

    def update_user_profile(self, user_id: Optional[str], data: UpdateProfileRequest) -> UserSchema:
        user = None
        if user_id:
            user = self.repository.get_profile(user_id)
        if not user:
            user = self.repository.get_or_create_default_profile()

        updated_fields = data.model_dump(exclude_unset=True)
        updated_user = self.repository.update_profile(user, updated_fields)
        return self._to_schema(updated_user)
