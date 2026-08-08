from sqlalchemy.orm import Session
from app.eligibility.schemas import EligibilityRequestSchema
from app.eligibility.service import EligibilityService
from app.utils.response import success_response


class EligibilityController:
    def __init__(self, db: Session):
        self.service = EligibilityService(db)

    def check_eligibility(self, data: EligibilityRequestSchema):
        result = self.service.evaluate_eligibility(data)
        return success_response(result.model_dump())
