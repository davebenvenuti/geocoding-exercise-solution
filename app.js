var express = require('express');
var app = express();

var geohash = require('./geohash');

// TODO this has not been tested at all yet
app.get('/geohash', function (req, res) {
    geohash.generate(req.params.lat, req.params.lon)
        .then(function(results) {
            res.json({
                lat: results[0],
                lon: results[1]
            });
        })
        .catch(err) {
            res.status(500).json(err);
        };

});

var port = process.env.PORT || 3000;

if(process.env.TEST == 'true') {
    module.exports.app = app;
} else {
    app.listen(port, function () {
        console.log('Example app listening on port ' + port + '!');
    });
}
