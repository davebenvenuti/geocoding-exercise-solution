var moment = require('moment');
var dow = require('./dow');
var md5 = require('md5');
var promiseOrCallback = require('./util').promiseOrCallback;

module.exports.generate = function(lat, lon, date, callback) {
    if(typeof(date) == 'function') {
        callback = date;
        date = null;
    }

    if(date) {
        var dateStamp = moment(date).format('YYYY-MM-DD');
    } else {
        var dateStamp = moment().format('YYYY-MM-DD');
    }

    return promiseOrCallback(callback, function(resolve, reject) {
        if(dateStamp == 'Invalid date') {
            var err = new Error('Invalid date');

            reject(err);
        } else {
            dow.latestOpen(date)
                .then(function(openPrice) {
                    var fullStamp = dateStamp + '-' + openPrice;
                    var md5sum = md5(fullStamp);

                    var halfLength = (md5sum.length / 2);

                    var decimals = [
                        md5sum.substring(0, halfLength),
                        md5sum.substring(halfLength, md5sum.length)
                    ].map(function(hex) {
                        // TODO - everything up until splitting the hash looks
                        // correct.  however, the parseInt(hex, 16) isn't giving
                        // us the expected value for the XKCD sample

                        return parseFloat("0." + parseInt(hex, 16));
                    });
                    
                    resolve([
                        Math.floor(lat) + decimals[0],
                        Math.floor(lon) + decimals[1]
                    ]);
                })
                .catch(function(err) {
                    reject(err);
                });
        }
    });
};
