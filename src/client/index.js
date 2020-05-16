import { generate } from './js/app';
import { callGeoNamesApiInfo } from './js/app';
import { sendLatLongInfo } from './js/app';
import { displayCoordinatesInfo } from './js/app';
import './styles/style.scss';
import fbImage from './images/fb.jpg';
import twitterImage from './images/twitter.jpg';

var fbLogo = document.getElementById('fb-logo');
fbLogo.src = fbImage;
var twitterLogo = document.getElementById('twitter-logo');
twitterLogo.src = twitterImage;


export { generate, callGeoNamesApiInfo, sendLatLongInfo, displayCoordinatesInfo };