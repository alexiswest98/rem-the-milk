from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

members = db.Table(
    "members",
    db.Column("user_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("group_id", db.Integer, db.ForeignKey(add_prefix_for_prod("groups.id")))
    )

if environment == 'production':
    members.schema = SCHEMA
