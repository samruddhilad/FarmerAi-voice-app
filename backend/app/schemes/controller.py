from typing import Optional
from sqlalchemy.orm import Session
from app.schemes.service import SchemeService
from app.utils.response import success_response, error_response


class SchemeController:
    def __init__(self, db: Session):
        self.service = SchemeService(db)

    def get_schemes(
        self,
        category: Optional[str] = None,
        search: Optional[str] = None,
        page: int = 1,
        limit: int = 10
    ):
        data = self.service.get_schemes(
            category=category, search=search, page=page, limit=limit
        )
        return success_response(data.model_dump())

    def get_scheme_detail(self, scheme_id: str):
        detail = self.service.get_scheme_detail(scheme_id)
        if not detail:
            return error_response(
                code="SCHEME_NOT_FOUND",
                message=f"Scheme with ID '{scheme_id}' was not found.",
                status_code=404
            )
        return success_response(detail.model_dump())

    def get_categories(self):
        categories = self.service.get_categories()
        # Return as raw list or data wrapper compatible with frontend
        return [c.model_dump() for c in categories]

    def search_schemes(self, query: str):
        results = self.service.search_schemes(query)
        return success_response([r.model_dump() for r in results])
