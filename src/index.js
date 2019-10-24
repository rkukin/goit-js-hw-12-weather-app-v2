'use strict';

import './styles.css';
import getGeoPosition from './getGeoPosition';
import fetchWeather from './fetchWeather';

import PNotify from '../node_modules/pnotify/dist/es/PNotify.js';

const weatherSection = document.querySelector('#weather');
const cityForm = document.querySelector('#search-form');
const cityName = document.querySelector('[name="city"]');

const weatherIcon = document.querySelector('.icon');
const locationValue = document.querySelector('[data-field=location]');
const tempValue = document.querySelector('[data-field=temp]');
const humidityValue = document.querySelector('[data-field=humidity]');
const windValue = document.querySelector('[data-field=wind]');
const conditionsValue = document.querySelector('[data-field=conditions]');

function renderWeather(weatherData) {
  weatherSection.classList.remove('is-hidden');
  weatherIcon.setAttribute('src', weatherData.data.current_condition[0].weatherIconUrl[0].value.replace('http', 'https'));
  weatherIcon.setAttribute('alt', weatherData.data.current_condition[0].weatherDesc[0].value);
  locationValue.innerHTML = `${weatherData.data.request[0].query}`;
  tempValue.innerHTML = `${weatherData.data.current_condition[0].temp_C} C`;
  humidityValue.innerHTML = `${weatherData.data.current_condition[0].humidity} %`;
  windValue.innerHTML = `${weatherData.data.current_condition[0].windspeedKmph} Kmph, ${weatherData.data.current_condition[0].winddir16Point}`;
  conditionsValue.innerHTML = weatherData.data.current_condition[0].weatherDesc[0].value;
}

function hideWeatherSection() {
  weatherSection.classList.add('is-hidden');
}

getGeoPosition()
  .then(position => {
    fetchWeather(` ${position.latitude}, ${position.longitude}`).then(data => {
      renderWeather(data);
    });
  })
  .catch(error => {
    PNotify.alert(error);
    hideWeatherSection();
  });

cityForm.addEventListener('submit', e => {
  e.preventDefault();
  fetchWeather(cityName.value)
    .then(data => {
      renderWeather(data);
    })
    .catch(error => {
      PNotify.alert(error);
      hideWeatherSection();
    });
});
