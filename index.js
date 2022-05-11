const ethAirBalloons = require("ethairballoons");
const path = require("path");
const savePath = path.resolve(__dirname + "/contracts");
const express = require("express");
const app = express();
const port = 3000;
app.use(express.json());

const ethAirBalloonsProvider = ethAirBalloons(
  "https://127.0.0.1:8545",
  savePath
);

const Car = ethAirBalloonsProvider.createSchema({
  name: "Patient",
  contractName: "patientContract",
  properties: [
    {
      name: "mobile",
      type: "uint",
      primaryKey: true,
    },
    {
      name: "name",
      type: "bytes32",
    },
    { name: "age", type: "uint" },
    { name: "symtoms", type: "bytes32" },
  ],
});


app.get("/", (req, res) => {
  res.send("EthairBalloons CRUD API!");
});

app.get("/deploy", (req, res) => {
  Car.setAccount('0xFCAd0B19bB29D4674531d6f115237E16AfCE377c')
  Car.deploy(function (err, success) {
    if (!err) {
      res.send("Contract deployed successfully!");
    } else {
      res.send("Contract deployment error" + err);
    }
  });
});

app.post("/create", (req, res) => {
  var newPatientObject = { mobile: 962666685, name: "Balaji", age: 20 };
  Car.save(newPatientObject, function (err, objectSaved) {
    if (!err) {
      res.json(objectSaved);
    } else {
      res.send(err);
    }
  });
});

app.patch("/update/:id", (req, res) => {
  const newPatientObject = req.body;
  Car.updateById(req.params.id, newPatientObject, function (err, objectSaved) {
    if (!err) {
      res.json(objectSaved);
    } else {
      res.send(err);
    }
  });
});

app.get("/find", (req, res) => {
  Car.find(function (err, allObjects) {
    if (!err) {
      res.json(allObjects);
    } else {
      res.send(err);
    }
  });
});


app.get("/find/:id", (req, res) => {
  Car.findById(req.params.id, function (err, found) {
    if (!err) {
      res.json(found);
    } else {
      res.send(err);
    }
  });
});

app.delete("/delete/:id", (req, res) => {
  Car.deleteById(req.params.id, function (err, found) {
    if (!err) {
      res.json({ message: "Object deleted successfully" });
    } else {
      res.send(err);
    }
  });
});

app.listen(port, () => {
  console.log(`EthairBalloons API listening at http://localhost:${port}`);
});
