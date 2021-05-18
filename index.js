// Import packages
const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const uuidv1 = require("uuidv1");

const fs = require("fs");

// Aplicatia
const app = express();

// Middleware
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

// Link SPA static files 
app.use("/", express.static('spa'));

// Create
app.post("/places", (req, res) => {
  const placesList = readJSONFile();
  const newPlace = req.body;
  newPlace.id = uuidv1();
  const newPlaceList = [...placesList, newPlace];
  writeJSONFile(newPlaceList);
  res.json(newPlace);
});

// Read One
app.get("/places/:id", (req, res) => {
  const placesList = readJSONFile();
  const id = req.params.id;
  let idFound = false;
  let foundPlace;

  placesList.forEach(place => {
    if (id === place.id) {
      idFound = true;
      foundPlace = place
    }
  });

  if (idFound) {
    res.json(foundPlace);
  } else {
    res.status(404).send(`Place ${id} was not found`);
  }
});

// Read All
app.get("/places", (req, res) => {
  const placesList = readJSONFile();
  res.json(placesList);
});

// Update
app.put("/places/:id", (req, res) => {
  const placesList = readJSONFile();
  const id = req.params.id;
  const newPlace = req.body;
  newPlace.id = id;
  idFound = false;

  const newPlacesList = placesList.map((place) => {
     if (place.id === id) {
       idFound = true;
       return newPlace
     }
    return place
  })
  
  writeJSONFile(newPlacesList);

  if (idFound) {
    res.json(newPlace);
  } else {
    res.status(404).send(`Place ${id} was not found`);
  }
});

// Delete
app.delete("/places/:id", (req, res) => {
  const placesList = readJSONFile();
  const id = req.params.id;
  const newPlacesList = placesList.filter((place) => place.id !== id)

  if (placesList.length !== newPlacesList.length) {
    res.status(200).send(`Place ${id} was removed`);
    writeJSONFile(newPlacesList);
  } else {
    res.status(404).send(`Place ${id} was not found`);
  }
});

// Functia de citire din fisierul db.json
function readJSONFile() {
  return JSON.parse(fs.readFileSync("db.json"))["places"];
}

// Functia de scriere in fisierul db.json
function writeJSONFile(content) {
  fs.writeFileSync(
    "db.json",
    JSON.stringify({ places: content }),
    "utf8",
    err => {
      if (err) {
        console.log(err);
      }
    }
  );
}

// Pornim server-ul
app.listen("3000", () =>
  console.log("Server started at: http://localhost:3000")
);