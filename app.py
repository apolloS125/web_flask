from flask import Flask, render_template

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def index():
    return render_template("engigear.html")

@app.route('/login')
def login():
    return render_template("Login.html")

@app.route('/register')
def register():
    return render_template("register.html")

if __name__ == '__main__':
    app.debug = True
    app.run()