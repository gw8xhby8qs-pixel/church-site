from flask import Flask, render_template

app = Flask(__name__)


# Главная
@app.route("/index")
def index():
    return render_template("index.html")


# Чтение текстов
@app.route("/analysis")
def analysis():
    return render_template("analysis.html")


# Символизм храма
@app.route("/temple")
def temple():
    return render_template("temple.html")


# Богослужебные книги
@app.route("/books")
def books():
    return render_template("books.html")


# Принадлежности престола
@app.route("/prestol")
def prestol():
    return render_template("prestol.html")


# Облачения
@app.route("/oblachenia")
def oblachenia():
    return render_template("oblachenia.html")


# Иконы
@app.route("/icons")
def icons():
    return render_template("icons.html")

# О проекте
@app.route("/about")
def about():
    return render_template("about.html")


if __name__ == "__main__":
    app.run(debug=True)