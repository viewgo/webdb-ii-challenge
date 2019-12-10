const express = require("express");
const knex = require("knex");

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "./data/cars.db3"
  },
  useNullAsDefault: true
});

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then(cars => {
      res.json(cars);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve cars" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .first()
    .then(car => {
      res.json(car);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve car" });
    });
});

router.post("/", (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData)
    .then(ids => {
      db("cars")
        .where({ id: ids[0] })
        .then(newcarEntry => {
          res.status(201).json(newcarEntry);
        });
    })
    .catch(err => {
      console.log("POST error", err);
      res.status(500).json({ message: "Failed to store data" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  console.log(id, changes);

  db("cars")
    .update(changes)
    .where({ id })
    .then(count => {
      res.status(200).json({ message: `${count} car(s) updated` });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error updating the account" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db("cars")
    .where({ id })
    .del()
    .then(count => {
      res.status(200).json({ message: `${count} car deleted` });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ errorMessage: "Error deleting the car" });
    });
});

module.exports = router;
