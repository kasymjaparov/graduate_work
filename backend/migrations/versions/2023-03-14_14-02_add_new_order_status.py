"""Add new Order status

Revision ID: 732920d506f5
Revises: bd0fd4c0f462
Create Date: 2023-03-14 14:02:29.331948

"""
from alembic import op
import sqlalchemy as sa

from src.order.enums import Status

# revision identifiers, used by Alembic.
revision = '732920d506f5'
down_revision = 'bd0fd4c0f462'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("ALTER TYPE status ADD VALUE 'DESIGN_TIME'")
    op.alter_column("order", "status", type_=sa.Enum(Status), nullable=False)


def downgrade() -> None:
    op.alter_column("order", "status", type_=sa.Enum(Status), nullable=False)
    op.execute("ALTER TYPE status DROP VALUE 'DESIGN_TIME'")
