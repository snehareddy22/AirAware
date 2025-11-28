# ---------------------------------------------------
# AirAware - Full Working Flask Backend
# ML Prediction + Random Inputs + PDF Download
# ---------------------------------------------------

from flask import Flask, render_template, request, jsonify, send_file
import pickle
import numpy as np
from fpdf import FPDF
import re

app = Flask(__name__)

# ---------------------------------------------------
# LOAD ML MODEL
# ---------------------------------------------------
model = pickle.load(open("aqi_model.pkl", "rb"))


# ---------------------------------------------------
# PAGE ROUTES
# ---------------------------------------------------
@app.route("/")
def home():
    return render_template("home.html")

@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/contact")
def contact():
    return render_template("contact.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")


# ---------------------------------------------------
# PREDICT API (WORKING)
# ---------------------------------------------------
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    location = data.get("location", "Unknown")

    # Clean location text
    location_clean = re.sub(r"[^a-zA-Z ]", "", location).title()

    # Fake sensor values
    pm25 = np.random.randint(50, 300)
    co = round(np.random.uniform(5, 15), 2)
    no2 = np.random.randint(20, 60)

    # ML prediction
    x = np.array([[pm25, co, no2]])
    predicted_aqi = model.predict(x)[0]

    # FINAL RESPONSE
    result = {
        "pm25": pm25,
        "co": co,          # VERY IMPORTANT (Frontend uses "co")
        "no2": no2,
        "aqi": int(predicted_aqi),

        "avg_pm25": int(pm25 * 0.85),
        "avg_co2": int(co * 30),
        "avg_no2": int(no2 * 0.9),

        "chart_years": ["2019", "2020", "2021", "2022", "2023"],
        "chart_pm25": [pm25-50, pm25-30, pm25-10, pm25, pm25],
        "chart_co2": [350, 380, 390, 400, 410],
        "chart_no2": [no2-10, no2-5, no2-3, no2-1, no2],

        "aqi_bar": [int(predicted_aqi),
                    int(predicted_aqi)+20,
                    int(predicted_aqi)+40]
    }

    return jsonify(result)


# ---------------------------------------------------
# PDF DOWNLOAD
# ---------------------------------------------------
@app.route("/download_report")
def download_report():

    pm25 = request.args.get("pm25", "--")
    co = request.args.get("co", "--")
    no2 = request.args.get("no2", "--")
    aqi = request.args.get("aqi", "--")

    pdf = FPDF()
    pdf.add_page()

    pdf.set_font("Arial", size=16)
    pdf.cell(200, 10, txt="AirAware - AQI Report", ln=True, align="C")
    pdf.ln(10)

    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt=f"PM2.5 : {pm25}", ln=True)
    pdf.cell(200, 10, txt=f"CO    : {co}", ln=True)
    pdf.cell(200, 10, txt=f"NO2   : {no2}", ln=True)
    pdf.cell(200, 10, txt=f"AQI   : {aqi}", ln=True)

    pdf.ln(10)
    pdf.multi_cell(0, 10,
                   txt="This AQI report was generated using AirAware Dashboard.")

    pdf.output("aqi_report.pdf")
    return send_file("aqi_report.pdf", as_attachment=True)


# ---------------------------------------------------
# RUN APP
# ---------------------------------------------------
if __name__ == "__main__":
    app.run(debug=True)
