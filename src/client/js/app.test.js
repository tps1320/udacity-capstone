import * as app from './app.js';

describe('displayTripInfo', () => {
    it('displays trip info', async () => {
        document.body.innerHTML = '<div id="lat"></div>'
        + '<div id="long"></div>'
        + '<div id="country"></div>'
        + '<div id="message"></div>'
        + '<div id="temp"></div>'
        + '<img id="city-img">';
        app.displayTripInfo([{
            latitude: '21.30694',
            longitude: '-157.85833',
            country: 'US',
            pendingDays: 51,
            tripDuration: 37,
            high: 27.3,
            low: 20.9,
            cityImage: 'https://pixabay.com/get/53e8d4424a50b10ff3d8992cc62e33791d3cdce14e5074417c2879d4954ecc_640.jpg'
        }]);
        expect(document.getElementById('lat').textContent).toEqual('Lat: 21.30694');
        expect(document.getElementById('long').textContent).toEqual('Lon: -157.85833');
        expect(document.getElementById('country').textContent).toEqual('Country: US');
        expect(document.getElementById('message').textContent).toEqual('your 37 day trip starts in 51 days');
        expect(document.getElementById('temp').textContent).toEqual('High is in 27.3℃ and low is in 20.9℃');
        expect(document.getElementById('city-img').src).toEqual('https://pixabay.com/get/53e8d4424a50b10ff3d8992cc62e33791d3cdce14e5074417c2879d4954ecc_640.jpg');
    });
});