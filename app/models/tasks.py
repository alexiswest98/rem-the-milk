from .db import db, environment, SCHEMA, add_prefix_for_prod

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
    # created_at = db.Column(db.DateTime, server_default=db.func.now())
    # updated_at = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

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
            # 'created_at': self.created_at,
            # 'updated_at': self.updated_at
            # 'task_to_list': self.task_to_list
        }
