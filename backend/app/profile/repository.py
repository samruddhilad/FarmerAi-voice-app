from typing import Optional
from sqlalchemy.orm import Session
from app.auth.models import User


class ProfileRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_profile(self, user_id: str) -> Optional[User]:
        return self.db.query(User).filter(User.id == user_id).first()

    def get_or_create_default_profile(self) -> User:
        user = self.db.query(User).filter(User.id == "guest_user").first()
        if not user:
            user = User(
                id="guest_user",
                name="Farmer",
                email="farmer@example.com",
                mobile="9876543210",
                preferred_language="en",
                state="Maharashtra",
                district="Jalgaon"
            )
            self.db.add(user)
            self.db.commit()
            self.db.refresh(user)
        return user

    def update_profile(self, user: User, data: dict) -> User:
        for field, value in data.items():
            if value is not None and hasattr(user, field):
                setattr(user, field, value)
        self.db.commit()
        self.db.refresh(user)
        return user
