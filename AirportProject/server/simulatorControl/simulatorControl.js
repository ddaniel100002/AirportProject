const tryToSendPlane = require('../../simulator/simulator');
let startSimulator;

const simulator = (isActivated) => {
    if (isActivated) {
        startSimulator = setInterval(tryToSendPlane, Math.floor(Math.random() * 1000));
    }
    else {
        clearInterval(startSimulator);
    }
}

module.exports = simulator;