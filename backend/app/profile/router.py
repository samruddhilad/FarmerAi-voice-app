from typing import Optional
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.profile.schemas import UpdateProfileRequest
from app.profile.controller import ProfileController
from app.auth.dependencies import get_current_user_id_optional

router = APIRouter(prefix="/profile", tags=["Profile"])


@router.get("", summary="Get current user profile")
def get_profile(
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: Session = Depends(get_db)
):
    controller = ProfileController(db)
    return controller.get_profile(user_id)


@router.put("", summary="Update profile preferences")
def update_profile(
    data: UpdateProfileRequest,
    user_id: Optional[str] = Depends(get_current_user_id_optional),
    db: Session = Depends(get_db)
):
    controller = ProfileController(db)
    return controller.update_profile(data=data, user_id=user_id)
