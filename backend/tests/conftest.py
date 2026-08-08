import sys
import os
import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session

# Add parent directory to sys.path
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database.base import Base
from app.database.session import get_db
from app.main import app
from app.seed import seed_database

# Use in-memory SQLite database for test suite
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="session", autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    # Run seed script for tests
    db = TestingSessionLocal()
    try:
        from app.schemes.models import SchemeCategory, Scheme, SchemeDocument, SchemeFAQ, SchemeGR, SchemeContact, SchemeEligibilityRule
        from app.auth.models import User

        cat = SchemeCategory(id="cat_horticulture", name="Horticulture", icon="leaf-outline")
        db.add(cat)
        db.commit()

        scheme = Scheme(
            id="test-scheme-1",
            title="Test Scheme Title",
            description="Test scheme description",
            category_id="cat_horticulture",
            type="State",
            amount="Up to 50%",
            overview="Test overview",
            benefits="Test benefits",
            eligibility_criteria="Test criteria",
            how_to_apply="Test how to apply",
            deadline="2026-12-31",
            application_url="https://example.com/apply",
            official_website="https://example.com",
            is_featured=True,
            is_active=True
        )
        db.add(scheme)
        db.flush()

        db.add(SchemeDocument(scheme_id="test-scheme-1", title="Aadhaar Card", description="Identity proof", is_mandatory=True))
        db.add(SchemeFAQ(scheme_id="test-scheme-1", question="What is test?", answer="This is a test."))
        db.add(SchemeGR(scheme_id="test-scheme-1", gr_title="GR 2024", view_url="https://example.com/gr.pdf"))
        db.add(SchemeContact(scheme_id="test-scheme-1", department="Test Dept", phone="1234567890"))
        db.add(SchemeEligibilityRule(scheme_id="test-scheme-1", min_age=18, max_age=70, min_land_size=0.5, max_land_size=10.0, allowed_genders=["all"], allowed_states=["Maharashtra"], allowed_farmer_types=["all"]))

        db.add(User(id="guest_user", name="Farmer", email="farmer@example.com", mobile="9876543210", preferred_language="en"))

        db.commit()
    finally:
        db.close()

    yield

    Base.metadata.drop_all(bind=engine)


@pytest.fixture
def db_session():
    connection = engine.connect()
    transaction = connection.begin()
    session = TestingSessionLocal(bind=connection)

    yield session

    session.close()
    transaction.rollback()
    connection.close()


@pytest.fixture
def client(db_session):
    def _override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = _override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
