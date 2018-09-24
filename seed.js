const db = require("./models");
const { vegetable, plot, gardener } = db.models;

db.sync({ force: true })
  .then(() => {
    console.log("Database synced!");
  })
  .then(() => {
    vegetable.bulkCreate([
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
    return vegetable.findAll();
  })
  .then(v => {
    gardener.bulkCreate([
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
    return gardener.findAll();
  })
  .then((g) => {
    return plot.bulkCreate([
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
