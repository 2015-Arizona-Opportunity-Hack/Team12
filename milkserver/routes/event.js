var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));

router.post('/', function(req, res) {

    var results = []

    // Grab data from http request
    var data = {eventname: req.body.eventname,eventdesc: req.body.eventdesc, eventtype: req.body.eventtype,eventdate: req.body.eventdate, duration: req.body.duration};
    console.log(data);
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO events(name, type, eventdesc, duration, eventdate) values($1, $2, $3, $4, $5)", [data.eventname, data.eventtype, data.eventdesc, data.duration, data.eventdate]);

        // SQL Query > Select Data
       // var query = client.query("SELECT * FROM user2 ORDER BY id ASC");

        // Stream results back one row at a time
       /* query.on('row', function(row) {
            results.push(row);
        });*/

        // After all data is returned, close connection and return results
      //  query.on('end', function() {
            //done();
        return res.json({ message: 'Your event is registered successfully!' });
       // });


    });
});

router.get('/', function(req, res) {

  var priorityresults = [];
  var otherresults = [];
    var getemailid = req.query.emailid;
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("select * from events where type in (select type from user_interests where emailid=($1)) and eventid not in (select eventid from user_events where emailid = ($1)) and eventdate > now();", [getemailid]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            priorityresults.push(row);
        });

        query = client.query("select * from events where type not in (select type from user_interests where emailid=($1)) and eventid not in (select eventid from user_events where emailid = ($1)) and eventdate > now();", [getemailid]);

        query.on('row', function(row) {
            otherresults.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(priorityresults.concat(otherresults));
        });

    });

});

router.route('/:event_id')
  .get(function(req, res){
    results = [];

    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }


    var query = client.query("select * from events where eventid = ($1)", [req.params.event_id]);

    query.on('row', function(row) {
        results.push(row);
    });
    query.on('end', function() {
        done();
        return res.json(results);
      });
    });
  });

module.exports = router;
