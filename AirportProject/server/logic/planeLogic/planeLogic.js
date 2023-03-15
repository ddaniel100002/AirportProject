const towerLogic = require('../towerLogic/towerLogic');
const { default: axios } = require('axios');
let stations = require('../../models/stations.js');
let planes = require('../../models/planes');

const tower = new towerLogic();
const URL = process.env.API_URL;

const planeLogic = (plane) => {
    if ((plane.currentStation < 4 )) {
        if (!stations[plane.nextStation[0]].isOccupied) {
            plane.prevStation = plane.currentStation;
            plane.currentStation = plane.nextStation[0];
            plane.nextStation[0] = plane.currentStation + 1;
        }
    }
    else if (plane.currentStation === 4 && stations[plane.nextStation[0]].isOccupied === false) {
        if (plane.prevStation === 3) {
            plane.prevStation = plane.currentStation;
            plane.currentStation = plane.nextStation[0];
            plane.nextStation[0] = 6;
            plane.nextStation[1] = 7;
        } else if (plane.prevStation === 8) {
            plane.prevStation = plane.currentStation;
            plane.currentStation = plane.nextStation[0];
            plane.nextStation[0] = 10;
        }
    }
    else if (plane.currentStation > 4 && plane.currentStation < 9) {
        plane = tower.getPermission(plane);  
        if (plane === null){
            return;
        }
    }
    else if (plane.currentStation === 9) {
        plane.prevStation = plane.currentStation;
        plane.currentStation = plane.nextStation[0];
        plane.nextStation[0] = plane.currentStation + 1;
        plane.isInAirport = false;
        planes.splice(planes.indexOf(plane), 1); 
    }
    else {
        return;
    }

    axios.put(`${URL}/setPlane`, plane);
}

module.exports = planeLogic;


