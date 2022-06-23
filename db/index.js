const { Pool } = require("pg");
// host the set-up code for node postgres
// first we need to grab the pool class from the PG model right way
// the poll class will allow us to run queries(SQL) based on the data in our db
const {user, host, database, password, port} =require("../secrets/db_configuration")

// the new pool instance we declare below can be thought of as a fetch method by declaring the DATABASE & URL run the same concept
// now that we imported the data from db_configuration.js file we can write our code below
// now the trick to hiding our import data is to have a gitignore file that ignores db_configuration.js file
const pool = new Pool({user, host, database, password, port});
// now we need to import the data from db_configuration.js file and write the pool const

// THIS IS THE BODY OF THE FETCH THAT WILL RETURN TO US THE DATA
// now that we have the pool configured ,lets run a query using it contant query method to select all the monsters in the database
// note that the SQL command is stated inside the pool query method in as a string ,this is only aviable throught the pg model
//then we run a caalback function that fires after the command has been completed

// pool.query("SELECT * FROM monsters", (err, res) => {
//   if (err) return console.log(err);

//   console.log(res);
// });

// Since we don't have have our normall script file we can go back to the terminal and run NODE DB , don't forget to \q to exist postgres

// as we saw our data is totally unprotected to protect our data let create a screets file to protect our data


// NOW THAT WE HAVE A WAY TO GET OUR INFORMATION LETS CREATE A CRUD SYSTEM LIKE WE NORMALLY WOULD WITH OUR APP.JS FILE


module.exports = pool;