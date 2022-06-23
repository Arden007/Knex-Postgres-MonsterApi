const express = require("express");

// for use to pass json we need to require the body-parser
const bodyParser = require("body-parser");

// lets import our router so we can use our routes
const monsters = require("./routes/monsters");
const habitats = require("./routes/habitats");
const lives = require("./routes/lives");

const app = express();

// to allow our app to use body-parser
app.use(bodyParser.json());

// Allows us to use our monsters route
app.use("/monsters", monsters);

// Allows us to use our habitats route
app.use("/habitats", habitats);

// Allows us to use our lives route
app.use("/lives", lives);

// now we will need access to our pool that allows us to make use of query but we need to export it first & import it

// // GET ALL
// app.get("/monsters", (request, response, next) => {
//     pool.query("SELECT * FROM monsters ORDER BY id ASC", (err, res) => {
//       if (err) return next(err);

//       response.json(res.rows);
//     });
// });

// // GET BY ID
// app.get("/monsters/:id", (request, response, next) => {
//     const { id } = request.params;

//     // WHERE CALSUE matches the id from the request and data ,note that we use a $1 this a special syntax that represent the id and the next parameter we pass in [1], we do this cause the first index of our array of data we hit will be 1
//     pool.query("SELECT * FROM monsters WHERE id = $1", [id] , (err, res) => {
//         if (err) return next(err);

//         response.json(res.rows);
//     })
// });

// our err middleware needs to be declared after our get function as the next parameter looks for the the function/middleware to fire
app.use((err, req, res, next) => {
  res.json(err);
});

// now that we have the top query getting all our data lets make sure the app is listening the port
// const port = 5000;

// app.listen(port , () => console.log(`Listening on ${port}`));

// Lets create a excutalbe that will start up our app under the bin folder in www file
// now we need to grab the above code and past it in the www file

module.exports = app;
