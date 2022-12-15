from flask_wtf import FlaskForm
from wtforms.fields import (
     StringField, SubmitField, IntegerField
)
from wtforms.validators import DataRequired, URL

class GroupForm(FlaskForm):
    name = StringField("Servers", validators=[DataRequired()])
    image_url = StringField('Group Image')
    owner_id = IntegerField('Owner Id', validators=[DataRequired()])     
    submit = SubmitField("Create Group")
