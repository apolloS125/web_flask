from flask import Flask, render_template, request, redirect, url_for,flash, get_flashed_messages
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User
from flask_login import LoginManager, login_user, login_required, logout_user,current_user

app = Flask(__name__, static_folder='static', template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'your_secret_key_here'
login_manager = LoginManager(app)
login_manager.login_view = 'login' 
login_manager.init_app(app)

db.init_app(app)

@app.route('/')
def index():
    return render_template("engigear.html")


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password, password):
            login_user(user)
            return redirect(url_for('index'))
        else:
            flash('Invalid username or password', 'error')  
            return redirect(url_for('login'))
    flash_messages = list(get_flashed_messages())
    return render_template('Login.html', flashed_messages=flash_messages)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        # รับข้อมูลจากฟอร์ม
        name = request.form.get('name')
        username = request.form.get('username')
        password = request.form.get('password')

        # Ensure username is not empty
        if not username:
            flash('Username is required', 'error')
            return redirect(url_for('register'))

        user_exists = User.query.filter_by(username=username).first()
        if user_exists:
            return 'Username already exists'

        hashed_password = generate_password_hash(password)
        new_user = User(username=username, name=name, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return redirect(url_for('login'))
    return render_template('register.html')

#@app.route('/blog')
#def blog():
    return render_template("blog.html")

if __name__ =="__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)