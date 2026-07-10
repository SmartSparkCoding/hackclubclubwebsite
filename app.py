from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/showcase')
def showcase():
    return render_template('showcase.html')

@app.route('/leadership')
def leadership():
    return render_template('leadership.html')

@app.route('/socsGuide')
def socsGuide():
    return render_template('socsGuide.html')

@app.route('/about')
def about():
    return render_template('about.html')

if __name__ == '__main__':
    app.run(debug=True)