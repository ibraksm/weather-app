class Data {
    constructor(city, country, localtime, temp_c, temp_f, condition, feelslike_c, feelslike_f, wind_kph, wind_mph, humidity) {
        this.city = city;
        this.country = country;
        this.localtime = localtime;
        this.temp_c = temp_c;
        this.temp_f = temp_f;
        this.condition = condition;
        this.feelslike_c = feelslike_c;
        this.feelslike_f = feelslike_f;
        this.wind_kph = wind_kph;
        this.wind_mph = wind_mph;
        this.humidity = humidity;
    }
}

async function loadData(city) {
    try {
        const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=1673e1bf7a4b45839c8152004232207&q=${city}`);
        const data = await response.json();
        const dataObject = new Data(data.location.name, data.location.country, data.location.localtime, 
            data.current.temp_c, data.current.temp_f, data.current.condition.text, data.current.feelslike_c, 
            data.current.feelslike_f, data.current.wind_kph, data.current.wind_mph, data.current.humidity);
        return dataObject;
    } catch (error) {
        throw new Error("No matching location has been found!");
    }
}

export {Data, loadData};