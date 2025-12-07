
// Predict AQI using backend

async function predictAQI() {

    const location = document.getElementById("locationInput").value.trim();

    if (!location) {
        alert("Please enter a city name");
        return;
    }

    // Send request to backend
    const response = await fetch("/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location })
    });

    const data = await response.json();

    // Update main values in UI
    document.getElementById("pm25").innerText = data.pm25;
    document.getElementById("co2").innerText = data.co;   
    document.getElementById("no2").innerText = data.no2;
    document.getElementById("aqi").innerText = data.aqi;

    // Save for PDF download
    window.latestAQI = {
        pm25: data.pm25,
        co: data.co,
        no2: data.no2,
        aqi: data.aqi,
        location: location
    };

    // Update average values
    document.getElementById("avg-pm25").innerText = `PM2.5: ${data.avg_pm25}`;
    document.getElementById("avg-co2").innerText = `CO₂: ${data.avg_co2}`;
    document.getElementById("avg-no2").innerText = `NO₂: ${data.avg_no2}`;

    // Update line chart
    lineChart.data.labels = data.chart_years;
    lineChart.data.datasets[0].data = data.chart_pm25;
    lineChart.data.datasets[1].data = data.chart_co2;
    lineChart.data.datasets[2].data = data.chart_no2;
    lineChart.update();

    // Update bar chart
    barChart.data.datasets[0].data = data.aqi_bar;
    barChart.update();
}



// Dark mode toggle

const darkBtn = document.getElementById("darkModeBtn");

darkBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        darkBtn.textContent = "☀️";
        localStorage.setItem("mode", "dark");
    } else {
        darkBtn.textContent = "🌙";
        localStorage.setItem("mode", "light");
    }
});

// Keep mode after refresh
if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
    darkBtn.textContent = "☀️";
}

