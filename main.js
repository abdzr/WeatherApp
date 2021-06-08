const key = 'f66b236b4bc84c3fa04155111210806';
const cityName = document.querySelector(".city-name");
const tempValue = document.querySelector(".city-weather");
const forecastDay1 = document.querySelector(".forecast-date1");
const forecastDay2 = document.querySelector(".forecast-date2");
const forecastDay3 = document.querySelector(".forecast-date3");
const forecastTemp1 = document.querySelector(".forecast-temp1");
const forecastTemp2 = document.querySelector(".forecast-temp2");
const forecastTemp3 = document.querySelector(".forecast-temp3");
const submitInput = document.getElementById("city")
const submitButton = document.getElementById("submit");
let Days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

const getCity = async (city) => {

    const base = 'http://api.weatherapi.com/v1/current.json';
    const query = `?key=${key}&q=${city}&aqi=no`;

    const res = await fetch(base + query);
    const data = await res.json();

    cityName.innerHTML = data.location.name;
    tempValue.innerHTML = `${data.current.temp_c} °`;
    return data;
};

const getForecast = async (city) => {
    const base = 'http://api.weatherapi.com/v1/forecast.json';
    const query = `?key=${key}&q=${city}&days=12&aqi=no`

    const res = await fetch(base + query);
    const data = await res.json();

    let Day1 = new Date(data.forecast.forecastday[0].date);
    let Day2 = new Date(data.forecast.forecastday[1].date);
    let Day3 = new Date(data.forecast.forecastday[2].date);

    let minTemp1 = data.forecast.forecastday[0].day.mintemp_c;
    let minTemp2 = data.forecast.forecastday[1].day.mintemp_c;
    let minTemp3 = data.forecast.forecastday[2].day.mintemp_c;
    let maxTemp1 = data.forecast.forecastday[0].day.maxtemp_c;
    let maxTemp2 = data.forecast.forecastday[1].day.maxtemp_c;
    let maxTemp3 = data.forecast.forecastday[2].day.maxtemp_c;

    forecastDay1.innerHTML = Days[Day1.getDay()];
    forecastDay2.innerHTML = Days[Day2.getDay()];
    forecastDay3.innerHTML = Days[Day3.getDay()];
    forecastTemp1.innerHTML = `${minTemp1} / ${maxTemp1}`
    forecastTemp2.innerHTML = `${minTemp2} / ${maxTemp2}`
    forecastTemp3.innerHTML = `${minTemp3} / ${maxTemp3}`
    return data;
};


submitButton.addEventListener("click", e => {
    e.preventDefault();
    let city = submitInput.value;
    getCity(city);
    getForecast(city)
        .then(data => {
            console.log(data);
        })
        .catch(err => {
            console.log(err);
        })
});