const key = 'f66b236b4bc84c3fa04155111210806';
const cityName = document.querySelector(".city-name");
const tempValue = document.querySelector(".city-weather");
const forecastDay1 = document.querySelector(".forecast-date1");
const forecastDay2 = document.querySelector(".forecast-date2");
const forecastDay3 = document.querySelector(".forecast-date3");
const forecastTemp1 = document.querySelector(".forecast-temp1");
const forecastTemp2 = document.querySelector(".forecast-temp2");
const forecastTemp3 = document.querySelector(".forecast-temp3");
const getCity = async (city) => {

    const base = 'http://api.weatherapi.com/v1/current.json';
    const query = `?key=${key}&q=auto:ip&aqi=no`;

    const res = await fetch(base + query);
    const data = await res.json();

    cityName.innerHTML = data.location.name;
    tempValue.innerHTML = `${data.current.temp_c} °`;
    return data;
};

const getForecast = async (city) => {
    const base = 'http://api.weatherapi.com/v1/forecast.json';
    const query = `?key=${key}&q=auto:ip&days=12&aqi=no`

    const res = await fetch(base + query);
    const data = await res.json();

    forecastDay1.innerHTML = data.forecast.forecastday[0].date;
    forecastDay2.innerHTML = data.forecast.forecastday[1].date;
    forecastDay3.innerHTML = data.forecast.forecastday[2].date;
    return data;
};

getCity('khouribga');
getForecast('khouribga')
    .then(data => console.log(data))
    .catch(err => console.log(err));