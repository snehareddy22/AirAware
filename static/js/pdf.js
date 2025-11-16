function downloadPDF() {
    // read dashboard values
    let pm25 = document.getElementById("pm25").innerText;
    let co = document.getElementById("co2").innerText;
    let no2 = document.getElementById("no2").innerText;
    let aqi = document.getElementById("aqi").innerText;
    // send values through URL parameters
    window.location.href = `/download_report?pm25=${pm25}&co=${co}&no2=${no2}&aqi=${aqi}`;
}
