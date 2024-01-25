from flask import Flask, render_template, redirect, url_for, request

from . import views
from . import models
from . import acls

app = Flask(__name__)

@app.template_filter("screen_out_word")
def screen_out_word_filter(word: str) -> str:
    for screen in ['ในน้ำมีปลา', 'น้ำจิ้ม']:
        word = word.replace(screen, '*'*len(screen))

    return word

with app.app_context():
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///database.db"
    app.secret_key = "change it when deploy"

    models.init_app(app)
    acls.init_app(app)
    views.init_app(app)