var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));

router.post('/', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {eventid: req.body.eventid,emailid: req.body.emailid, eventtype: req.body.eventtype};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO user_events(eventid,emailid,type) values($1, $2, $3)", [ data.eventid,data.emailid, data.eventtype]);

        // SQL Query > Select Data
       // var query = client.query("SELECT * FROM user2 ORDER BY id ASC");

        // Stream results back one row at a time
       /* query.on('row', function(row) {
            results.push(row);
        });*/

        // After all data is returned, close connection and return results
      //  query.on('end', function() {
            //done();
        return res.json({ success: true});
       // });


    });
});

module.exports = router;
