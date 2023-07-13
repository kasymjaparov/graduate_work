"""enum change status order 2

Revision ID: 96dd6389fb0f
Revises: 87d2f82ad9a1
Create Date: 2023-03-28 10:22:47.679982

"""
from alembic import op
import sqlalchemy as sa

from src import Status

# revision identifiers, used by Alembic.
revision = '96dd6389fb0f'
down_revision = '87d2f82ad9a1'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.execute("ALTER TYPE status ADD VALUE 'CONTRACT_ATTACHED'")
    op.execute("ALTER TYPE status ADD VALUE 'CONTRACT_SIGNED'")
    op.execute("ALTER TYPE status ADD VALUE 'CHECK_ATTACHED'")
    op.execute("ALTER TYPE status ADD VALUE 'CHECK_APPROVED'")
    op.alter_column("order", "status", type_=sa.Enum(Status), nullable=False)


def downgrade() -> None:
    op.alter_column("order", "status", type_=sa.Enum(Status), nullable=False)
    op.execute("ALTER TYPE status DROP VALUE 'CONTRACT_ATTACHED'")
    op.execute("ALTER TYPE status DROP VALUE 'CONTRACT_SIGNED'")
    op.execute("ALTER TYPE status DROP VALUE 'CHECK_ATTACHED'")
    op.execute("ALTER TYPE status DROP VALUE 'CHECK_APPROVED'")
