document.getElementById("weather-form").addEventListener("submit", function(event){
    event.preventDefault();
    const location = document.getElementById("location").value;

    document.getElementById("loading").style.display = "block";
    document.getElementById("weather-info").style.display = "none";

    fetchWeatherData(location)
    .then(processWeatherData)
    .then(displayWeather)
    .catch((error) =>{
        console.error("Error:", error);
        document.getElementById("loading").style,display = "none";
    });
});

function fetchWeatherData(location){
    const apiKey = "N54MADG2BVLA2AGV5KPTMXTBR";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=us&key=${apiKey}&contentType=json`;

    return fetch(url)
    .then((response) =>{
        if(!response.ok){
            console.error("API Response Error:", response.status, response.statusText);
            throw new Error(`Network response failed with status ${response.status}`);
        }
        return response.json();
    })
    .then((data) =>{
        console.log("API Response Data:", data);
        if(!data.days || data.days.length === 0){
            throw new Error("Weather data for the specified location is missing");
        }
        return data;
    })
    .catch((error) =>{
        console.error("Caught Error:", error);
        throw error;
    });
}

function processWeatherData(data){
const weather = {
    name: data.resolvedAddress,
    temperature: data.currentConditions.temp,
    condition: data.currentConditions.conditions,
};

console.log("Process Weather Object:", weather);
return weather;
}

function displayWeather(weather){
    document.getElementById("loading").style.display = "none";
    document.getElementById("weather-info").style.display = "block";

    document.getElementById("location-name").textContent = weather.name;
    document.getElementById("temperature").textContent = `${weather.temperature} °F`;
    document.getElementById("condition").textContent = weather.condition;
}
