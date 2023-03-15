const planeModel = require('../models/planeModel');

const getPlanesInAirport = (res) => {
    planeModel.find({ isInAirport: true }, (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.json(result);
        }
    });
}

const addPlaneToDB = (req, res) => {
    const plane = req.body;
    const newPlane = new planeModel(plane);
    newPlane.flightId = newPlane._id;
    newPlane.save();
    return newPlane;
};

const updatePlaneInDB = (plane) => {
    planeModel.updateOne({ flightId: plane.flightId }, plane, null, function (err, result) {
    });
};

module.exports = { getPlanesInAirport, addPlaneToDB, updatePlaneInDB };


