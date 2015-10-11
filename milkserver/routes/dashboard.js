var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));

router.get('/', function(req, res) {

    var futureresults = [];
    var pastresults = [];
    var eventids = [];
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
        //console.log(getemailid)
       var query = client.query("select * from events where eventid in (select eventid from user_events where emailid like ($1)) and eventdate>now()",[getemailid]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            futureresults.push(row);
        });
       //console.log("eventids follow");
        //console.log(futureresults);

   /* for(k in eventids){
        //console.log(eventids[k]);
      var  query= client.query("select * from events where eventid=($1) and eventdate > now()", [eventids[k]]);
    }
        query.on('row', function(row) {
            futureresults.push(row);
        });*/
        //console.log(futureresults);
       query = client.query("select type,count(*) from events group by type having type in (select type from events where eventid in (select eventid from user_events where emailid like ($1)) and eventdate<now())", [getemailid]);
        query.on('row', function(row) {
            pastresults.push(row);
        });
        // After all data is returned, close connection and return results
      query.on('end', function() {
            done();
            return res.json(futureresults.concat(pastresults));
        });

    });

});

module.exports = router;
