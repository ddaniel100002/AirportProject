const { default: axios } = require('axios');

const tryToSendPlane = () =>  {
    const newPlane = createPlane();
    axios.post('http://localhost:5000' + '/tryAddingPlane', newPlane);
};

const createPlane = () => {
    let newFlight = {
        flightId: "",   
        flightNumber: makeName(6),
        currentStation: 0,
        prevStation: 0,
        nextStation: [1],
        isInAirport: false,
        color: generateColor(),
        isCrashed: false
    }
    return newFlight;
};

const companies = {
    0: 'IS',
    1: 'LY',
    2: 'PC',
    3: 'SN',
    4: 'LH',
    5: 'AC',
    6: 'NH'
};

const generateColor = () => {
    let randomColorString = "#";
    const arrayOfColorFunctions = "0123456789abcdef";
    for (let x = 0; x < 6; x++) {
        let index = Math.floor(Math.random() * 16);
        let value = arrayOfColorFunctions[index];
        randomColorString += value;
    }
    return randomColorString;
};

const makeName = (length) => {   
    let flightNumber = companies[Math.floor(Math.random() * 6.99)];
    let numbers = '0123456789';
    for (let i = 2; i < length; i++) {
        flightNumber += numbers.charAt(Math.floor(Math.random() * numbers.length));
    };
    return flightNumber;
};

module.exports = tryToSendPlane;

