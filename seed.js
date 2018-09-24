const { db, Vegetable, Plot, Gardener } = require("./models");

console.log(db.models);

db.sync({ force: true })
  .then(() => {
    console.log("Database synced!");
  })
  .then(() => {
    Vegetable.bulkCreate([
      {
        name: "Carrot",
        color: "Orange",
        planted_on: new Date()
      },
      {
        name: "Tomato",
        color: "Red",
        planted_on: new Date()
      }
    ]);
  })
  .then(() => {
    return Vegetable.findAll();
  })
  .then(v => {
    Gardener.bulkCreate([
      {
        name: "Jeff",
        age: 23,
        favoriteVegetableId: v[0].id
      },
      {
        name: "Chris",
        age: 54,
        favoriteVegetableId: v[1].id
      }
    ]);
  })
  .then(() => {
    return Gardener.findAll();
  })
  .then((g) => {
    return Plot.bulkCreate([
      {
        size: 300,
        shaded: true,
        gardenerId: g[0].id
      },
      {
        size: 50,
        shaded: false,
        gardenerId: g[1].id
      }
    ]);
  })
  .catch(err => {
    console.log("Disaster! Something went wrong! ");
    console.log(err);
  })
  .finally(() => {
    db.close();
  });
