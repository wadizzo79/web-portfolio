async function generateWeather(){
    try{
    const weather = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m");
    const data = await weather.json();

    const interfaceDiv = document.getElementById("interface");
    interfaceDiv.innerHTML = `<pre>${JSON.stringify(data.hourly.temperature_2m.slice(0,5), null, 2)}</pre>`
    } catch(error) {
        console.error("Error fetching weather:", error);
    }
}