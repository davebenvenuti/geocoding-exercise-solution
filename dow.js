var quoteURL = "http://real-chart.finance.yahoo.com/table.csv?s=^DJI"

var request = require('request');
var Promise = require('bluebird');
var parseCSV = require('csv-parse');

module.exports.latestOpen = function() {
    var callback = (typeof arguments[0] == 'function') ? arguments[0] : null;

    var fetch = function(callback, resolve, reject) {
        request.get({ url: quoteURL }, function(err, res, body) {

            if(err) {
                if(callback) {
                    callback(err);
                } else {
                    reject(err);
                }
            } else {

                parseCSV(body, {}, function(err, parsed) {
                    // Ignore the header row, and grab the next row, which will
                    // be the most recent quote
                    //
                    // The format of the csv is:
                    //   Date, Open, High, Low, Close, Volume, Adj Volume
                    if(callback) {
                        callback(null, parsed[1] && parsed[1][1]);
                    } else {
                        resolve(parsed[1] && parsed[1][1]);
                    }
                });


            }
        });
    };

    if(callback) {
        fetch(callback);
    } else {
        return new Promise(function(resolve, reject) {
            fetch(null, resolve, reject);
        });
    }
};
