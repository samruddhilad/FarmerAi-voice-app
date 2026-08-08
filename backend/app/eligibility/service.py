from typing import List
from sqlalchemy.orm import Session
from app.eligibility.repository import EligibilityRepository
from app.eligibility.schemas import (
    EligibilityRequestSchema,
    EligibilityResultSchema,
    EligibilityDataSchema
)
from app.schemes.service import SchemeService


class EligibilityService:
    def __init__(self, db: Session):
        self.repository = EligibilityRepository(db)
        self.scheme_service = SchemeService(db)

    def evaluate_eligibility(self, req: EligibilityRequestSchema) -> EligibilityDataSchema:
        schemes = self.repository.get_schemes_with_rules()
        results: List[EligibilityResultSchema] = []
        total_eligible = 0

        for scheme in schemes:
            rule = scheme.eligibility_rules
            reasons = []
            score = 100
            failed_criteria = 0

            if rule:
                # Age check
                if rule.min_age is not None and req.age < rule.min_age:
                    reasons.append(f"Minimum age required is {rule.min_age} years (Your age: {req.age}).")
                    score -= 35
                    failed_criteria += 1
                elif rule.max_age is not None and req.age > rule.max_age:
                    reasons.append(f"Maximum age limit is {rule.max_age} years (Your age: {req.age}).")
                    score -= 35
                    failed_criteria += 1

                # Land size check
                if rule.min_land_size is not None and req.land_size < rule.min_land_size:
                    reasons.append(f"Minimum land size required is {rule.min_land_size} acres (Your land: {req.land_size} acres).")
                    score -= 35
                    failed_criteria += 1
                elif rule.max_land_size is not None and req.land_size > rule.max_land_size:
                    reasons.append(f"Maximum land size allowed is {rule.max_land_size} acres (Your land: {req.land_size} acres).")
                    score -= 35
                    failed_criteria += 1

                # Gender check
                if rule.allowed_genders and "all" not in rule.allowed_genders:
                    if req.gender.lower() not in [g.lower() for g in rule.allowed_genders]:
                        reasons.append(f"Scheme is restricted to {', '.join(rule.allowed_genders)} applicants.")
                        score -= 30
                        failed_criteria += 1

                # State check
                if rule.allowed_states and "all" not in rule.allowed_states:
                    if req.state.strip().lower() not in [s.strip().lower() for s in rule.allowed_states]:
                        reasons.append(f"Scheme applicable only in state(s): {', '.join(rule.allowed_states)}.")
                        score -= 40
                        failed_criteria += 1

                # Farmer type check
                if rule.allowed_farmer_types and "all" not in rule.allowed_farmer_types:
                    if req.farmer_type.strip().lower() not in [ft.strip().lower() for ft in rule.allowed_farmer_types]:
                        reasons.append(f"Applicable for farmer category: {', '.join(rule.allowed_farmer_types)}.")
                        score -= 20

            # Default positive reasons if eligible
            if not reasons:
                if req.land_size > 0:
                    reasons.append(f"Land size of {req.land_size} acres satisfies eligibility norms.")
                if req.state:
                    reasons.append(f"Resident of {req.state} state.")
                if req.farmer_type:
                    reasons.append(f"Qualifies under {req.farmer_type} farmer classification.")

            match_percentage = max(0, min(100, score))
            is_eligible = failed_criteria == 0 and match_percentage >= 60

            if is_eligible:
                total_eligible += 1

            scheme_item = self.scheme_service._to_list_item(scheme)

            results.append(
                EligibilityResultSchema(
                    scheme=scheme_item,
                    is_eligible=is_eligible,
                    match_percentage=match_percentage,
                    reasons=reasons
                )
            )

        # Sort results: eligible first, then by highest match percentage
        results.sort(key=lambda x: (x.is_eligible, x.match_percentage), reverse=True)

        return EligibilityDataSchema(
            results=results,
            total_eligible=total_eligible
        )
