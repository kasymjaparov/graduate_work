"""add new status to Order

Revision ID: 8de6512707a5
Revises: 63a064d8db43
Create Date: 2023-04-13 15:26:40.026623

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from src import Status

# revision identifiers, used by Alembic.
revision = '8de6512707a5'
down_revision = '63a064d8db43'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.alter_column('order', 'status',
               existing_type=postgresql.ENUM('NEW', 'APPROVED', 'DENIED', 'APPOINTED', 'MEASURE_TIME', 'MEASURE_ATTACHED', 'DESIGN_TIME', 'DESIGN_APPROVED', 'DESIGN_ATTACHED', 'DESIGN_DENIED', 'PREWORK_ATTACHED', 'PREWORK_APPROVED', 'PREWORK_DENIED', 'CONTRACT_ATTACHED', 'CONTRACT_SIGNED', 'CHECK_ATTACHED', 'CHECK_APPROVED', 'FINISH_DOC_ATTACHED', name='status'),
               nullable=True)
    op.execute("ALTER TYPE status ADD VALUE 'CHECK_DECLINED'")
    op.alter_column("order", "status", type_=sa.Enum(Status), nullable=False)


def downgrade() -> None:
    op.alter_column('order', 'status',
               existing_type=postgresql.ENUM('NEW', 'APPROVED', 'DENIED', 'APPOINTED', 'MEASURE_TIME', 'MEASURE_ATTACHED', 'DESIGN_TIME', 'DESIGN_APPROVED', 'DESIGN_ATTACHED', 'DESIGN_DENIED', 'PREWORK_ATTACHED', 'PREWORK_APPROVED', 'PREWORK_DENIED', 'CONTRACT_ATTACHED', 'CONTRACT_SIGNED', 'CHECK_ATTACHED', 'CHECK_APPROVED', 'FINISH_DOC_ATTACHED', name='status'),
               nullable=False)
    op.alter_column("order", "status", type_=sa.Enum(Status), nullable=False)
    op.execute("ALTER TYPE status DROP VALUE 'CHECK_DECLINED'")

