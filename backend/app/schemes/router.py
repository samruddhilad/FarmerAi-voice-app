from typing import Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.database.session import get_db
from app.schemes.controller import SchemeController

router = APIRouter(prefix="/schemes", tags=["Schemes"])


@router.get("", summary="Get paginated schemes list")
def get_schemes(
    category: Optional[str] = Query(None, description="Filter schemes by category name"),
    search: Optional[str] = Query(None, description="Search query string"),
    page: int = Query(1, ge=1, description="Page number"),
    limit: int = Query(10, ge=1, le=100, description="Items per page"),
    db: Session = Depends(get_db)
):
    controller = SchemeController(db)
    return controller.get_schemes(category=category, search=search, page=page, limit=limit)


@router.get("/categories", summary="Get scheme categories")
def get_categories(db: Session = Depends(get_db)):
    controller = SchemeController(db)
    return controller.get_categories()


@router.get("/search", summary="Search schemes")
def search_schemes(
    q: str = Query("", description="Search term"),
    db: Session = Depends(get_db)
):
    controller = SchemeController(db)
    return controller.search_schemes(query=q)


@router.get("/{scheme_id}", summary="Get complete scheme details")
def get_scheme_detail(
    scheme_id: str,
    db: Session = Depends(get_db)
):
    controller = SchemeController(db)
    return controller.get_scheme_detail(scheme_id=scheme_id)
