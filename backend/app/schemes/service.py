from typing import List, Optional, Dict, Any
from math import ceil
from sqlalchemy.orm import Session
from app.schemes.repository import SchemeRepository
from app.schemes.schemas import (
    SchemeListItemSchema,
    SchemeDetailSchema,
    SchemeDocumentSchema,
    SchemeFAQSchema,
    SchemeGRSchema,
    SchemeContactSchema,
    SchemeCategorySchema,
    PaginatedSchemesData
)


class SchemeService:
    def __init__(self, db: Session):
        self.repository = SchemeRepository(db)

    def _to_list_item(self, scheme) -> SchemeListItemSchema:
        doc_titles = [d.title for d in scheme.documents] if scheme.documents else []
        return SchemeListItemSchema(
            id=scheme.id,
            title=scheme.title,
            description=scheme.description,
            category=scheme.category_rel.name if scheme.category_rel else "General",
            type=scheme.type,
            amount=scheme.amount,
            eligibility_criteria=scheme.eligibility_criteria,
            benefits=scheme.benefits,
            documents_required=doc_titles,
            application_url=scheme.application_url,
            deadline=scheme.deadline,
            is_featured=scheme.is_featured,
            created_at=scheme.created_at.isoformat() if scheme.created_at else None,
            updated_at=scheme.updated_at.isoformat() if scheme.updated_at else None,
        )

    def get_schemes(
        self,
        category: Optional[str] = None,
        search: Optional[str] = None,
        page: int = 1,
        limit: int = 10
    ) -> PaginatedSchemesData:
        items, total = self.repository.get_schemes(
            category=category, search=search, page=page, limit=limit
        )
        total_pages = max(1, ceil(total / limit)) if limit > 0 else 1
        list_items = [self._to_list_item(s) for s in items]

        return PaginatedSchemesData(
            items=list_items,
            total=total,
            page=page,
            limit=limit,
            totalPages=total_pages
        )

    def get_scheme_detail(self, scheme_id: str) -> Optional[SchemeDetailSchema]:
        scheme = self.repository.get_scheme_by_id(scheme_id)
        if not scheme:
            return None

        docs = [
            SchemeDocumentSchema(
                id=d.id,
                title=d.title,
                description=d.description,
                is_mandatory=d.is_mandatory
            )
            for d in (scheme.documents or [])
        ]
        doc_titles = [d.title for d in (scheme.documents or [])]

        faqs = [
            SchemeFAQSchema(
                id=f.id,
                question=f.question,
                answer=f.answer
            )
            for f in (scheme.faqs or [])
        ]

        gr_data = None
        if scheme.gr:
            gr_data = SchemeGRSchema(
                id=scheme.gr.id,
                gr_title=scheme.gr.gr_title,
                gr_number=scheme.gr.gr_number,
                gr_date=scheme.gr.gr_date,
                view_url=scheme.gr.view_url,
                download_url=scheme.gr.download_url
            )

        contact_data = None
        if scheme.contact:
            contact_data = SchemeContactSchema(
                id=scheme.contact.id,
                department=scheme.contact.department,
                office=scheme.contact.office,
                address=scheme.contact.address,
                phone=scheme.contact.phone,
                email=scheme.contact.email,
                website=scheme.contact.website
            )

        return SchemeDetailSchema(
            id=scheme.id,
            title=scheme.title,
            description=scheme.description,
            category=scheme.category_rel.name if scheme.category_rel else "General",
            type=scheme.type,
            amount=scheme.amount,
            overview=scheme.overview or scheme.description,
            about=scheme.overview or scheme.description,
            benefits=scheme.benefits,
            eligibility_criteria=scheme.eligibility_criteria,
            how_to_apply=scheme.how_to_apply,
            documents=docs,
            documents_required=doc_titles,
            faqs=faqs,
            gr=gr_data,
            contact=contact_data,
            deadline=scheme.deadline,
            application_url=scheme.application_url,
            official_website=scheme.official_website,
            is_featured=scheme.is_featured,
            is_active=scheme.is_active,
            created_at=scheme.created_at.isoformat() if scheme.created_at else None,
            updated_at=scheme.updated_at.isoformat() if scheme.updated_at else None,
        )

    def get_categories(self) -> List[SchemeCategorySchema]:
        cat_tuples = self.repository.get_categories()
        return [
            SchemeCategorySchema(
                id=cat.id,
                name=cat.name,
                icon=cat.icon,
                count=count
            )
            for cat, count in cat_tuples
        ]

    def search_schemes(self, query: str) -> List[SchemeListItemSchema]:
        results = self.repository.search_schemes(query)
        return [self._to_list_item(s) for s in results]
