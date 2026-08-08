import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Text, Boolean, Integer, Float, ForeignKey, DateTime, JSON
from sqlalchemy.orm import relationship
from app.database.base import Base


class SchemeCategory(Base):
    __tablename__ = "scheme_categories"

    id = Column(String, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False, index=True)
    icon = Column(String, nullable=True)

    schemes = relationship("Scheme", back_populates="category_rel")


class Scheme(Base):
    __tablename__ = "schemes"

    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False, index=True)
    description = Column(Text, nullable=False)
    category_id = Column(String, ForeignKey("scheme_categories.id"), nullable=False)
    type = Column(String, nullable=False, default="State")  # Central or State
    amount = Column(String, nullable=True)
    overview = Column(Text, nullable=True)
    benefits = Column(Text, nullable=True)
    eligibility_criteria = Column(Text, nullable=True)
    how_to_apply = Column(Text, nullable=True)
    deadline = Column(String, nullable=True)
    application_url = Column(String, nullable=True)
    official_website = Column(String, nullable=True)
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    # Relationships
    category_rel = relationship("SchemeCategory", back_populates="schemes")
    documents = relationship("SchemeDocument", back_populates="scheme", cascade="all, delete-orphan")
    faqs = relationship("SchemeFAQ", back_populates="scheme", cascade="all, delete-orphan")
    gr = relationship("SchemeGR", back_populates="scheme", uselist=False, cascade="all, delete-orphan")
    contact = relationship("SchemeContact", back_populates="scheme", uselist=False, cascade="all, delete-orphan")
    eligibility_rules = relationship("SchemeEligibilityRule", back_populates="scheme", uselist=False, cascade="all, delete-orphan")


class SchemeDocument(Base):
    __tablename__ = "scheme_documents"

    id = Column(Integer, primary_key=True, autoincrement=True)
    scheme_id = Column(String, ForeignKey("schemes.id"), nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    is_mandatory = Column(Boolean, default=True)

    scheme = relationship("Scheme", back_populates="documents")


class SchemeFAQ(Base):
    __tablename__ = "scheme_faqs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    scheme_id = Column(String, ForeignKey("schemes.id"), nullable=False)
    question = Column(Text, nullable=False)
    answer = Column(Text, nullable=False)

    scheme = relationship("Scheme", back_populates="faqs")


class SchemeGR(Base):
    __tablename__ = "scheme_grs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    scheme_id = Column(String, ForeignKey("schemes.id"), nullable=False)
    gr_title = Column(String, nullable=False)
    gr_number = Column(String, nullable=True)
    gr_date = Column(String, nullable=True)
    view_url = Column(String, nullable=False)
    download_url = Column(String, nullable=True)

    scheme = relationship("Scheme", back_populates="gr")


class SchemeContact(Base):
    __tablename__ = "scheme_contacts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    scheme_id = Column(String, ForeignKey("schemes.id"), nullable=False)
    department = Column(String, nullable=True)
    office = Column(String, nullable=True)
    address = Column(Text, nullable=True)
    phone = Column(String, nullable=True)
    email = Column(String, nullable=True)
    website = Column(String, nullable=True)

    scheme = relationship("Scheme", back_populates="contact")


class SchemeEligibilityRule(Base):
    __tablename__ = "scheme_eligibility_rules"

    id = Column(Integer, primary_key=True, autoincrement=True)
    scheme_id = Column(String, ForeignKey("schemes.id"), nullable=False)
    min_age = Column(Integer, nullable=True)
    max_age = Column(Integer, nullable=True)
    min_land_size = Column(Float, nullable=True)
    max_land_size = Column(Float, nullable=True)
    allowed_genders = Column(JSON, nullable=True)  # e.g., ["all"] or ["male", "female"]
    allowed_states = Column(JSON, nullable=True)   # e.g., ["Maharashtra"]
    allowed_farmer_types = Column(JSON, nullable=True) # e.g., ["small", "marginal"]

    scheme = relationship("Scheme", back_populates="eligibility_rules")
