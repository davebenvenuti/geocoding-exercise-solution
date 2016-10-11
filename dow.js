
// http://chart.finance.yahoo.com/table.csv?s=^DJI&a=9&b=11&c=2015&d=9&e=11&f=2016&g=d&ignore=.csv

var request = require('request');
var parseCSV = require('csv-parse');
var promiseOrCallback = require('./util').promiseOrCallback;
var moment = require('moment');

var quoteURL = function(date) {
    // URL obtained from https://finance.yahoo.com/quote/%5EDJI/history, download data link
    var base = "http://real-chart.finance.yahoo.com/table.csv?s=^DJI";

    if(date) {
        date = moment(date); // make sure we're dealing with a moment object

        // the yahoo finance url appears to accept the start and end date in
        // the form:
        //
        //   a=[start month 0 indexed]&b=[start date 1 indexed]&c=[start year]
        //   &d=[end month 0 index]&e=[end date 1 indexed]&f=[end year]
        //
        // make the end date our requested date, then go back 7 days, to ensure
        // the top row of the csv is either the date we requested or the most
        // recent date with a quote

        var sevenDaysAgo = moment(date).subtract(7, 'days');

        return base +
            "&a=" + sevenDaysAgo.month() +
            "&b=" + sevenDaysAgo.date() +
            "&c=" + sevenDaysAgo.year() +
            "&d=" + date.month() +
            "&e=" + date.date() +
            "&f=" + date.year()

    } else {
        return base;
    }
};

module.exports.latestOpen = function(date, callback) {
    if(typeof date == 'function') {
        callback = date;
        date = null;
    }

    return promiseOrCallback(callback, function(resolve, reject) {
        request.get({ url: quoteURL(date) }, function(err, res, body) {

            if(err) {
                reject(err);
            } else {

                parseCSV(body, {}, function(err, parsed) {
                    // Ignore the header row, and grab the next row, which will
                    // be the most recent quote
                    //
                    // The format of the csv is:
                    //   Date, Open, High, Low, Close, Volume, Adj Volume
                    resolve(parsed[1] && parseFloat(parsed[1][1]).toFixed(2));
                });
            }
        });
    });
};
