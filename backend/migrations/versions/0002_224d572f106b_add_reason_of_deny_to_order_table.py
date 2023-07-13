"""Add reason_of_deny to Order table

Revision ID: 224d572f106b
Revises: 8b171dbe6695
Create Date: 2023-02-28 14:59:33.452442

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '224d572f106b'
down_revision = '8b171dbe6695'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('order', sa.Column('reason_of_deny', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('order', 'reason_of_deny')
    # ### end Alembic commands ###
