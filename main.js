const key = '88304825099f419bbe1142108210906';
const cityName = document.querySelector(".city-name");
const tempValue = document.querySelector(".city-weather");
const forecastDay1 = document.querySelector(".forecast-date1");
const forecastDay2 = document.querySelector(".forecast-date2");
const forecastDay3 = document.querySelector(".forecast-date3");
const forecastTemp1 = document.querySelector(".forecast-temp1");
const forecastTemp2 = document.querySelector(".forecast-temp2");
const forecastTemp3 = document.querySelector(".forecast-temp3");
const submitInput = document.getElementById("city");
const submitButton = document.getElementById("submit");
const forecastDays = [forecastDay1, forecastDay2, forecastDay3];
const forecastTemps = [forecastTemp1, forecastTemp2, forecastTemp3];
const autoComplete = document.querySelector(".autocomplete");
let Days = ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']

const fetchAPI = async (query) => {
    const base = `http://api.weatherapi.com/v1/${query}`;

    const res = await fetch(base);
    const data = await res.json();
    return data;
}

const getCity = async (city) => {

    const query = `current.json?key=${key}&q=${city}&aqi=no`;
    const data = await fetchAPI(query);

    cityName.innerHTML = data.location.name;
    tempValue.innerHTML = `${data.current.temp_c}°`;
    return data;
};

const getForecast = async (city) => {
    const query = `forecast.json?key=${key}&q=${city}&days=12&aqi=no`
    const data = await fetchAPI(query);

    data.forecast.forecastday.forEach((forecastday, index) => {
        let date = new Date(forecastday.date)
        let minTemp = forecastday.day.mintemp_c;
        let maxTemp = forecastday.day.maxtemp_c;
        forecastDays[index].innerHTML = Days[date.getDay()];
        forecastTemps[index].innerHTML = `${minTemp} / ${maxTemp}`;
    });
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

const firstLoadforecast = async () => {
    const query = `forecast.json?key=${key}&q=auto:ip&days=12&aqi=no`
    const data = await fetchAPI(query);

    data.forecast.forecastday.forEach((forecastday, index) => {
        let date = new Date(forecastday.date)
        let minTemp = forecastday.day.mintemp_c;
        let maxTemp = forecastday.day.maxtemp_c;
        forecastDays[index].innerHTML = Days[date.getDay()];
        forecastTemps[index].innerHTML = `${minTemp} / ${maxTemp}`;
    });
};

const firstLoadCurrent = async () => {
    const query = `current.json?key=${key}&q=auto:ip&aqi=no`
    const data = await fetchAPI(query);

    cityName.innerHTML = data.location.name;
    tempValue.innerHTML = `${data.current.temp_c}°`;
};

const myDebounce = (fn, delay) => {
    let Timer;
    return function () {
        let context = this,
            args = arguments;

        clearTimeout(Timer);
        Timer = setTimeout(() => {
            fn.apply(context, args);
        }, delay)
    }
}



let searchCities = async searchText => {
    if (searchText.length > 3) {
        const query = `forecast.json?key=${key}&q=${searchText}&aqi=no`
        const data = await fetchAPI(query);

        let matches = Object.values(data.location);
        autoComplete.innerHTML = matches[0];
        autoComplete.classList.remove("yellowed");
        autoComplete.addEventListener("click", e => {
            e.preventDefault();
            let city = e.target.innerText;
            getCity(city);
            getForecast(city);
        })
    } else {
        autoComplete.innerHTML = "input three or more letters";
        autoComplete.classList.add("yellowed");
        matches = [];
    }
}
submitInput.addEventListener('input', () => {
    searchCities(submitInput.value);
});


searchCities = myDebounce(searchCities, 1000);

// Execution
firstLoadCurrent();
firstLoadforecast();