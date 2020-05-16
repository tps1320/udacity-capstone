// Setup empty JS object to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');
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
    console.log(request);
    tripInfo = {
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