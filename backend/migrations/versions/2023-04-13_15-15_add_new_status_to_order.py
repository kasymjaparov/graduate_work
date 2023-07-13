"""add new status to Order

Revision ID: 63a064d8db43
Revises: f33467ce434a
Create Date: 2023-04-13 15:15:19.862629

"""
from alembic import op
import sqlalchemy as sa

from src import Status

# revision identifiers, used by Alembic.
revision = '63a064d8db43'
down_revision = 'f33467ce434a'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("ALTER TYPE status ADD VALUE 'FINISH_DOC_ATTACHED'")
    op.alter_column("order", "status", type_=sa.Enum(Status), nullable=False)


def downgrade() -> None:
    op.alter_column("order", "status", type_=sa.Enum(Status), nullable=False)
    op.execute("ALTER TYPE status DROP VALUE 'FINISH_DOC_ATTACHED'")