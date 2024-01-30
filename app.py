from flask import Flask, render_template, request, redirect, url_for, flash, get_flashed_messages, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, User, Card
from flask_login import LoginManager, login_user, login_required, logout_user, current_user

app = Flask(__name__, static_folder='static', template_folder='templates')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SECRET_KEY'] = 'your_secret_key_here'
login_manager = LoginManager(app)
login_manager.login_view = 'login'
login_manager.init_app(app)

db.init_app(app)

@app.route('/')
def engigear():
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
            return redirect(url_for('blog'))
        else:
            flash('Invalid username or password', 'error')  
            return redirect(url_for('login'))
    flash_messages = list(get_flashed_messages())
    return render_template('Login_card.html', flashed_messages=flash_messages)

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('engigear'))

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

@app.route('/blog')
@login_required
def blog():
    return render_template("test.html")

@app.route('/admin')
def manage():
    return 'Test route'

@app.route('/save_card', methods=['POST'])
@login_required
def save_card():
    data = request.get_json()

    title = data.get('title')
    content = data.get('content')

    new_card = Card(title=title, content=content, user=current_user)
    db.session.add(new_card)
    db.session.commit()

    return jsonify({"message": "Card saved successfully"})

@app.route('/load_user_cards', methods=['GET'])
@login_required
def load_user_cards():
    user_cards = Card.query.filter_by(user=current_user).all()
    cards = [{'title': card.title, 'content': card.content} for card in user_cards]
    return jsonify(cards)

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
