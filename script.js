async function appController() {
    let units = "celsius";

    const unitSelector = document.getElementById('unit-selector');
    unitSelector.addEventListener('change', (event) => {
        changeUnits(event);
    })

    const submitButton = document.getElementById('submit-button');
    submitButton.addEventListener('click', async (event) => {
        event.preventDefault();
        const location = document.getElementById('search-bar').value;
        const data = await obtainWeather(location);
        displayData(data);
    })

    function changeUnits(event) {
        const option = event.target.value;
        units = option;
        const tempsArray = Array.from(document.querySelectorAll('.temp'));
        if (units === 'celsius') {
            tempsArray.forEach((tempSection) => {
                tempSection.innerText = toCelsius(Number(tempSection.innerText));
            })
        } else {
            tempsArray.forEach((tempSection) => {
                tempSection.innerText = toFahrenheit(Number(tempSection.innerText));
            })
        }
        setUnits();
    }

    function toFahrenheit(temp) {
        let result = (temp * 9 / 5) + 32;
        if (!Number.isInteger(result)) {
            result = result.toFixed(1);
            if (result.endsWith('.0')) {
                result = Math.trunc(result);
            }
        }
        return result;
    }

    function toCelsius(temp) {
        let result =  (temp - 32) * 5 / 9;
        if (!Number.isInteger(result)) {
            result = result.toFixed(1);
            if (result.endsWith('.0')) {
                result = Math.trunc(result);
            }
        }
        return result;
    }

    function setUnits() {
        const unitsArray = Array.from(document.querySelectorAll('.unit'));
        unitsArray.forEach((unitSection) => {
            if (units === 'celsius') {
                unitSection.innerText = '°C';
            } else {
                unitSection.innerText = '°F';
            }

        });
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
        if (main.classList.contains('hidden')) {
            main.classList.toggle('hidden');
        }       

        const locationSpan = document.getElementById('location-span');
        locationSpan.innerText = `${data.resolvedAddress}`;

        const currentConditions = data.currentConditions;
        displayTemp(currentConditions);
        displayConditions(data.description);

        console.log(data);
    }

    function displayTemp(currentConditions) {
        const currentTemp = document.getElementById('current-temp');
        currentTemp.innerText = units === "fahrenheit" ? 
                                `${toFahrenheit(currentConditions.temp)}`
                                : `${currentConditions.temp}`;
        colorTemp(currentTemp, currentConditions.temp);
        const feelsLikeTemp = document.getElementById('feels-like');
        feelsLikeTemp.innerText = units === "fahrenheit" ? 
                                `${toFahrenheit(currentConditions.feelslike)}`
                                : `${currentConditions.feelslike}`;
        colorTemp(feelsLikeTemp, currentConditions.feelslike);
        setUnits();
    }

    function colorTemp(span, temperature) {
        const parent = span.parentElement;
        if (temperature < 0) {
            parent.dataset.tempColor = 'belowzero';
            return;
        }
        if (temperature < 16) {
            parent.dataset.tempColor = 'cold';
            return;
        }
        if (temperature < 20) {
            parent.dataset.tempColor = 'cool';
            return;
        }
        if (temperature < 30) {
            parent.dataset.tempColor = 'hot';
            return;
        }
        parent.dataset.tempColor = 'veryhot';

    }

    function displayConditions(description) {
        const descriptionContainer = document.getElementById('description');
        descriptionContainer.innerText = description;
    }

}
appController();