"""All order related models on_delete CASCADE

Revision ID: 5291ef404119
Revises: 732920d506f5
Create Date: 2023-03-14 15:00:10.496800

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '5291ef404119'
down_revision = '732920d506f5'
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint('comment_design_user_id_fkey', 'comment_design', type_='foreignkey')
    op.drop_constraint('comment_design_design_id_fkey', 'comment_design', type_='foreignkey')
    op.create_foreign_key(None, 'comment_design', 'user', ['user_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'comment_design', 'design', ['design_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('design_order_id_fkey', 'design', type_='foreignkey')
    op.drop_constraint('design_user_id_fkey', 'design', type_='foreignkey')
    op.create_foreign_key(None, 'design', 'order', ['order_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'design', 'user', ['user_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('measurement_order_id_fkey', 'measurement', type_='foreignkey')
    op.create_foreign_key(None, 'measurement', 'order', ['order_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('notification_order_id_fkey', 'notification', type_='foreignkey')
    op.drop_constraint('notification_user_id_fkey', 'notification', type_='foreignkey')
    op.create_foreign_key(None, 'notification', 'order', ['order_id'], ['id'], ondelete='CASCADE')
    op.create_foreign_key(None, 'notification', 'user', ['user_id'], ['id'], ondelete='CASCADE')
    op.alter_column('order', 'status',
               existing_type=postgresql.ENUM('NEW', 'APPROVED', 'DENIED', 'APPOINTED', 'MEASURE_TIME', 'MEASURE_ATTACHED', 'DESIGN_TIME', name='status'),
               nullable=True)
    op.drop_constraint('order_signature_order_id_fkey', 'order_signature', type_='foreignkey')
    op.create_foreign_key(None, 'order_signature', 'order', ['order_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('pre_work_doc_order_id_fkey', 'pre_work_doc', type_='foreignkey')
    op.create_foreign_key(None, 'pre_work_doc', 'order', ['order_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('sample_image_design_id_fkey', 'sample_image', type_='foreignkey')
    op.create_foreign_key(None, 'sample_image', 'design', ['design_id'], ['id'], ondelete='CASCADE')
    op.drop_constraint('stage_order_id_fkey', 'stage', type_='foreignkey')
    op.create_foreign_key(None, 'stage', 'order', ['order_id'], ['id'], ondelete='CASCADE')
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_constraint(None, 'stage', type_='foreignkey')
    op.create_foreign_key('stage_order_id_fkey', 'stage', 'order', ['order_id'], ['id'])
    op.drop_constraint(None, 'sample_image', type_='foreignkey')
    op.create_foreign_key('sample_image_design_id_fkey', 'sample_image', 'design', ['design_id'], ['id'])
    op.drop_constraint(None, 'pre_work_doc', type_='foreignkey')
    op.create_foreign_key('pre_work_doc_order_id_fkey', 'pre_work_doc', 'order', ['order_id'], ['id'])
    op.drop_constraint(None, 'order_signature', type_='foreignkey')
    op.create_foreign_key('order_signature_order_id_fkey', 'order_signature', 'order', ['order_id'], ['id'])
    op.alter_column('order', 'status',
               existing_type=postgresql.ENUM('NEW', 'APPROVED', 'DENIED', 'APPOINTED', 'MEASURE_TIME', 'MEASURE_ATTACHED', 'DESIGN_TIME', name='status'),
               nullable=False)
    op.drop_constraint(None, 'notification', type_='foreignkey')
    op.drop_constraint(None, 'notification', type_='foreignkey')
    op.create_foreign_key('notification_user_id_fkey', 'notification', 'user', ['user_id'], ['id'])
    op.create_foreign_key('notification_order_id_fkey', 'notification', 'order', ['order_id'], ['id'])
    op.drop_constraint(None, 'measurement', type_='foreignkey')
    op.create_foreign_key('measurement_order_id_fkey', 'measurement', 'order', ['order_id'], ['id'])
    op.drop_constraint(None, 'design', type_='foreignkey')
    op.drop_constraint(None, 'design', type_='foreignkey')
    op.create_foreign_key('design_user_id_fkey', 'design', 'user', ['user_id'], ['id'])
    op.create_foreign_key('design_order_id_fkey', 'design', 'order', ['order_id'], ['id'])
    op.drop_constraint(None, 'comment_design', type_='foreignkey')
    op.drop_constraint(None, 'comment_design', type_='foreignkey')
    op.create_foreign_key('comment_design_design_id_fkey', 'comment_design', 'design', ['design_id'], ['id'])
    op.create_foreign_key('comment_design_user_id_fkey', 'comment_design', 'user', ['user_id'], ['id'])
    # ### end Alembic commands ###