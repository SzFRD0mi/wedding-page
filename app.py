from flask import Flask, render_template, request, redirect

app = Flask(__name__)
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 0

@app.route("/", methods=["GET", "POST"])
def index():
  if request.method == "POST":
    return redirect("webpage.html")
  else:
    print("rendering template")
    return render_template("webpage.html")

if __name__ == "__main__":
  app.run(debug=True)


