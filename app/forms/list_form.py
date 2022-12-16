from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, BooleanField, FieldList, FormField, Field, DateField
from wtforms.validators import DataRequired, ValidationError

class ListForm(FlaskForm):
  name = StringField('Name', validators=[DataRequired()])
  user_id = IntegerField('User_id', validators=[DataRequired()])
  due = DateField('Due', validators=[DataRequired()])
  notes = StringField('Notes')
  group_id = IntegerField('Group_id')
  completed = BooleanField('Completed')
