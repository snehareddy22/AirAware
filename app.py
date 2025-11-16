# ---------------------------------------------------
# AirAware - Flask Backend
# Handles: Routing, ML Prediction, and PDF download
# ---------------------------------------------------

from flask import Flask, render_template, request, jsonify, send_file
import pickle
import numpy as np
from fpdf import FPDF
import re

app = Flask(__name__)
'''
# ---------------------------------------------------
# LOAD MACHINE LEARNING MODEL (aqi_model.pkl)
# ---------------------------------------------------
# This model predicts AQI based on PM2.5, CO, and NO2.
model = pickle.load(open("aqi_model.pkl", "rb"))
'''

# ---------------------------------------------------
# PAGE ROUTES (Render HTML pages)
# ---------------------------------------------------

@app.route("/")
def home():
    """Shows Home Page"""
    return render_template("home.html")

@app.route("/about")
def about():
    """Shows About Page"""
    return render_template("about.html")

@app.route("/contact")
def contact():
    """Shows Contact Page"""
    return render_template("contact.html")

@app.route("/dashboard")
def dashboard():
    """Shows Dashboard Page"""
    return render_template("dashboard.html")

'''
# ---------------------------------------------------
# AQI PREDICTION API
# Called by JavaScript when user enters a location
# ---------------------------------------------------

@app.route("/predict", methods=["POST"])
def predict():
    """Receives location → generates fake readings → predicts AQI using ML"""

    data = request.json
    location = data.get("location", "Unknown")

    # Clean user text (keep only letters)
    location_clean = re.sub(r"[^a-zA-Z ]", "", location).title()

    # ---------------------------
    # Fake sensor-like values
    # (Later you can replace with real sensor API)
    # ---------------------------
    pm25 = np.random.randint(50, 300)
    co = round(np.random.uniform(5, 15), 2)
    no2 = np.random.randint(20, 60)
 
    # ---------------------------
    # ML Prediction
    # ---------------------------
    input_values = np.array([[pm25, co, no2]])
    predicted_aqi = model.predict(input_values)[0]

    # ---------------------------
    # Response JSON for frontend
    # ---------------------------
    response = {
        "pm25": pm25,
        "co": co,
        "no2": no2,
        "aqi": int(predicted_aqi),

        # averages
        "avg_pm25": int(pm25 * 0.85),
        "avg_co2": int(co * 30),
        "avg_no2": int(no2 * 0.9),

        # line chart values
        "chart_years": ["2019", "2020", "2021", "2022", "2023"],
        "chart_pm25": [pm25-50, pm25-30, pm25-10, pm25-5, pm25],
        "chart_co2": [350, 380, 390, 400, 410],
        "chart_no2": [no2-15, no2-10, no2-5, no2-2, no2],

        # bar chart values
        "aqi_bar": [
            int(predicted_aqi),
            int(predicted_aqi) + 20,
            int(predicted_aqi) + 40
        ]
    }

    return jsonify(response)


# ---------------------------------------------------
# PDF DOWNLOAD ROUTE
# Generates report based on values from dashboard
# ---------------------------------------------------

@app.route("/download_report")
def download_report():
    """Generates and downloads AQI PDF report"""

    # Get values passed through URL query parameters
    pm25 = request.args.get("pm25", "--")
    co = request.args.get("co", "--")
    no2 = request.args.get("no2", "--")
    aqi = request.args.get("aqi", "--")

    # Create PDF
    pdf = FPDF()
    pdf.add_page()

    pdf.set_font("Arial", size=16)
    pdf.cell(200, 10, txt="AirAware - AQI Report", ln=True, align="C")
    pdf.ln(10)

    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt=f"PM2.5 : {pm25}", ln=True)
    pdf.cell(200, 10, txt=f"CO    : {co}", ln=True)
    pdf.cell(200, 10, txt=f"NO₂   : {no2}", ln=True)
    pdf.cell(200, 10, txt=f"AQI   : {aqi}", ln=True)

    pdf.ln(10)
    pdf.multi_cell(0, 10,
        txt="This report was generated using AirAware AQI Dashboard."
    )

    # Save PDF
    pdf.output("aqi_report.pdf")

    # Send file to user
    return send_file("aqi_report.pdf", as_attachment=True)
'''

# ---------------------------------------------------
# RUN FLASK SERVER
# ---------------------------------------------------

if __name__ == "__main__":
    app.run(debug=True)

