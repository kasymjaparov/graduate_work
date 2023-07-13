"""Add new status MEASURE_ATTACHED for Order model

Revision ID: 180281c6783e
Revises: 55eaf7fff8e1
Create Date: 2023-03-14 12:14:30.617979

"""
from alembic import op
import sqlalchemy as sa

from src.order.enums import Status

# revision identifiers, used by Alembic.
revision = '180281c6783e'
down_revision = '55eaf7fff8e1'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("ALTER TYPE status ADD VALUE 'MEASURE_ATTACHED'")
    op.alter_column("order", "status", type_=sa.Enum(Status), nullable=False)


def downgrade() -> None:
    op.alter_column("order", "status", type_=sa.Enum(Status), nullable=False)
    op.execute("ALTER TYPE status DROP VALUE 'MEASURE_ATTACHED'")
