exports.up = function(knex) {
  return knex.schema.createTable("cars", function(cars) {
    cars.increments();

    cars
      .integer("VIN")
      .notNullable()
      .unique();
    cars.string("Make", 128).notNullable();
    cars.string("Model").notNullable();
    cars.float("Mileage").notNullable();
    cars.string("Transmission", 128);
    cars.string("Title_Status", 128);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("cars");
};
