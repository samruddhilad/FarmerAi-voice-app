from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.eligibility.schemas import EligibilityRequestSchema
from app.eligibility.controller import EligibilityController

router = APIRouter(prefix="/eligibility", tags=["Eligibility"])


@router.post("/check", summary="Check scheme eligibility for user profile")
def check_eligibility(
    data: EligibilityRequestSchema,
    db: Session = Depends(get_db)
):
    controller = EligibilityController(db)
    return controller.check_eligibility(data)
