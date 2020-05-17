import * as server from './server.js';

/*
describe('saveTripInfo', () => {
    it('saveTripInfo', () => {
        const tripInfo = {
            latitude: '21.30694',
            longitude: '-157.85833',
            country: 'US',
            pendingDays: 51,
            tripDuration: 37,
            high: 27.3,
            low: 20.9,
            cityImage: 'https://pixabay.com/get/53e8d4424a50b10ff3d8992cc62e33791d3cdce14e5074417c2879d4954ecc_640.jpg'
        };
        const data = server.saveTripInfo(tripInfo);
        expect(data).toEqual(server.getTripInfo());
    });
});
*/

const request = require('supertest');
describe('saves trip', () => {
  it('saves trip', async () => {
    const tripInfo = {
        latitude: '21.30694',
        longitude: '-157.85833',
        country: 'US',
        pendingDays: 51,
        tripDuration: 37,
        high: 27.3,
        low: 20.9,
        cityImage: 'https://pixabay.com/get/53e8d4424a50b10ff3d8992cc62e33791d3cdce14e5074417c2879d4954ecc_640.jpg'
    };
    const res = await request(server.app)
      .post('/saveTrip')
      .send(tripInfo);
    console.log(res.body);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([tripInfo]);
  })
})
