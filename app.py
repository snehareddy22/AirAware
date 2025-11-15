
# AirAware - Flask Backend
# Handles routing, dummy prediction API,
# and PDF report generation.


from flask import Flask, render_template, request, jsonify, send_file
from fpdf import FPDF

app = Flask(__name__)



#        PAGE ROUTES
@app.route("/")
def home():
    """Render Home Page"""
    return render_template("home.html")


@app.route("/about")
def about():
    """Render About Page"""
    return render_template("about.html")


@app.route("/contact")
def contact():
    """Render Contact Page"""
    return render_template("contact.html")


@app.route("/dashboard")
def dashboard():
    """Render Dashboard Page"""
    return render_template("dashboard.html")


#     PREDICT API (Dummy)
@app.route("/predict", methods=["POST"])
def predict():
    """Returns dummy predicted AQI values for now"""

    data = request.json
    location = data.get("location", "Unknown")

    # ---------- DUMMY VALUES (Replace with ML later) ----------
    pm25 = 118
    co2 = 415
    no2 = 52
    current_aqi = 165

    avg_pm25 = 120
    avg_co2 = 410
    avg_no2 = 50

    # Chart data
    result = {
        "pm25": pm25,
        "co2": co2,
        "no2": no2,
        "aqi": current_aqi,

        "avg_pm25": avg_pm25,
        "avg_co2": avg_co2,
        "avg_no2": avg_no2,

        "chart_years": ["2019", "2020", "2021", "2022", "2023"],
        "chart_pm25": [90, 110, 120, 130, pm25],
        "chart_co2": [380, 395, 405, 410, co2],
        "chart_no2": [40, 45, 47, 50, no2],

        "aqi_bar": [current_aqi, current_aqi + 10, current_aqi + 20]
    }

    return jsonify(result)


#       PDF DOWNLOAD
@app.route("/download_report")
def download_report():
    """Generate a PDF report with dummy AQI values"""

    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=14)

    # ---------- TITLE ----------
    pdf.cell(200, 10, txt="AirAware - AQI Report", ln=True, align="C")
    pdf.ln(10)

    # ---------- CONTENT ----------
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt="PM2.5: 118", ln=True)
    pdf.cell(200, 10, txt="CO₂: 415", ln=True)
    pdf.cell(200, 10, txt="NO₂: 52", ln=True)
    pdf.cell(200, 10, txt="Predicted AQI: 165", ln=True)

    pdf.ln(10)
    pdf.multi_cell(
        0, 10,
        txt="This is a generated air quality report using the AirAware dashboard.\n"
    )

    # Save file
    pdf.output("aqi_report.pdf")

    return send_file("aqi_report.pdf", as_attachment=True)



#       RUN FLASK APP
if __name__ == "__main__":
    app.run(debug=True)


