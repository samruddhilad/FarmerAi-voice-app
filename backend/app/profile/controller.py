from typing import Optional
from sqlalchemy.orm import Session
from app.profile.schemas import UpdateProfileRequest
from app.profile.service import ProfileService
from app.utils.response import success_response, error_response


class ProfileController:
    def __init__(self, db: Session):
        self.service = ProfileService(db)

    def get_profile(self, user_id: Optional[str] = None):
        profile = self.service.get_user_profile(user_id)
        return success_response(profile.model_dump())

    def update_profile(self, data: UpdateProfileRequest, user_id: Optional[str] = None):
        updated = self.service.update_user_profile(user_id, data)
        return success_response(updated.model_dump())
