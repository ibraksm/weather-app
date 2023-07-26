import { loadData } from "./api";

let units = "European";

function populate() {
    genNav();
    genInfos();
    genMain();
    //genFooter();
}


function genNav() {
    const content = document.getElementById("content");
    const nav = document.createElement("nav");
    const form = document.createElement("form");
    const searchInput = document.createElement("input");
    const settings = document.createElement("div");
    const europeanUnitsButton = document.createElement("button");
    const americanUnitsButton = document.createElement("button");

    content.appendChild(nav);

    form.action = "#";
    form.autocomplete = "off";
    nav.appendChild(form);

    searchInput.type = "search";
    searchInput.placeholder = "Search location";
    form.appendChild(searchInput);

    settings.classList.add("settings");
    nav.appendChild(settings);

    europeanUnitsButton.innerHTML = "°C, km/h";
    europeanUnitsButton.classList.add("european-units-button");
    settings.appendChild(europeanUnitsButton);

    americanUnitsButton.innerHTML = "°F, mph";
    americanUnitsButton.classList.add("american-units-button");
    settings.appendChild(americanUnitsButton);

    form.addEventListener("submit", (event) => {event.preventDefault()});
    searchInput.addEventListener("keypress", async (event) => {
        const errorMessage = document.querySelector(".error-message");

        if (event.key == "Enter" && searchInput.value.length >= 1) {
            try {
                await loadData(searchInput.value);
                await populateDatas(searchInput.value, units);
                errorMessage.innerHTML = "";
            } catch {
                errorMessage.innerHTML = "No matching location has been found";
            }
        }    
    });
    europeanUnitsButton.addEventListener("click", () => {
        units = "European";
        populateDatas(document.querySelector(".city").innerHTML, units);
    })
    americanUnitsButton.addEventListener("click", () => {
        units = "American";
        populateDatas(document.querySelector(".city").innerHTML, units);
    })
}

function genInfos() {
    const content = document.getElementById("content");
    const infos = document.createElement("div");
    const errorMessage = document.createElement("p");

    infos.classList.add("infos");
    content.appendChild(infos);

    errorMessage.classList.add("error-message");
    infos.appendChild(errorMessage);
}

function genMain() {
    const content = document.getElementById("content");

    const main = document.createElement("main");

    const heading = document.createElement("div");
    heading.classList.add("heading");

    const headingHeadline = document.createElement("h2");
    const cityElement = document.createElement("span");
    cityElement.classList.add("city");
    const countryElement = document.createElement("span");
    countryElement.classList.add("country");
    headingHeadline.appendChild(cityElement);
    headingHeadline.appendChild(document.createTextNode(", "));
    headingHeadline.appendChild(countryElement);
    heading.appendChild(headingHeadline);

    const conditionElement = document.createElement("p");
    conditionElement.classList.add("condition");
    const timeElement = document.createElement("p");
    timeElement.classList.add("time");
    heading.appendChild(conditionElement);
    heading.appendChild(timeElement);

    const general = document.createElement("div");
    general.classList.add("general");

    const temp = document.createElement("h2");
    temp.classList.add("temp");
    general.appendChild(temp);

    const details = document.createElement("div");
    details.classList.add("details");

    const feelsLikeElement = document.createElement("p");
    feelsLikeElement.classList.add("feels-like");
    const windElement = document.createElement("p");
    windElement.classList.add("wind");
    const humidityElement = document.createElement("p");
    humidityElement.classList.add("humidity");
    details.appendChild(feelsLikeElement);
    details.appendChild(windElement);
    details.appendChild(humidityElement);

    general.appendChild(details);

    main.appendChild(heading);
    main.appendChild(general);

    content.appendChild(main);
}

/*
function genFooter() {
    
}

*/

async function populateDatas(city, units) {
    try {
        const dataObject = await loadData(city);

        const cityElement = document.querySelector(".city");
        const countryElement = document.querySelector(".country");
        const conditionElement = document.querySelector(".condition");
        const timeElement = document.querySelector(".time");
        const tempElement = document.querySelector(".temp");
        const feelsLikeElement = document.querySelector(".feels-like");
        const windElement = document.querySelector(".wind");
        const humidityElement = document.querySelector(".humidity");

        cityElement.innerHTML = dataObject.city;
        countryElement.innerHTML = dataObject.country;
        conditionElement.innerHTML = dataObject.condition;
        timeElement.innerHTML = dataObject.localtime;
        humidityElement.innerHTML = `HUMIDITY : ${dataObject.humidity} %`;

        if (units == "European") {
            tempElement.innerHTML = `${dataObject.temp_c} °C`;
            feelsLikeElement.innerHTML = `FEELS LIKE : ${dataObject.feelslike_c} °C`;
            windElement.innerHTML = `WIND : ${dataObject.wind_kph} km/h`;
        } else {
            tempElement.innerHTML = `${dataObject.temp_f} °F`;
            feelsLikeElement.innerHTML = `FEELS LIKE : ${dataObject.feelslike_f} °F`;
            windElement.innerHTML = `WIND : ${dataObject.wind_mph} mph`;
        }
    } catch (error) {
        console.error(error.message);
    }
}

populateDatas("Paris", "European");

export default populate;