var request = require('supertest');
var app = require('../../app').app;

describe('app', function() {
    it('returns a geohash for a given lat/lon', function(done) {
        request(app)
            .get('/geohash?lat=37.421542&lon=-122.085589')
            .expect(200)
            .end(function(err, res) {
                // TODO
            });
    });
});
