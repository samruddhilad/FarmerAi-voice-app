from typing import Optional
from sqlalchemy.orm import Session
from app.auth.models import User


class AuthRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, user_id: str) -> Optional[User]:
        return self.db.query(User).filter(User.id == user_id).first()

    def get_by_mobile(self, mobile: str) -> Optional[User]:
        return self.db.query(User).filter(User.mobile == mobile).first()

    def get_by_email(self, email: str) -> Optional[User]:
        return self.db.query(User).filter(User.email == email).first()

    def create_user(
        self,
        name: str,
        mobile: Optional[str] = None,
        email: Optional[str] = None,
        preferred_language: str = "en"
    ) -> User:
        user = User(
            name=name,
            mobile=mobile,
            email=email,
            preferred_language=preferred_language
        )
        self.db.add(user)
        self.db.commit()
        self.db.refresh(user)
        return user

    def update_user(self, user: User) -> User:
        self.db.commit()
        self.db.refresh(user)
        return user
