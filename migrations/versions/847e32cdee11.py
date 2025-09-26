"""Merge all heads

Revision ID: 847e32cdee11
Revises: a7a96449353e, dc8d9ab5570b, ee12da5bc6d6
Create Date: 2025-09-26 03:53:01.746287

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '847e32cdee11'
down_revision = ('a7a96449353e', 'dc8d9ab5570b', 'ee12da5bc6d6')
branch_labels = None
depends_on = None


def upgrade():
    pass


def downgrade():
    pass
