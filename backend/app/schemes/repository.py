from typing import List, Optional, Tuple
from sqlalchemy import or_, func
from sqlalchemy.orm import Session, joinedload
from app.schemes.models import Scheme, SchemeCategory, SchemeDocument, SchemeFAQ, SchemeGR, SchemeContact


class SchemeRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_schemes(
        self,
        category: Optional[str] = None,
        search: Optional[str] = None,
        page: int = 1,
        limit: int = 10
    ) -> Tuple[List[Scheme], int]:
        query = self.db.query(Scheme).filter(Scheme.is_active == True)

        if category:
            query = query.join(SchemeCategory).filter(SchemeCategory.name == category)

        if search and search.strip():
            term = f"%{search.strip()}%"
            query = query.join(SchemeCategory).filter(
                or_(
                    Scheme.title.ilike(term),
                    Scheme.description.ilike(term),
                    Scheme.amount.ilike(term),
                    Scheme.benefits.ilike(term),
                    SchemeCategory.name.ilike(term),
                )
            )

        total = query.count()
        offset = (page - 1) * limit
        items = query.options(
            joinedload(Scheme.category_rel),
            joinedload(Scheme.documents)
        ).offset(offset).limit(limit).all()

        return items, total

    def get_scheme_by_id(self, scheme_id: str) -> Optional[Scheme]:
        return self.db.query(Scheme).filter(
            Scheme.id == scheme_id,
            Scheme.is_active == True
        ).options(
            joinedload(Scheme.category_rel),
            joinedload(Scheme.documents),
            joinedload(Scheme.faqs),
            joinedload(Scheme.gr),
            joinedload(Scheme.contact),
            joinedload(Scheme.eligibility_rules)
        ).first()

    def get_categories(self) -> List[Tuple[SchemeCategory, int]]:
        # Query categories with count of active schemes
        results = self.db.query(
            SchemeCategory,
            func.count(Scheme.id).label("count")
        ).outerjoin(
            Scheme, (Scheme.category_id == SchemeCategory.id) & (Scheme.is_active == True)
        ).group_by(SchemeCategory.id).all()
        return results

    def search_schemes(self, query_str: str, limit: int = 20) -> List[Scheme]:
        if not query_str or not query_str.strip():
            return []
        term = f"%{query_str.strip()}%"
        return self.db.query(Scheme).filter(
            Scheme.is_active == True,
            or_(
                Scheme.title.ilike(term),
                Scheme.description.ilike(term),
                Scheme.benefits.ilike(term),
                Scheme.overview.ilike(term)
            )
        ).options(
            joinedload(Scheme.category_rel),
            joinedload(Scheme.documents)
        ).limit(limit).all()
