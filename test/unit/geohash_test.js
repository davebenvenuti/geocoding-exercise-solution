require('replay');

var expect = require('expect.js');
var geohash = require('../../geohash');

describe('geohash', function() {
    it('calculates a geohash from a lat lon for a date and passes it to a callback', function(done) {
        geohash.generate(37.421542, -122.085589, '2005-05-26', function(err, result) {
            expect(result).to.eql([37.857713, -122.544543]);

            done();            
        });
    });
});
