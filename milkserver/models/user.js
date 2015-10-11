var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://mmuser:mm\@postgres@localhost:5432/postgres';

var client = new pg.Client(connectionString);
client.connect();
var query = client.query('CREATE TABLE user2 (firstname text NOT NULL, lastname text NOT NULL, emailid text NOT NULL, phone text, dob date NOT NULL, addressline1 text, addressline2 text, city text, state text, zip numeric, password text NOT NULL, role text NOT NULL, CONSTRAINT pk_user_id PRIMARY KEY (emailid))');
query.on('end', function() { client.end(); });
