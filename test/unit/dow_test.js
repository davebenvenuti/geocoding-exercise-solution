var expect = require('expect.js');

var dow = require('../../dow');

require('replay');

describe('dow', function() {
    it('fetches the latest dow jones open price and passes to a callback', function(done) {
        dow.latestOpen(function(err, openPrice) {
            expect(openPrice).to.eql(18282.95);

            done();
        });
    });

    it('fetches the latest dow jones open price and returns a promise', function(done) {
        dow.latestOpen()
            .then(function(openPrice) {
                expect(openPrice).to.eql(18282.95);

                done();
            });
    });

    it('fetches the dow jones open price for a specific date and returns a promise', function(done) {
        dow.latestOpen('2005-05-26')
            .then(function(openPrice) {
                expect(openPrice).to.eql(10458.68);

                done();
            });
    });    
});
