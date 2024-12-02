async function appController() {
    let units = "celsius";

    const unitSelector = document.getElementById('unit-selector');
    unitSelector.addEventListener('change', (event) => {
        const option = event.target.value;
        units = option;
        console.log(units);
    })

    function getTemp(temp) {
        if (units === "celsius") {
            return `${temp}°C`;
        }
        const fahrenheit = (temp * 9 / 5) + 32;
        return `${fahrenheit}°F`;
    }
    function buildUrl(location) {
        const url_base = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';
        const url_options = '?unitGroup=metric&contentType=json';
        const api_key = 'UWK72QS3WHCYRRTJ7CQYPQCPD';
        return url_base
                + location
                + url_options
                + `&key=${api_key}`
    }
    
    async function obtainWeather(location) {
        const url = buildUrl(location);
        const response = await fetch(url);
        const weatherData = await response.json();
        return weatherData;
    }

    function displayData(data) {
        const main = document.getElementById('main');

        const location = document.createElement('div');
        location.classList.add('location');
        location.innerText = `Weather forecast for: ${data.resolvedAddress}`;
        main.appendChild(location);

        const currentConditions = data.currentConditions;

        const temp = document.createElement('div');
        temp.classList.add('temp');
        temp.innerText = `${getTemp(currentConditions.temp)}` 
                        + ` / Feels like ${getTemp(currentConditions.feelslike)}`;
        main.appendChild(temp);
        console.log(data);
    }
    displayData(await obtainWeather('tokyo'));
}
appController();