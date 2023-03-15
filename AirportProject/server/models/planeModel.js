const mongoose = require('mongoose');

const planeSchema = new mongoose.Schema({
    flightId: {
        type: String,
    },
    flightNumber: {
        type: String,
        required: true
    },
    currentStation: {
        type: Number,
        required: true
    },
    prevStation: {
        type: Number
    },
    nextStation: {
        type: [],
        required: true
    },
    isInAirport: {
        type: Boolean,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    isCrashed: {
        type: Boolean,
        required: true
    }
});

const PlaneModel = mongoose.model('planes', planeSchema);
module.exports = PlaneModel;
