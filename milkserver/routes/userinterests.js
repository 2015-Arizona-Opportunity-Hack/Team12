var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));

router.post('/', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {emailid: req.body.emailid, interests:req.body.interests};
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
        for(k in data.interests){
          console.log(k);
          client.query("INSERT INTO user_interests(emailid,user_interests) values ($1,$2)",[data.emailid, data.interests[k]]);
        }


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
