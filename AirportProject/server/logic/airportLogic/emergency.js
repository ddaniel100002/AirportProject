const createDeadLockPlane = () => {
    let newFlight = {
        flightId: "",
        flightNumber: "Deadlock Plane",
        currentStation: 1,
        prevStation: 0,
        nextStation: [2],
        isInAirport: true,
        color: "yellow",
        isCrashed: false
    };
    return newFlight;
};

module.exports = {createDeadLockPlane};