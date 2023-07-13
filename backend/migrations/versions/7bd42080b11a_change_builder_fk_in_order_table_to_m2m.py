"""Change builder fk in Order table to m2m

Revision ID: 7bd42080b11a
Revises: 224d572f106b
Create Date: 2023-03-01 12:56:43.970023

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '7bd42080b11a'
down_revision = '224d572f106b'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('builder_order_group',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('order_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['order_id'], ['order.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], )
    )
    op.drop_constraint('order_builder_id_fkey', 'order', type_='foreignkey')
    op.drop_column('order', 'builder_id')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('order', sa.Column('builder_id', sa.INTEGER(), autoincrement=False, nullable=True))
    op.create_foreign_key('order_builder_id_fkey', 'order', 'user', ['builder_id'], ['id'])
    op.drop_table('builder_order_group')
    # ### end Alembic commands ###
