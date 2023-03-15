require('dotenv').config();
const mongoose = require('mongoose');
const towerLogic = require('./logic/towerLogic/towerLogic');
const express = require('express');
const cors = require('cors');
const simulator = require('./simulatorControl/simulatorControl');
const axios = require('axios');
const repository = require('./repository/repository');
const airportLogic = require('./logic/airportLogic/airportLogic');
const emergency = require('./logic/airportLogic/emergency');

const PORT = process.env.PORT;
const URL = process.env.API_URL;
const tower = new towerLogic();

const app = express();

app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGO_DB, { useNewUrlParser: true });

app.get("/getPlanes", (req, res) => {
    repository.getPlanesInAirport(res);
});

app.get("/handleDeadlock", (req, res) => {
    const deadlockPlane = emergency.createDeadLockPlane();
    axios.post(`${URL}/addPlane`, deadlockPlane);
});

app.post("/addPlane", (req, res) => {
    const newPlane = repository.addPlaneToDB(req, res);
    airportLogic.addPlaneToPlanesArray(newPlane);
    airportLogic.setStations(newPlane);
});

app.post("/tryAddingPlane", (req, res) => {
    const plane = req.body;
    tower.checkLandingClearance(plane);
});

app.put("/setPlane", (req, res) => {
    const plane = req.body;
    repository.updatePlaneInDB(plane);
    airportLogic.setStations(plane);
    airportLogic.checkStationsForCrashes(plane);
    airportLogic.handleDeadlock(plane);
});

app.put("/handleSimulator", (req, res) => {
    const request = req.body;
    const isActivated = request.isActivated;
    simulator(isActivated);
});

const onInit = async () => {
    const res = await axios.get(`${URL}/getPlanes`);
    const planesFromDB = await res.data;
    airportLogic.updateAirportFromDB(planesFromDB);
    simulator(false);
    simulator(true);
    airportLogic.movement(true);
}

onInit();

app.listen(PORT, () => {
    console.log('We are Listening on port 5000!');
});