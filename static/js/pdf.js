function downloadPDF() {
    if (!window.latestAQI) {
        alert("Please generate an AQI prediction first!");
        return;
    }

    const v = window.latestAQI;

    // Build URL query string
    const qs = new URLSearchParams({
        pm25: v.pm25,
        co: v.co,
        no2: v.no2,
        aqi: v.aqi,
        location: v.location || "Unknown"
    });

    // Redirect to backend PDF generator
    window.location.href = "/download_report?" + qs.toString();
}
