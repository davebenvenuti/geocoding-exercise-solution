var expect = require('expect.js');

var dow = require('../../dow');
var replay = require('replay');

describe('dow', function() {
    it('fetches the latest dow jones open price and passes to a callback', function(done) {
        dow.latestOpen(function(err, openPrice) {
            expect(openPrice).to.eql(18282.949219);

            done();
        });
    });

    it('fetches the latest dow jones open price and returns a promise', function(done) {
        dow.latestOpen()
            .then(function(openPrice) {
                expect(openPrice).to.eql(18282.949219);

                done();
            });
    });
});
