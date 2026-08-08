from typing import List
from sqlalchemy.orm import Session, joinedload
from app.schemes.models import Scheme


class EligibilityRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_schemes_with_rules(self) -> List[Scheme]:
        return self.db.query(Scheme).filter(
            Scheme.is_active == True
        ).options(
            joinedload(Scheme.category_rel),
            joinedload(Scheme.documents),
            joinedload(Scheme.eligibility_rules)
        ).all()
