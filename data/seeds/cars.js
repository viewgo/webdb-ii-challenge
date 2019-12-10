exports.seed = function(knex) {
  // Deletes ALL existing entries
  return (
    // REMEMBER TO CHANGE THE TABLE_NAME IN BOTH PLACES
    knex("cars")
      //.del() // does not reset the id
      .truncate() //empties table and resets primary id
      .then(function() {
        // Inserts seed entries
        return knex("cars").insert([
          {
            VIN: 1234567890,
            make: "Ford",
            model: "Fiesta",
            Mileage: 110000,
            Transmission: "5 Speed Manual",
            Title_Status: "Clean"
          }
        ]);
      })
  );
};
