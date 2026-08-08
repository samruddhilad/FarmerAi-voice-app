from typing import List, Optional
from pydantic import BaseModel, ConfigDict
from app.schemes.schemas import SchemeListItemSchema


class EligibilityRequestSchema(BaseModel):
    age: int
    gender: str
    state: str
    district: str
    land_size: float
    farmer_type: str


class EligibilityResultSchema(BaseModel):
    scheme: SchemeListItemSchema
    is_eligible: bool
    match_percentage: int
    reasons: List[str]

    model_config = ConfigDict(from_attributes=True)


class EligibilityDataSchema(BaseModel):
    results: List[EligibilityResultSchema]
    total_eligible: int


class EligibilityResponseSchema(BaseModel):
    success: bool = True
    data: EligibilityDataSchema
