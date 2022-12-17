from .db import db, environment, SCHEMA, add_prefix_for_prod
from app.models.members import members

class Group(db.Model):
    __tablename__ = 'groups'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(100), default='https://moodlehub.ca/pluginfile.php/6842/mod_book/chapter/9131/group2.jpg')
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    # Relationships
    group_to_list = db.relationship('List', back_populates='list_to_group', cascade="all, delete")
    group_to_user = db.relationship('User', back_populates='user_who_created_group')

    users = db.relationship(
        "User",
        secondary=members,
        back_populates="groups"
    )


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'image_url': self.image_url,
            'owner_id': self.owner_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }
