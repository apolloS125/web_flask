from flask_wtf import FlaskForm
from wtforms import fields, validators


class MessageForm(FlaskForm):
    message = fields.StringField(
        "Message", validators=[validators.DataRequired(), validators.Length(min=3)]
    )


class GroupForm(FlaskForm):
    name = fields.StringField(
        "Name", validators=[validators.DataRequired(), validators.Length(min=3)]
    )