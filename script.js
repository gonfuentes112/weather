function appController() {
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
        const weatherdata = await response.json();
        return weatherdata;
    }
    console.log(obtainWeather('tokyo'));
}
appController();