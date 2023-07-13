"""add new status for order 'stage_report_attached'

Revision ID: 7d8c021999a9
Revises: 730cffbc0044
Create Date: 2023-05-26 17:26:36.503244

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

from src import Status


# revision identifiers, used by Alembic.
revision = '7d8c021999a9'
down_revision = '730cffbc0044'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.alter_column('order', 'status',
               existing_type=postgresql.ENUM('NEW',
                                             'APPROVED',
                                             'DENIED',
                                             'APPOINTED',
                                             'MEASURE_TIME',
                                             'MEASURE_ATTACHED',
                                             'DESIGN_TIME',
                                             'DESIGN_APPROVED',
                                             'DESIGN_ATTACHED',
                                             'DESIGN_DENIED',
                                             'PREWORK_ATTACHED',
                                             'PREWORK_APPROVED',
                                             'PREWORK_DENIED',
                                             'CONTRACT_ATTACHED',
                                             'CONTRACT_SIGNED',
                                             'CHECK_ATTACHED',
                                             'CHECK_APPROVED',
                                             'CHECK_DECLINED'
                                             'FINISH_DOC_ATTACHED', name='status'),
               nullable=True)
    op.execute("ALTER TYPE status ADD VALUE 'STAGE_REPORT_ATTACHED'")
    op.alter_column("order", "status", type_=sa.Enum(Status), nullable=False)


def downgrade() -> None:
    op.alter_column('order', 'status',
               existing_type=postgresql.ENUM('NEW',
                                             'APPROVED',
                                             'DENIED',
                                             'APPOINTED',
                                             'MEASURE_TIME',
                                             'MEASURE_ATTACHED',
                                             'DESIGN_TIME',
                                             'DESIGN_APPROVED',
                                             'DESIGN_ATTACHED',
                                             'DESIGN_DENIED',
                                             'PREWORK_ATTACHED',
                                             'PREWORK_APPROVED',
                                             'PREWORK_DENIED',
                                             'CONTRACT_ATTACHED',
                                             'CONTRACT_SIGNED',
                                             'CHECK_ATTACHED',
                                             'CHECK_APPROVED',
                                             'CHECK_DECLINED'
                                             'FINISH_DOC_ATTACHED', name='status'),
               nullable=False)
    op.alter_column("order", "status", type_=sa.Enum(Status), nullable=False)
    op.execute("ALTER TYPE status DROP VALUE 'STAGE_REPORT_ATTACHED'")
