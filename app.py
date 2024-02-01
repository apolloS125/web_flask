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
        name = request.form.get('username')
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

@app.route('/edit')
@login_required
def edit():
    return render_template("profile.html")

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

@app.route('/cards', methods=['POST', 'GET'])
@login_required
def card_create():
    # create card
    if request.method == 'POST':
        data = request.get_json()

        title = data.get('title')
        content = data.get('content')

        new_card = Card(title=title, content=content, user=current_user)
        db.session.add(new_card)
        db.session.commit()
        #print(new_card.id)

        return jsonify({"id": new_card.id,'title':new_card.title,'content':new_card.content})
    elif request.method == 'GET':
        user_cards = Card.query.filter_by(user=current_user).all()
        cards = [{'title': card.title, 'content': card.content, 'id': card.id } for card in user_cards]
        return jsonify(cards)
    else :
        return 'Method not allowed'

@app.route('/cards/<int:id>', methods=['GET', 'PUT', 'DELETE'])
@login_required
def card(id):
    card = Card.query.get_or_404(id)
    #print(request.method , id)
    if request.method == 'GET':
        return jsonify({'title': card.title, 'content': card.content})
    elif request.method == 'PUT':
        data = request.get_json()
        #print(data)
        card.title = data.get('title')
        card.content = data.get('content')

        db.session.commit()
        return jsonify({'message': 'Card updated successfully'})
    elif request.method == 'DELETE':
        db.session.delete(card)
        db.session.commit()
        return jsonify({'message': 'Card deleted successfully'})

@app.route('/update_profile', methods=['PUT'])
@login_required
def update_profile():
    if request.method == 'PUT':
        data = request.form

        new_name = data.get('name')
        new_password = data.get('password')

        # Update name if provided
        if new_name:
            current_user.name = new_name

        # Update password if provided
        if new_password:
            current_user.password = generate_password_hash(new_password)

        db.session.commit()

        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Invalid request method"})

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
