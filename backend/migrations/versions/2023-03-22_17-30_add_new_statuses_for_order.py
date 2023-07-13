"""Add new statuses for Order

Revision ID: a94cb4c0f0b2
Revises: 7bf5a67df070
Create Date: 2023-03-22 17:30:33.558026

"""
from alembic import op
import sqlalchemy as sa

from src import Status

# revision identifiers, used by Alembic.
revision = 'a94cb4c0f0b2'
down_revision = '7bf5a67df070'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("ALTER TYPE status ADD VALUE 'DESIGN_ATTACHED'")
    op.execute("ALTER TYPE status ADD VALUE 'DESIGN_DENIED'")
    op.alter_column("order", "status", type_=sa.Enum(Status), nullable=False)


def downgrade() -> None:
    op.alter_column("order", "status", type_=sa.Enum(Status), nullable=False)
    op.execute("ALTER TYPE status DROP VALUE 'DESIGN_ATTACHED'")
    op.execute("ALTER TYPE status DROP VALUE 'DESIGN_DENIED'")

