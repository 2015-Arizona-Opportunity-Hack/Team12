var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));


var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE events(eventid serial NOT NULL,name text NOT NULL,type text NOT NULL,eventdesc text, eventdate date NOT NULL,duration numeric, CONSTRAINT pk_event_id PRIMARY KEY (eventid))');
query.on('end', function() { client.end(); });
