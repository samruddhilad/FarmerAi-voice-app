import sys
import os
from datetime import datetime, timezone

# Ensure app package can be imported when executing seed.py directly
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.database.session import SessionLocal, engine
from app.database.base import Base
from app.schemes.models import (
    SchemeCategory,
    Scheme,
    SchemeDocument,
    SchemeFAQ,
    SchemeGR,
    SchemeContact,
    SchemeEligibilityRule
)
from app.auth.models import User


def seed_database():
    print("Creating database tables...")
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    try:
        print("Seeding Scheme Categories...")
        categories_data = [
            {"id": "cat_horticulture", "name": "Horticulture", "icon": "leaf-outline"},
            {"id": "cat_tribal", "name": "Tribal Development", "icon": "people-outline"},
            {"id": "cat_agro", "name": "Agro Processing", "icon": "construct-outline"},
            {"id": "cat_irrigation", "name": "Irrigation", "icon": "water-outline"},
            {"id": "cat_welfare", "name": "Farmer Welfare", "icon": "heart-outline"},
            {"id": "cat_safety", "name": "Safety & Welfare", "icon": "shield-checkmark-outline"},
            {"id": "cat_crop", "name": "Crop Development", "icon": "nutrition-outline"},
            {"id": "cat_rainfed", "name": "Rainfed Development", "icon": "cloud-rain-outline"},
            {"id": "cat_mech", "name": "Mechanization", "icon": "cog-outline"},
        ]

        for cat in categories_data:
            existing = db.query(SchemeCategory).filter(SchemeCategory.id == cat["id"]).first()
            if not existing:
                db.add(SchemeCategory(**cat))
        db.commit()

        print("Seeding WCD Jalgaon / Maharashtra Seed Schemes...")

        schemes_seed = [
            {
                "id": "bhausaheb-fundkar-falbag-lagvad-yojana",
                "title": "Bhausaheb Fundkar Falbag Lagvad Yojana",
                "description": "Subsidy support for orchard plantation and long-term horticulture crops across Maharashtra.",
                "category_id": "cat_horticulture",
                "type": "State",
                "amount": "Up to 100% subsidy (50% year 1, 30% year 2, 20% year 3)",
                "overview": "Bhausaheb Fundkar Falbag Lagvad Yojana encourages farmers in Maharashtra to establish fruit orchards like mango, pomegranate, guava, orange, cashew, and sapota. The scheme provides financial assistance over 3 years for drip irrigation, saplings, plant protection, and maintenance.",
                "benefits": "Financial subsidy up to ₹1,00,000 per hectare spread across 3 years. Includes cost of saplings, pit digging, drip setup, and organic fertilizers.",
                "eligibility_criteria": "Farmers owning land in Maharashtra (7/12 & 8A extracts mandatory). Maximum 2 hectares per farmer eligible. Must have permanent water source or micro-irrigation facility.",
                "how_to_apply": "1. Visit MahaDBT Farmer Portal (mahadbt.maharashtra.gov.in)\n2. Register using Aadhaar and mobile number.\n3. Select Horticulture Department -> Falbag Lagvad Yojana.\n4. Upload 7/12 extract and site map.\n5. Submit application for approval by District Agriculture Officer.",
                "deadline": "2026-12-31",
                "application_url": "https://mahadbt.maharashtra.gov.in",
                "official_website": "https://krishi.maharashtra.gov.in",
                "is_featured": True,
                "documents": [
                    {"title": "Land Ownership 7/12 & 8A Extract", "description": "Issued within last 3 months", "is_mandatory": True},
                    {"title": "Aadhaar Card Copy", "description": "Linked with bank account", "is_mandatory": True},
                    {"title": "Bank Passbook Copy", "description": "Showing IFSC code and account number", "is_mandatory": True},
                    {"title": "Water Availability Self-Declaration", "description": "Stating well/canal/micro-irrigation source", "is_mandatory": False}
                ],
                "faqs": [
                    {"question": "What is the maximum land limit eligible for subsidy?", "answer": "Farmers can claim subsidy for up to 2 hectares of fruit orchard plantation."},
                    {"question": "How is the subsidy disbursed?", "answer": "The subsidy is directly credited to the beneficiary farmer's DBT bank account in 3 annual installments."}
                ],
                "gr": {
                    "gr_title": "Bhausaheb Fundkar Falbag Lagvad Sanction Order 2023",
                    "gr_number": "GR-HORT-2023/CR-142/AGRI-4",
                    "gr_date": "2023-05-18",
                    "view_url": "https://krishi.maharashtra.gov.in/pdf/falbag_gr_2023.pdf",
                    "download_url": "https://krishi.maharashtra.gov.in/pdf/falbag_gr_2023.pdf"
                },
                "contact": {
                    "department": "Department of Agriculture & WCD Jalgaon",
                    "office": "District Superintending Agriculture Office, Jalgaon",
                    "address": "Near Collectorate Complex, Court Road, Jalgaon, Maharashtra 425001",
                    "phone": "0257-2220415",
                    "email": "saojalgaon@gmail.com",
                    "website": "https://wcdjalgaon.com"
                },
                "rules": {
                    "min_age": 18,
                    "max_age": 75,
                    "min_land_size": 0.2,
                    "max_land_size": 10.0,
                    "allowed_genders": ["all"],
                    "allowed_states": ["Maharashtra"],
                    "allowed_farmer_types": ["all"]
                }
            },
            {
                "id": "chief-minister-sustainable-agriculture-irrigation-scheme",
                "title": "Chief Minister Sustainable Agriculture Irrigation Scheme",
                "description": "Promotes efficient water use through micro-irrigation, drip systems, and farm ponds in Maharashtra.",
                "category_id": "cat_irrigation",
                "type": "State",
                "amount": "Up to 55% subsidy for general and 60% for SC/ST farmers",
                "overview": "The Chief Minister Sustainable Agriculture Irrigation Scheme is designed to safeguard crops against drought by promoting micro-irrigation systems, drip/sprinkler equipment, and farm pond lining in water-scarce districts like Jalgaon and Solapur.",
                "benefits": "Capital subsidy on drip irrigation kits, sprinkler sets, electric motor pumps, and farm pond PVC plastic lining installation.",
                "eligibility_criteria": "Resident farmers of Maharashtra with registered agricultural land and an active electricity/water connection.",
                "how_to_apply": "Apply through MahaDBT online portal under Agriculture Mechanical & Irrigation category.",
                "deadline": "2026-11-30",
                "application_url": "https://mahadbt.maharashtra.gov.in",
                "official_website": "https://krishi.maharashtra.gov.in",
                "is_featured": True,
                "documents": [
                    {"title": "7/12 Land Record Extract", "description": "Current fiscal year record", "is_mandatory": True},
                    {"title": "Aadhaar Card", "description": "Identity verification", "is_mandatory": True},
                    {"title": "Electricity Bill / Pump Connection Receipt", "description": "Proof of power source", "is_mandatory": True}
                ],
                "faqs": [
                    {"question": "Can I apply if I already have a drip system?", "answer": "Subsidy is valid for new installations or replacement of systems older than 7 years."}
                ],
                "gr": {
                    "gr_title": "CM Irrigation Scheme Guidelines 2024",
                    "gr_number": "GR-IRR-2024/CR-88/AGRI-2",
                    "gr_date": "2024-01-10",
                    "view_url": "https://krishi.maharashtra.gov.in/pdf/irrigation_2024.pdf",
                    "download_url": "https://krishi.maharashtra.gov.in/pdf/irrigation_2024.pdf"
                },
                "contact": {
                    "department": "Irrigation & Agriculture Department",
                    "office": "Sub-Divisional Agriculture Office, Jalgaon",
                    "address": "Station Road, Jalgaon, Maharashtra 425001",
                    "phone": "0257-2234100",
                    "email": "sdao_jalgaon@maharashtra.gov.in",
                    "website": "https://wcdjalgaon.com"
                },
                "rules": {
                    "min_age": 18,
                    "max_age": 80,
                    "min_land_size": 0.1,
                    "max_land_size": 20.0,
                    "allowed_genders": ["all"],
                    "allowed_states": ["Maharashtra"],
                    "allowed_farmer_types": ["all"]
                }
            },
            {
                "id": "sub-mission-on-agricultural-mechanization-css",
                "title": "Sub-Mission on Agricultural Mechanization (SMAM) - CSS",
                "description": "Central scheme to promote farm machinery, custom hiring centres, and power tillers.",
                "category_id": "cat_mech",
                "type": "Central",
                "amount": "50% to 80% subsidy depending on equipment type",
                "overview": "Sub-Mission on Agricultural Mechanization (SMAM) aims to increase reach of farm mechanization to small and marginal farmers by supporting purchase of tractors, rotavators, harvesters, and setting up Custom Hiring Centres (CHC).",
                "benefits": "Subsidized farm equipment purchase, reduced cost of farming operations, and employment generation through Custom Hiring Centres.",
                "eligibility_criteria": "Farmers, Farmer Producer Organizations (FPOs), Self Help Groups (SHGs), and agri-entrepreneurs across India.",
                "how_to_apply": "Register on Central FARMMACHINERY Portal (agrimachinery.nic.in) or state MahaDBT portal.",
                "deadline": "2026-10-15",
                "application_url": "https://agrimachinery.nic.in",
                "official_website": "https://agrimachinery.nic.in",
                "is_featured": True,
                "documents": [
                    {"title": "Aadhaar Card", "description": "Identity proof", "is_mandatory": True},
                    {"title": "Land Ownership Document", "description": "7/12 or state equivalent", "is_mandatory": True},
                    {"title": "Caste Certificate", "description": "Required for SC/ST higher subsidy benefits", "is_mandatory": False}
                ],
                "faqs": [
                    {"question": "What is Custom Hiring Centre (CHC)?", "answer": "CHC is a machinery pool where small farmers can hire high-cost machinery at subsidized hourly rates."}
                ],
                "gr": {
                    "gr_title": "SMAM Central Guidelines 2023-24",
                    "gr_number": "GR-SMAM-2023/11092",
                    "gr_date": "2023-08-01",
                    "view_url": "https://agrimachinery.nic.in/guidelines.pdf",
                    "download_url": "https://agrimachinery.nic.in/guidelines.pdf"
                },
                "contact": {
                    "department": "Ministry of Agriculture & Farmers Welfare",
                    "office": "District Agricultural Engineering Wing, Jalgaon",
                    "address": "Agri Office Complex, Near Collectorate, Jalgaon",
                    "phone": "0257-2225566",
                    "email": "agriengg_jalgaon@gov.in",
                    "website": "https://agrimachinery.nic.in"
                },
                "rules": {
                    "min_age": 18,
                    "max_age": 70,
                    "min_land_size": 0.0,
                    "max_land_size": 50.0,
                    "allowed_genders": ["all"],
                    "allowed_states": ["all"],
                    "allowed_farmer_types": ["all"]
                }
            },
            {
                "id": "gopinath-munde-shetkari-apghat-suraksha-anudan-yojana",
                "title": "Gopinath Munde Shetkari Apghat Suraksha Sanugrah Anudan Yojana",
                "description": "Accident insurance relief and financial compensation for farmers and family members in Maharashtra.",
                "category_id": "cat_safety",
                "type": "State",
                "amount": "Up to ₹2,00,000 in case of death or total disability",
                "overview": "Provides financial security to registered farmers in Maharashtra aged 10 to 75 in case of accidental death, snake bite, electrical shock, tractor accident, or permanent physical disability.",
                "benefits": "₹2,00,000 for accidental death or loss of two limbs/eyes; ₹1,00,000 for loss of one limb/eye.",
                "eligibility_criteria": "All landholding registered farmers and family members listed on 7/12 extract between age 10 and 75.",
                "how_to_apply": "Submit physical application form to Taluka Agriculture Officer within 90 days of accident along with FIR and medical report.",
                "deadline": "Continuous Scheme",
                "application_url": "https://krishi.maharashtra.gov.in",
                "official_website": "https://krishi.maharashtra.gov.in",
                "is_featured": False,
                "documents": [
                    {"title": "Police FIR / Panchanama Copy", "description": "Police report of accident", "is_mandatory": True},
                    {"title": "Post Mortem / Medical Officer Certificate", "description": "Hospital medical report", "is_mandatory": True},
                    {"title": "7/12 Extract of Deceased / Injured Farmer", "description": "Land proof", "is_mandatory": True}
                ],
                "faqs": [
                    {"question": "What is the time limit for submitting claims?", "answer": "Claim must be submitted within 90 days of the date of accident."}
                ],
                "gr": {
                    "gr_title": "Shetkari Apghat Suraksha GR 2022",
                    "gr_number": "GR-APGHAT-2022/CR-45/AGRI-3",
                    "gr_date": "2022-09-12",
                    "view_url": "https://krishi.maharashtra.gov.in/pdf/apghat_2022.pdf",
                    "download_url": "https://krishi.maharashtra.gov.in/pdf/apghat_2022.pdf"
                },
                "contact": {
                    "department": "Agriculture & WCD Jalgaon",
                    "office": "Taluka Agriculture Office Jalgaon",
                    "address": "Tehsil Office Campus, Jalgaon",
                    "phone": "0257-2223344",
                    "email": "tao_jalgaon@maharashtra.gov.in",
                    "website": "https://wcdjalgaon.com"
                },
                "rules": {
                    "min_age": 10,
                    "max_age": 75,
                    "min_land_size": 0.01,
                    "max_land_size": 100.0,
                    "allowed_genders": ["all"],
                    "allowed_states": ["Maharashtra"],
                    "allowed_farmer_types": ["all"]
                }
            }
        ]

        for s_data in schemes_seed:
            existing = db.query(Scheme).filter(Scheme.id == s_data["id"]).first()
            if not existing:
                scheme = Scheme(
                    id=s_data["id"],
                    title=s_data["title"],
                    description=s_data["description"],
                    category_id=s_data["category_id"],
                    type=s_data["type"],
                    amount=s_data["amount"],
                    overview=s_data["overview"],
                    benefits=s_data["benefits"],
                    eligibility_criteria=s_data["eligibility_criteria"],
                    how_to_apply=s_data["how_to_apply"],
                    deadline=s_data["deadline"],
                    application_url=s_data["application_url"],
                    official_website=s_data["official_website"],
                    is_featured=s_data["is_featured"],
                    is_active=True
                )
                db.add(scheme)
                db.flush()

                # Add Documents
                for doc in s_data.get("documents", []):
                    db.add(SchemeDocument(scheme_id=scheme.id, **doc))

                # Add FAQs
                for faq in s_data.get("faqs", []):
                    db.add(SchemeFAQ(scheme_id=scheme.id, **faq))

                # Add GR
                if s_data.get("gr"):
                    db.add(SchemeGR(scheme_id=scheme.id, **s_data["gr"]))

                # Add Contact
                if s_data.get("contact"):
                    db.add(SchemeContact(scheme_id=scheme.id, **s_data["contact"]))

                # Add Eligibility Rules
                if s_data.get("rules"):
                    db.add(SchemeEligibilityRule(scheme_id=scheme.id, **s_data["rules"]))

        db.commit()

        # Seed Guest / Default User
        guest_user = db.query(User).filter(User.id == "guest_user").first()
        if not guest_user:
            db.add(User(
                id="guest_user",
                name="Farmer",
                email="farmer@example.com",
                mobile="9876543210",
                preferred_language="en",
                state="Maharashtra",
                district="Jalgaon"
            ))
            db.commit()

        print("Database successfully seeded!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
        raise e
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()
