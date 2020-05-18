import { generate } from './js/app';
import { getDateDifference } from './js/app';
import { isValidDate } from './js/app';
import { callGeoNamesApiInfo } from './js/app';
import { callWeatherApiInfo } from './js/app';
import { callPixabayApiInfo } from './js/app';
import { processTripInfo } from './js/app';
import { displayTripInfo } from './js/app';
import { fetchAndDisplayTripInfo } from './js/app';
import './styles/style.scss';
import fbImage from './images/fb.jpg';
import twitterImage from './images/twitter.jpg';

var fbLogo = document.getElementById('fb-logo');
fbLogo.src = fbImage;
var twitterLogo = document.getElementById('twitter-logo');
twitterLogo.src = twitterImage;

document.addEventListener('DOMContentLoaded', () => {
    //event listeners here
    document.getElementById('generate').addEventListener('click', function(event) {
        Client.generate(event);
    });
});
export { generate, getDateDifference, isValidDate, callGeoNamesApiInfo, callWeatherApiInfo, callPixabayApiInfo, processTripInfo, displayTripInfo, fetchAndDisplayTripInfo };