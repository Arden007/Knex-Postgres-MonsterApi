const { Router } = require("express");
const pool = require("../db");

const router = Router();

// GET ALL
router.get("/", (request, response, next) => {
  pool.query("SELECT * FROM lives", (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

// GET CONDITIONS
router.get("/conditions", (request, response, next) => {

  // WHERE CALSUE matches the id from the request and data ,note that we use a $1 this a special syntax that represent the id and the next parameter we pass in [1], we do this cause the first index of our array of data we hit will be 1
  pool.query("SELECT * FROM lives JOIN habitats ON habitats.name = lives.habitat", (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

// CREATE
router.post("/", (request, response, next) => {
  const { name, climate, temperature } = request.body;

  // remembere we working with queries so we need to use the pool.query method to pass in our query string
  pool.query(
    "INSERT INTO habitats(name, climate, temperature) VALUES ($1, $2, $3)",
    [name, climate, temperature],
    (err, res) => {
      if (err) return next(err);

      //  response.redirect("/monsters");
    }
  );
});

// UPDATE
router.put("/:id", (request, response, next) => {
  const { id } = request.params;

  // for us to update only what is passed into the request body we need to create arrays ,then create i forEach loop to go through the fields, then create an if statement that will only update what it has
  const keys = ["name", "climate", "temperature"];

  const fields = [];
  // Lets write an if statement to check if the key is present in the request body and if so push it to the empty fields array
  keys.forEach((key) => {
    if (request.body[key]) fields.push(key);
  });

  // now lets create a function that runs a query to up date each indivaul field that exist in the request body
  fields.forEach((field, index) => {
    // remembere we working with queries so we need to use the pool.query method to pass in our query string
    pool.query(
      // we will use the update keyword and the specify what data we want to update then set it to $ and the amount or position it is passed into
      // then we will limit the date with a WHERE CALSUE , where the data id matches the request body
      `UPDATE habitats SET ${field}=($1) WHERE id = ($2)`,
      [request.body[field], id],
      (err, res) => {
        if (err) return next(err);

        if (index === fields.length - 1) response.redirect("/monsters");
      }
    );
  });
});

// DELETE
router.delete("/:id", (request, response, next) => {
  const { id } = request.params;

  // we will use the delete keyword , then say which database it should go to ,then use the where keyword to say which record to delete
  pool.query("DELETE FROM habitats WHERE id = ($1)", [id], (err, res) => {
    if (err) return next(err);

    //  response.redirect("/monsters");
  });
});

module.exports = router;
