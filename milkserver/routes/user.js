var express = require('express');
var router = express.Router();
var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));

router.post('/', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {firstname: req.body.firstname,lastname: req.body.lastname, emailid: req.body.emailid,phone: req.body.phone,dob: req.body.dob, addressline1: req.body.addressline1,  addressline2: req.body.addressline2, city: req.body.city, state: req.body.state,zip: req.body.zip, password: req.body.password,interests:req.body.interests};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO users(firstname,lastname, emailid, phone,dob,addressline1,addressline2,city,state,zip,password) values($1, $2, $3, $4, $5,$6, $7, $8, $9, $10,$11)", [data.firstname,data.lastname,data.emailid,data.phone, data.dob, data.addressline1, data.addressline2,data.city,data.state,data.zip, data.password]);
        for(k in data.interests){
          client.query("INSERT INTO user_interests(emailid,user_interests) values ($1,$2)",[data.emailid,data.interests[k]]);
        }
       // client.query("INSERT INTO userinterests(emailid,user_interests) values ($1,$2)",[data.emailid])
       
        // SQL Query > Select Data
       //var query = client.query("SELECT * FROM users ORDER BY id ASC");

        // Stream results back one row at a time
       /* query.on('row', function(row) {
            results.push(row);
        });*/

        // After all data is returned, close connection and return results
      //  query.on('end', function() {
            //done();
        return res.json({ success: true,message: 'You registered successfully!' });
       // });


    });
});
router.get('/', function(req, res) {

    var results = [];
    var interests=[];
    var getemailid=req.query.emailid;

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM users where emailid=($1)",[getemailid]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });
        query = client.query("SELECT user_interests FROM user_interests where emailid=($1)",[getemailid]);

        // Stream results back one row at a time

        query.on('row', function(row) {
            interests.push(row);
        });
        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results.concat(interests));
        });

    });

});

module.exports = router;
