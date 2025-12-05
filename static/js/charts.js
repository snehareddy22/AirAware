// AirAware - Chart + AQI Prediction JavaScript
// Talks to Flask backend and updates charts + PDF data

// 1. Send location to backend and update dashboard
async function predictAQI() {
    const location = document.getElementById("locationInput").value;

    // Stop if user leaves input empty
    if (!location) {
        alert("Please enter a location!");
        return;
    }

    // Call Flask /predict route
    const response = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: location })
    });

    const data = await response.json();

    // Show current values in the four cards
    document.getElementById("pm25").innerText = data.pm25;
    document.getElementById("co2").innerText = data.co;   
    document.getElementById("no2").innerText = data.no2;
    document.getElementById("aqi").innerText = data.aqi;

    // Store latest values so PDF download can use them
    window.latestAQI = {
        pm25: data.pm25,
        co: data.co,
        no2: data.no2,
        aqi: data.aqi,
        location: location
    };

    // Update last year average box
    document.getElementById("avg-pm25").innerText = `PM2.5: ${data.avg_pm25}`;
    document.getElementById("avg-co2").innerText = `CO₂: ${data.avg_co2}`;
    document.getElementById("avg-no2").innerText = `NO₂: ${data.avg_no2}`;

    // Update line chart data (PM2.5, CO2, NO2 over years)
    lineChart.data.labels = data.chart_years;
    lineChart.data.datasets[0].data = data.chart_pm25;
    lineChart.data.datasets[1].data = data.chart_co2;
    lineChart.data.datasets[2].data = data.chart_no2;
    lineChart.update();

    // Update bar chart data (AQI now, 1 year, 5 years)
    barChart.data.datasets[0].data = data.aqi_bar;
    barChart.update();
}

// 2. Create empty charts when page loads

// Line chart (trend)
const lineCtx = document.getElementById("lineChart");
var lineChart = new Chart(lineCtx, {
    type: "line",
    data: {
        labels: [],   // years will come from backend
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

// Bar chart (AQI comparison)
const barCtx = document.getElementById("barChart");
var barChart = new Chart(barCtx, {
    type: "bar",
    data: {
        labels: ["AQI Now", "1 Year", "5 Years"],
        datasets: [
            {
                label: "AQI Levels",
                data: [],
                borderWidth: 1,
                backgroundColor: "#1bb1e5"
            }
        ]
    }
});
