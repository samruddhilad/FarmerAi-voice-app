from typing import List, Optional
from datetime import datetime
from pydantic import BaseModel, ConfigDict, Field


class SchemeCategorySchema(BaseModel):
    id: str
    name: str
    icon: Optional[str] = None
    count: Optional[int] = None

    model_config = ConfigDict(from_attributes=True)


class SchemeDocumentSchema(BaseModel):
    id: Optional[int] = None
    title: str
    description: Optional[str] = None
    is_mandatory: bool = True

    model_config = ConfigDict(from_attributes=True)


class SchemeFAQSchema(BaseModel):
    id: Optional[int] = None
    question: str
    answer: str

    model_config = ConfigDict(from_attributes=True)


class SchemeGRSchema(BaseModel):
    id: Optional[int] = None
    gr_title: str
    gr_number: Optional[str] = None
    gr_date: Optional[str] = None
    view_url: str
    download_url: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class SchemeContactSchema(BaseModel):
    id: Optional[int] = None
    department: Optional[str] = None
    office: Optional[str] = None
    address: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    website: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class SchemeListItemSchema(BaseModel):
    id: str
    title: str
    description: str
    category: str
    type: str  # 'Central' | 'State'
    amount: Optional[str] = None
    eligibility_criteria: Optional[str] = None
    benefits: Optional[str] = None
    documents_required: Optional[List[str]] = []
    application_url: Optional[str] = None
    deadline: Optional[str] = None
    is_featured: Optional[bool] = False
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class SchemeDetailSchema(BaseModel):
    id: str
    title: str
    description: str
    category: str
    type: str
    amount: Optional[str] = None
    overview: Optional[str] = None
    about: Optional[str] = None  # Alias for frontend UI
    benefits: Optional[str] = None
    eligibility_criteria: Optional[str] = None
    how_to_apply: Optional[str] = None
    documents: List[SchemeDocumentSchema] = []
    documents_required: List[str] = []
    faqs: List[SchemeFAQSchema] = []
    gr: Optional[SchemeGRSchema] = None
    contact: Optional[SchemeContactSchema] = None
    deadline: Optional[str] = None
    application_url: Optional[str] = None
    official_website: Optional[str] = None
    is_featured: Optional[bool] = False
    is_active: Optional[bool] = True
    created_at: Optional[str] = None
    updated_at: Optional[str] = None

    model_config = ConfigDict(from_attributes=True)


class PaginatedSchemesData(BaseModel):
    items: List[SchemeListItemSchema]
    total: int
    page: int
    limit: int
    totalPages: int


class PaginatedSchemesResponse(BaseModel):
    success: bool = True
    data: PaginatedSchemesData


class SchemeDetailResponse(BaseModel):
    success: bool = True
    data: SchemeDetailSchema


class SchemeSearchResponse(BaseModel):
    success: bool = True
    data: List[SchemeListItemSchema]
