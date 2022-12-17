from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

db = SQLAlchemy()

# helper function for adding prefix to foreign key column references in production
def add_prefix_for_prod(attr):
    if environment == "production":
        return f"{SCHEMA}.{attr}"
    else:
        return attr



### start here 

###follows
follows = db.Table(
    "follows",
    db.Column("follower_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("followed_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    )

if environment == 'production':
    follows.schema = SCHEMA


###members 
members = db.Table(
    "members",
    db.Column('user_id', db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column('group_id', db.Integer, db.ForeignKey(add_prefix_for_prod("groups.id")), primary_key=True)
)

if environment == "production":
    members.schema = SCHEMA


###users
class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    hashed_password = db.Column(db.String(500), nullable=False)
    image_url = db.Column(db.String(1000), default='https://static.vecteezy.com/system/resources/previews/005/845/877/original/cute-cow-sitting-cartoon-icon-illustration-animal-icon-concept-isolated-premium-flat-cartoon-style-vector.jpg')
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    # Relationships
    # user_to_task = db.relationship('Task', back_populates='task_to_user')
    user_who_created_group = db.relationship('Group', back_populates='group_to_user')
    user_to_list = db.relationship('List', back_populates='list_to_user')

    followers = db.relationship(
        "User",
        secondary=follows,
        primaryjoin=(follows.c.follower_id == id),
        secondaryjoin=(follows.c.followed_id == id),
        backref=db.backref("following", lazy="dynamic"),
        lazy="dynamic"
        )

    #Relationship to join table
    groups = db.relationship(
        "Group",
        secondary=members,
        primaryjoin=(members.c.user_id == id),
        backref=db.backref("users", lazy="dynamic")
        )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'image_url': self.image_url,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }


###groups
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


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'image_url': self.image_url,
            'owner_id': self.owner_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at
        }

###lists
class List(db.Model):
    __tablename__ = 'lists'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    due = db.Column(db.Date, nullable=False)
    notes = db.Column(db.String(1000))
    group_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('groups.id')))
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    list_to_group = db.relationship('Group', back_populates='group_to_list')
    list_to_task = db.relationship('Task', back_populates='task_to_list', cascade="all, delete")
    list_to_user = db.relationship('User', back_populates='user_to_list')

    def to_dict(self):
        return{
            'id':self.id,
            'user_id':self.user_id,
            'name':self.name,
            'due':self.due,
            'notes':self.notes,
            'group_id': self.group_id,
            'completed':self.completed,
            'created_at':self.created_at,
            'updated_at':self.updated_at
        }

####tasks
class Task(db.Model):
    __tablename__ = 'tasks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    #this boolean helps us count how many a user has completed
    list_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('lists.id')))
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    due = db.Column(db.Date, nullable=False)
    notes = db.Column(db.String(1000))
    completed_by = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    # Relationships
    task_to_user = db.relationship('User', foreign_keys=('Task.user_id'))
    task_to_user = db.relationship('User', foreign_keys=('Task.completed_by'))
    task_to_list = db.relationship('List', back_populates='list_to_task')

    def to_dict(self):
        return{
            'id': self.id,
            'name': self.name,
            'list_id': self.list_id,
            'user_id': self.user_id,
            'due': self.due,
            'notes': self.notes,
            'completed_by': self.completed_by,
            'created_at': self.created_at,
            'updated_at': self.updated_at
            # 'task_to_list': self.task_to_list
        }
