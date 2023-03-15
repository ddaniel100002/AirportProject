const simulator = require('../../simulatorControl/simulatorControl');
const planeLogic = require('../planeLogic/planeLogic');
const repository = require('../../repository/repository');
let planes = require('../../models/planes');
let stations = require('../../models/stations');
let startMovement;

const addPlaneToPlanesArray = (plane) => {
    planes.push(plane);
}

const setStations = (plane) => {
    stations[plane.currentStation].isOccupied = true;
    stations[plane.currentStation].flightNumber.push(plane.flightNumber);
    if (plane.currentStation !== 1) {
        stations[plane.prevStation].isOccupied = false;
        stations[plane.prevStation].flightNumber = [];
    }
}

const checkStationsForCrashes = (plane) => {
    if (plane.currentStation !== 10 && stations[plane.currentStation].flightNumber.length > 1) {
        const crashedPlanes = planes.filter(p => p.currentStation === plane.currentStation);
        setFire(crashedPlanes);
        movement(false);
        simulator(false);
        handlePlanesAndStationsWhileEvacuating(crashedPlanes, plane.currentStation);
        activateClearance(crashedPlanes);
    }
};

const setFire = (crashedPlanes) => {
    crashedPlanes.forEach(p => {
        p.isCrashed = true;
        repository.updatePlaneInDB(p);
    });
};

const movement = (isActivated) => {
    if (isActivated) {
        startMovement = setInterval(movementHandler, 1500);
    } else {
        clearInterval(startMovement);
    }
};

const movementHandler = () => {
    if (planes) {
        planes.forEach((plane) => {
            if (plane.currentStation === 6 || plane.currentStation === 7) {
                setTimeout(() => {
                    planeLogic(plane);
                }, Math.floor(Math.random() * (10000) + 5000));
            } else {
                setTimeout(() => {
                    planeLogic(plane);
                }, Math.floor(Math.random() * 750));
            }
        })
    }
};

const handlePlanesAndStationsWhileEvacuating = (crashedPlanes, stationCrashed) => {
    setTimeout(() => {
        crashedPlanes.forEach(p => {
            p.isCrashed = false;
            updateEmergencyStation(p);
            repository.updatePlaneInDB(p);
        });
        stations[stationCrashed].flightNumber = [];
        stations[stationCrashed].isOccupied = false;
        movement(true);
        simulator(true);
    }, 10000);
}

const activateClearance = (crashedPlanes) => {
    setTimeout(() => {
        crashedPlanes.forEach(p => {
            p.isInAirport = false;
            repository.updatePlaneInDB(p);
        });
    }, 12000);
};

const updateEmergencyStation = (p) => {
    if (stations[p.nextStation[0]].flightNumber === p.flightNumber) {
        stations[p.nextStation[0]].flightNumber === [];
        stations[p.nextStation[0]].isOccupied = false;
    }
    p.prevStation = p.currentStation;
    p.currentStation = 100;
    stations[100].flightNumber.push(p.flightNumber);
    planes.splice(planes.indexOf(p), 1);
}

const handleDeadlock = (plane) => {
    if (planes.length > 4 && plane.currentStation === 4 && planes[4].flightId === plane.flightId) {
        const plane5 = planes.find(plane => plane.currentStation === 4);
        if (plane5) {
            activateDeadlock(plane5);
        }
    }
}

const activateDeadlock = (plane5) => {
    simulator(false);
    setTimeout(() => {
        changeStationToDeadLockPlane(plane5);
        simulator(true);
    }, 5000);
}

const changeStationToDeadLockPlane = (plane5) => {
    plane5.prevStation = 8;
    plane5.nextStation[0] = 9;
}

const updateAirportFromDB = (planesFromDB) => {
    planesFromDB.forEach(p => {
        planes.push(p);
        stations[p.currentStation].isOccupied = true;
        stations[p.currentStation].flightNumber.push(p.flightNumber);
    });
}

module.exports = { movement, addPlaneToPlanesArray, setStations, changeStationToDeadLockPlane, checkStationsForCrashes, movementHandler, handleDeadlock, updateAirportFromDB };