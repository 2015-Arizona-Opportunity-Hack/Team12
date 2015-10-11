var pg = require('pg');
var path = require('path');
var connectionString = require(path.join(__dirname, '../', 'config'));


var client = new pg.Client(connectionString);
client.connect();
var query = client.query(' CREATE TABLE user_interests(emailid text NOT NULL,user_interests text NOT NULL)');
query.on('end', function() { client.end(); });