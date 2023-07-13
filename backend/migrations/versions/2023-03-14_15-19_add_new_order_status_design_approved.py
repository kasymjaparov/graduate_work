"""Add new Order status - DESIGN_APPROVED

Revision ID: e450b77c0c3e
Revises: 5291ef404119
Create Date: 2023-03-14 15:19:10.542761

"""
from alembic import op
import sqlalchemy as sa

from src.order.enums import Status

# revision identifiers, used by Alembic.
revision = 'e450b77c0c3e'
down_revision = '5291ef404119'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("ALTER TYPE status ADD VALUE 'DESIGN_APPROVED'")
    op.alter_column("order", "status", type_=sa.Enum(Status), nullable=False)


def downgrade() -> None:
    op.alter_column("order", "status", type_=sa.Enum(Status), nullable=False)
    op.execute("ALTER TYPE status DROP VALUE 'DESIGN_APPROVED'")
