var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));


var client = new pg.Client(connectionString);
client.connect();
var query = client.query(' CREATE TABLE user_events(eventid text NOT NULL,emailid text NOT NULL,type text NOT NULL,CONSTRAINT pke_event_id PRIMARY KEY (eventid,emailid))');
query.on('end', function() { client.end(); });
