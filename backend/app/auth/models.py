import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, DateTime
from app.database.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()), index=True)
    name = Column(String, nullable=False, default="Farmer")
    email = Column(String, unique=True, nullable=True, index=True)
    mobile = Column(String, unique=True, nullable=True, index=True)
    preferred_language = Column(String, default="en")
    avatar_url = Column(String, nullable=True)
    state = Column(String, nullable=True)
    district = Column(String, nullable=True)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
