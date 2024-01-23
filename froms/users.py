from flask_wtf import FlaskForm
from wtforms import fields, validators

class LoginForm(FlaskForm):
    username = fields.StringField(
        "Username", validators=[validators.DataRequired(), validators.Length(min=3)]
    )
    password = fields.PasswordField(
        "Password", validators=[validators.DataRequired(), validators.Length(min=3)]
    )


class RegistrationForm(FlaskForm):
    username = fields.StringField(
        "Username", validators=[validators.DataRequired(), validators.Length(min=3)]
    )
    password = fields.PasswordField(
        "Password", validators=[validators.DataRequired(), validators.Length(min=3)]
    )
    password_confirm = fields.PasswordField(
        "Password Confirm",
        validators=[
            validators.DataRequired(),
            validators.Length(min=3),
            validators.EqualTo("password", message="Passwords must match"),
        ],
    )