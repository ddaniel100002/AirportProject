const { default: axios } = require('axios');
const URL = process.env.API_URL;
let stations = require('../../models/stations.js');
let planes = require('../../models/planes');

class TowerLogic {

    async checkLandingClearance(newPlane) {
        if (planes.length < 4 && !stations[1].isOccupied && !stations[2].isOccupied
            && !stations[3].isOccupied && !stations[4].isOccupied) {
            newPlane.currentStation = 1;
            newPlane.nextStation[0] = 2;
            newPlane.isInAirport = true;
            await axios.post(`${URL}/addPlane`, newPlane);
        }
    };

    getPermission(plane) {
        if (plane.currentStation === 5) {
            if (!stations[6].isOccupied) {
                plane.prevStation = plane.currentStation;
                plane.currentStation = plane.nextStation[0];
                plane.nextStation[0] = 8;
                plane.nextStation.pop();
                return plane;
            }
            else if (!stations[7].isOccupied) {
                plane.prevStation = plane.currentStation;
                plane.currentStation = plane.nextStation[1];
                plane.nextStation[0] = 8;
                plane.nextStation.pop();
                return plane;
            }
            return null;
        }
        else if (plane.currentStation === 6 || plane.currentStation === 7) {       
            if (!stations[plane.nextStation[0]].isOccupied) {
                plane.prevStation = plane.currentStation;
                plane.currentStation = plane.nextStation[0];
                plane.nextStation[0] = 4;
                return plane;
            }
            return null;
        }
        else if (plane.currentStation === 8) {
            if (!stations[1].isOccupied && !stations[2].isOccupied && !stations[3].isOccupied && !stations[4].isOccupied) {
                plane.prevStation = plane.currentStation;
                plane.currentStation = 4;
                plane.nextStation[0] = 9;
                return plane;
            }
            return null;
        }
    }
}

module.exports = TowerLogic;