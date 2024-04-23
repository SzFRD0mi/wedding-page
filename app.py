from flask import Flask, render_template, request, redirect, g
import sqlite3

app = Flask(__name__)
app.config["DATABASE"] = "C:/xampp/htdocs/projects/cs50x_final_project/databases/submissions.db"

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(app.config['DATABASE'])
    return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

def init_db():
    with app.app_context():
        db = get_db()
        cursor = db.cursor()
        
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='submissions'")
        table_exists = cursor.fetchone()
        
        if not table_exists:
          with app.open_resource("C:/xampp/htdocs/projects/cs50x_final_project/databases/schema.sql", mode="r") as f:
              cursor.executescript(f.read())
          db.commit()

@app.route("/", methods=["GET", "POST"])
def index():
  if request.method == "POST":
    
    name = request.form.get("name").title()

    attend = "yes" if request.form.get("attend-radio") == "yes" else "no"

    allergies = request.form.get("allergies").lower()
    allergies = "no allergies" if allergies == "" else allergies

    partner_name = request.form.get("partner-name").title()
    partner_name = "no partner" if partner_name == "" else partner_name

    partner_allergies = request.form.get("partner-allergies").lower()
    partner_allergies = "no partner allergies" if partner_allergies == "" else partner_allergies

    accommodation = "yes" if request.form.get("accommodation-radio") == "yes" else "no"

    db = get_db()
    cur = db.cursor()

    try:
      if (cur.execute("SELECT * FROM submissions WHERE name=?;", [name])):
        cur.execute("UPDATE submissions SET attend=?, allergies=?, partner_name=?, partner_allergies=?, accommodation=? WHERE name=?", [attend, allergies, partner_name, partner_allergies, accommodation, name])
      else:
         cur.execute("INSERT INTO submissions (name, attend, allergies, partner_name, partner_allergies, accommodation) VALUES (?, ?, ?, ?, ?, ?);", [name, attend, allergies, partner_name, partner_allergies, accommodation])
    except sqlite3.IntegrityError as e:
      error_message = str(e)
      return error_message
        
    db.commit()
    cur.close()
    return redirect("/")
  
  else:
    return render_template("webpage.html")

if __name__ == "__main__":
  init_db()
  app.run(debug=True)


