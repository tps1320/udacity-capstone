// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require('express');
const request = require('request');
// Start up an instance of app
const app = express();
/* Middleware*/
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('dist'))


// Setup Server
const port = 3000;
const server = app.listen(port, isServerActive);
function isServerActive() {
    console.log(`running on localhost: ${port}`);
};

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
})
app.options('/getTrip', cors());
// handles get calls from client
app.get('/getTrip', cors(), sendTripInfo);
function sendTripInfo(request, response) {
    console.log(projectData)
    response.send(projectData);
};
app.options('/saveTrip', cors());
// handles post calls from client, stores the information from client to server
app.post('/saveTrip', cors(), saveTripInfo);
function saveTripInfo(request, response) {
    console.log(request.body);
    const tripInfo = {
        latitude: request.body.latitude,
        longitude: request.body.longitude,
        country: request.body.country,
        pendingDays: request.body.pendingDays,
        tripDuration: request.body.tripDuration,
        high: request.body.high,
        low: request.body.low,
        cityImage: request.body.cityImage
    };
    projectData.push(tripInfo);
    response.send(projectData);
    console.log(projectData);
}

/* Global Variables */
const userName = 'tps13';
const geoNamesBaseUrl = 'http://api.geonames.org/searchJSON';
const weatherApiBaseUrl = 'https://api.weatherbit.io/v2.0/forecast/daily';
const weatherApiKey = '665d55ac5df34436b40379a087de02fc';
const pixabayApiUrl = 'https://pixabay.com/api/';
const pixabayApikey = '16478324-607adeaba56f44e8f704b7345';

app.get('/call-geonames', async function (clientReq, clientRes) {
  const url = `${geoNamesBaseUrl}?q=${clientReq.query.city}&username=${userName}`;
  console.log(clientReq.query);
  request(url, { json: true }, (err, res, body) => {
    if (err) {
      clientRes.send(err);
      console.log(err);
      return;
    }
    clientRes.send(body);
  });
});

app.get('/call-weatherbit', async function (clientReq, clientRes) {
  const url = `${weatherApiBaseUrl}?city=${clientReq.query.city}&key=${weatherApiKey}`;
  console.log(clientReq.query);
  request(url, { json: true }, (err, res, body) => {
    if (err) {
      clientRes.send(err);
      console.log(err);
      return;
    }
    clientRes.send(body);
  });
});

app.get('/call-pixabay', async function (clientReq, clientRes) {
  const url = `${pixabayApiUrl}?key=${pixabayApikey}&q=${clientReq.query.city}&image_type=photo&category=places&safesearch=true&per_page=3`;
  console.log(clientReq.query);
  request(url, { json: true }, (err, res, body) => {
    if (err) {
      clientRes.send(err);
      console.log(err);
      return;
    }
    clientRes.send(body);
  });
});

exports.app = app;
// export {app};