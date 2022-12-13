from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField, DateField, BooleanField
from wtforms.validators import DataRequired

class CreateTaskForm(FlaskForm):
    name = StringField('Name:', validators=[DataRequired()])
    user_id = IntegerField('User Id:', validators=[DataRequired()])
    list_id =  IntegerField('List Id:')
    due = DateField('Date:', validators=[DataRequired()])
    notes = StringField('Notes (optional):')
    completed_by = IntegerField('Completed?:')
    submit = SubmitField('Submit')  


# class EditTaskForm(FlaskForm):
#     name = StringField('Name:', validators=[DataRequired()])
#     user_id = IntegerField('User Id:', validators=[DataRequired()])
#     due = DateField('Date:', validators=[DataRequired()])
#     notes = StringField('Notes (optional):')
#     completed_by = IntegerField('Completed?:')
