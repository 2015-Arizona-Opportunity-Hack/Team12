var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));


var client = new pg.Client(connectionString);
client.connect();
var query = client.query(' CREATE TABLE users(firstname text NOT NULL,lastname text NOT NULL,emailid text NOT NULL,phone text,dob date NOT NULL,c text, addressline2 text,city text,state text,zip numeric,password text NOT NULL,col1 numeric DEFAULT 1,CONSTRAINT pk_user_id PRIMARY KEY (emailid))');
query.on('end', function() { client.end(); });
