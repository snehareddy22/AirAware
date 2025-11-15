
// AirAware - Chart + AQI Prediction Javascript
// Handles: Sending location to backend, updating UI, and drawing charts




// 1. SEND LOCATION TO BACKEND & UPDATE DASHBOARD
async function predictAQI() {
    const location = document.getElementById("locationInput").value;
    // Prevent empty input
    if (!location) {
        alert("Please enter a location!");
        return;
    }
    // Send POST request to Flask backend
    const response = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: location })
    });
    // Convert response to JSON
    const data = await response.json();
    // ---------------------- UPDATE PRESENT AQI VALUES ----------------------
    document.getElementById("pm25").innerText = data.pm25;
    document.getElementById("co2").innerText = data.co2;
    document.getElementById("no2").innerText = data.no2;
    document.getElementById("aqi").innerText = data.aqi;
    // ---------------------- UPDATE LAST YEAR AVERAGES ----------------------
    document.getElementById("avg-pm25").innerText = `PM2.5: ${data.avg_pm25}`;
    document.getElementById("avg-co2").innerText = `CO₂: ${data.avg_co2}`;
    document.getElementById("avg-no2").innerText = `NO₂: ${data.avg_no2}`;
    // ---------------------- UPDATE LINE CHART ----------------------
    lineChart.data.labels = data.chart_years;
    lineChart.data.datasets[0].data = data.chart_pm25;
    lineChart.data.datasets[1].data = data.chart_co2;
    lineChart.data.datasets[2].data = data.chart_no2;
    lineChart.update();
    // ---------------------- UPDATE BAR CHART ----------------------
    barChart.data.datasets[0].data = data.aqi_bar;
    barChart.update();
}

// 2. INITIAL EMPTY CHARTS (Drawn before prediction)

// ===== Line Chart (PM2.5, CO2, NO2 Trend) =====
const lineCtx = document.getElementById("lineChart");

var lineChart = new Chart(lineCtx, {
    type: "line",
    data: {
        labels: [],  // filled after prediction
        datasets: [
            {
                label: "PM2.5",
                data: [],
                borderWidth: 2,
                borderColor: "#1bb1e5"
            },
            {
                label: "CO₂",
                data: [],
                borderWidth: 2,
                borderColor: "#ff6384"
            },
            {
                label: "NO₂",
                data: [],
                borderWidth: 2,
                borderColor: "#ffcd56"
            }
        ]
    }
});



// ===== Bar Chart (AQI Now vs 1yr vs 5yr) =====
const barCtx = document.getElementById("barChart");

var barChart = new Chart(barCtx, {
    type: "bar",
    data: {
        labels: ["AQI Now", "1 Year", "5 Years"],
        datasets: [
            {
                label: "AQI Levels",
                data: [],     // filled after prediction
                borderWidth: 1,
                backgroundColor: "#1bb1e5"
            }
        ]
    }
});

