/* Global Variables */
const userName = 'tps13';
const geoNamesBaseUrl = 'http://api.geonames.org/searchJSON?q=';
const localServer = 'http://localhost:3000'
const weatherApiBBasseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const weatherApiKey = '665d55ac5df34436b40379a087de02fc';
const pixabayApiUrl = 'https://pixabay.com/api/?';
const pixabayApikey = '16478324-607adeaba56f44e8f704b7345';

document.getElementById('generate').addEventListener('click', generate);

async function generate(e) {
    const startDateString = document.getElementById('sdate').value;
    const endDateString = document.getElementById('edate').value;
    document.getElementById("error-message").innerText = '';
    if(!(isValidDate(startDateString) && isValidDate(endDateString))) {
        document.getElementById("error-message").innerText = 'Invalid date provided, please enter valid date';
        return;
    }
    const sDate = new Date(startDateString);
    const eDate = new Date(endDateString);
    if(eDate.getTime() < sDate.getTime()) {
        document.getElementById("error-message").innerText = 'End date is less than the Start date';
        return;
    }
    const tripDuration = getDateDifference(sDate, eDate);
    const city = document.getElementById('city').value;
    const today = new Date();
    if(sDate.getTime() < today.getTime()) {
        document.getElementById("error-message").innerText = 'Please enter a future start date';
        return;
    }
    const pendingDays = getDateDifference(today, sDate);
    let date = today;
    if(pendingDays <= 16) {
        date = sDate;
    }
    // Next line from https://stackoverflow.com/a/50130338
    const dateString = new Date(date.getTime() - (date.getTimezoneOffset() * 60000 ))
                    .toISOString()
                    .split("T")[0];

    // dateString = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
    const [geoData, weatherData, pixabayData] = await Promise.all([
        callGeoNamesApiInfo(city),
        callWeatherApiInfo(city),
        callPixabayApiInfo(city)

    ]);
    let index = 0;
    if(weatherData.data){
        for(let i=0; i<weatherData.data.length; i++){
            const weatherForDay = weatherData.data[i];
            if(weatherForDay.valid_date === dateString){
                index = i;
                break;
            }
        }
    }
    await processTripInfo(`${localServer}/saveTrip`, {
        latitude: geoData.geonames[0].lat,
        longitude: geoData.geonames[0].lng,
        country: geoData.geonames[0].countryCode,
        pendingDays: pendingDays,
        tripDuration: tripDuration,
        high: weatherData.data[index].high_temp,
        low: weatherData.data[index].low_temp,
        cityImage: pixabayData.hits[0].webformatURL
    });
    console.log('Both promises completed');
    return displayTripInfo(`${localServer}/getTrip`);
}

function getDateDifference(fDate, tDate) {
    dateTimeDifference = tDate.getTime() - fDate.getTime();
    duration = dateTimeDifference / (1000 * 3600 * 24);
    durationRounded = Math.round(duration)
    return durationRounded;
}

function isValidDate(dateString) {
    const timestamp=Date.parse(dateString);
    return !isNaN(timestamp);
}

const callGeoNamesApiInfo = async(city) =>{
    const url = `${geoNamesBaseUrl}${city}&username=${userName}`;
    const response = await fetch(url);
    try {
        const geoData = await response.json();
        console.log(geoData);
        return geoData;
    } catch (error) {
        console.log('error', error);
    }
    return Promise.resolve();
}

const callWeatherApiInfo = async(city) =>{
    const url = `${weatherApiBBasseUrl}city=${city}&key=${weatherApiKey}`;
    const response = await fetch(url);
    try {
        const weatherData = await response.json();
        console.log(weatherData);
        return weatherData;
    } catch (error) {
        console.log('error', error);
    }
    return Promise.resolve();
}

const callPixabayApiInfo = async(city) =>{
    const url = `${pixabayApiUrl}key=${pixabayApikey}&q=${city}&image_type=photo&category=places&safesearch=true&per_page=3`;
    const response = await fetch(url);
    try {
        const pixabayData = await response.json();
        console.log(pixabayData);
        return pixabayData;
    } catch (error) {
        console.log('error', error);
    }
    return Promise.resolve();
}

const processTripInfo = async (url, tripData) =>{ 
    console.log('input to sendWeatherinfo', tripData);
    const response = await fetch(url, {
      method: 'POST', // *GETR, POST, PUT, DELETE, etc..
      credentials: 'same-origin', // include , *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(tripData),   // body data type must match 'Content-Type'
    });
    try {
        // .json() reads server response to completion
        // See https://developer.mozilla.org/en-US/docs/Web/API/Body/json
        const saveTripData = await response.json();
        console.log(saveTripData);
        return saveTripData;
    } catch(error) {
          console.log('error', error);
    }
    return Promise.resolve();
}

const displayTripInfo = async (url) => {
    const request = await fetch(url);
    try{
        const serverData = await request.json();
        console.log(serverData);
        const data = serverData[serverData.length-1];
        document.getElementById('lat').innerHTML = '<span>Lat: ' +data.latitude +'</span>';
        document.getElementById('long').innerHTML = '<span>Lon: ' +data.longitude +'</span>';
        document.getElementById('country').innerHTML = '<span>Country: ' + data.country+'</span>';
        const message ='<span>your '+data.tripDuration + ' day trip starts in ' + data.pendingDays +' days</span>';
        document.getElementById('message').innerHTML = message;      
        document.getElementById('temp').innerHTML = '<span>High is in ' +data.high +'&#8451 and low is in ' +data.low +'&#8451</span>';
        document.getElementById('city-img').src = data.cityImage;
    } catch(error) {
        console.log("error", error);
    }
    return Promise.resolve();
}