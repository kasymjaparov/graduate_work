"""Order alter repair_type field type from str to enum

Revision ID: 85d4ddf1c238
Revises: e450b77c0c3e
Create Date: 2023-03-15 11:14:16.287047

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql
from src.order.enums import RepairTypeEnum
# revision identifiers, used by Alembic.
revision = '85d4ddf1c238'
down_revision = 'e450b77c0c3e'
branch_labels = None
depends_on = None

def upgrade():
    repair_type_enum = sa.Enum(RepairTypeEnum, name='repairtypeenum')
    repair_type_enum.create(op.get_bind())
    op.execute("UPDATE \"order\" SET repair_type = 'CAPITAL' WHERE repair_type IS NULL")
    # Use the USING clause to cast the existing values to the new type
    op.execute('ALTER TABLE "order" ALTER COLUMN repair_type TYPE repairtypeenum using repair_type::repairtypeenum')
    # op.alter_column('order', 'repair_type', type_=sa.Enum(RepairTypeEnum, name='repair_type_enum'), existing_type=sa.String, using='repair_type::repair_type_enum')


def downgrade():
    op.alter_column('order', 'repair_type', type_=sa.String(), existing_type=sa.Enum(RepairTypeEnum, name='repairtypeenum'))

    repair_type_enum = sa.Enum(RepairTypeEnum, name='repairtypeenum')
    repair_type_enum.drop(op.get_bind())
