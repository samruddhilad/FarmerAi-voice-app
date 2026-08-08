"""Initial Schema

Revision ID: 001_initial_schema
Revises: 
Create Date: 2026-08-08 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '001_initial_schema'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Users table
    op.create_table(
        'users',
        sa.Column('id', sa.String(), nullable=False, primary_key=True),
        sa.Column('name', sa.String(), nullable=False),
        sa.Column('email', sa.String(), nullable=True, unique=True),
        sa.Column('mobile', sa.String(), nullable=True, unique=True),
        sa.Column('preferred_language', sa.String(), nullable=True, server_default='en'),
        sa.Column('avatar_url', sa.String(), nullable=True),
        sa.Column('state', sa.String(), nullable=True),
        sa.Column('district', sa.String(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True)
    )

    # Scheme Categories table
    op.create_table(
        'scheme_categories',
        sa.Column('id', sa.String(), nullable=False, primary_key=True),
        sa.Column('name', sa.String(), nullable=False, unique=True),
        sa.Column('icon', sa.String(), nullable=True)
    )

    # Schemes table
    op.create_table(
        'schemes',
        sa.Column('id', sa.String(), nullable=False, primary_key=True),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('description', sa.Text(), nullable=False),
        sa.Column('category_id', sa.String(), sa.ForeignKey('scheme_categories.id'), nullable=False),
        sa.Column('type', sa.String(), nullable=False, server_default='State'),
        sa.Column('amount', sa.String(), nullable=True),
        sa.Column('overview', sa.Text(), nullable=True),
        sa.Column('benefits', sa.Text(), nullable=True),
        sa.Column('eligibility_criteria', sa.Text(), nullable=True),
        sa.Column('how_to_apply', sa.Text(), nullable=True),
        sa.Column('deadline', sa.String(), nullable=True),
        sa.Column('application_url', sa.String(), nullable=True),
        sa.Column('official_website', sa.String(), nullable=True),
        sa.Column('is_featured', sa.Boolean(), server_default='false'),
        sa.Column('is_active', sa.Boolean(), server_default='true'),
        sa.Column('created_at', sa.DateTime(), nullable=True),
        sa.Column('updated_at', sa.DateTime(), nullable=True)
    )

    # Scheme Documents table
    op.create_table(
        'scheme_documents',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False, primary_key=True),
        sa.Column('scheme_id', sa.String(), sa.ForeignKey('schemes.id', ondelete='CASCADE'), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('is_mandatory', sa.Boolean(), server_default='true')
    )

    # Scheme FAQs table
    op.create_table(
        'scheme_faqs',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False, primary_key=True),
        sa.Column('scheme_id', sa.String(), sa.ForeignKey('schemes.id', ondelete='CASCADE'), nullable=False),
        sa.Column('question', sa.Text(), nullable=False),
        sa.Column('answer', sa.Text(), nullable=False)
    )

    # Scheme GR table
    op.create_table(
        'scheme_grs',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False, primary_key=True),
        sa.Column('scheme_id', sa.String(), sa.ForeignKey('schemes.id', ondelete='CASCADE'), nullable=False),
        sa.Column('gr_title', sa.String(), nullable=False),
        sa.Column('gr_number', sa.String(), nullable=True),
        sa.Column('gr_date', sa.String(), nullable=True),
        sa.Column('view_url', sa.String(), nullable=False),
        sa.Column('download_url', sa.String(), nullable=True)
    )

    # Scheme Contacts table
    op.create_table(
        'scheme_contacts',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False, primary_key=True),
        sa.Column('scheme_id', sa.String(), sa.ForeignKey('schemes.id', ondelete='CASCADE'), nullable=False),
        sa.Column('department', sa.String(), nullable=True),
        sa.Column('office', sa.String(), nullable=True),
        sa.Column('address', sa.Text(), nullable=True),
        sa.Column('phone', sa.String(), nullable=True),
        sa.Column('email', sa.String(), nullable=True),
        sa.Column('website', sa.String(), nullable=True)
    )

    # Scheme Eligibility Rules table
    op.create_table(
        'scheme_eligibility_rules',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False, primary_key=True),
        sa.Column('scheme_id', sa.String(), sa.ForeignKey('schemes.id', ondelete='CASCADE'), nullable=False),
        sa.Column('min_age', sa.Integer(), nullable=True),
        sa.Column('max_age', sa.Integer(), nullable=True),
        sa.Column('min_land_size', sa.Float(), nullable=True),
        sa.Column('max_land_size', sa.Float(), nullable=True),
        sa.Column('allowed_genders', sa.JSON(), nullable=True),
        sa.Column('allowed_states', sa.JSON(), nullable=True),
        sa.Column('allowed_farmer_types', sa.JSON(), nullable=True)
    )


def downgrade() -> None:
    op.drop_table('scheme_eligibility_rules')
    op.drop_table('scheme_contacts')
    op.drop_table('scheme_grs')
    op.drop_table('scheme_faqs')
    op.drop_table('scheme_documents')
    op.drop_table('schemes')
    op.drop_table('scheme_categories')
    op.drop_table('users')
