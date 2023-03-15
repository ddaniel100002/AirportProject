let stations = {
    1: {
        isOccupied: false,
        prevStation: 0,
        nextStation: [2],
        isTowerLogicRequired: false,
        flightNumber: []

    },
    2: {
        isOccupied: false,
        prevStation: 1,
        nextStation: [3],
        isTowerLogicRequired: false,
        flightNumber: []
    },
    3: {
        isOccupied: false,
        prevStation: 2,
        nextStation: [4],
        isTowerLogicRequired: false,
        flightNumber: []
    },
    4: {
        isOccupied: false,
        prevStation: 3,
        nextStation: [ 5, 9 ],
        isTowerLogicRequired: false,
        flightNumber: []
    },
    5: {
        isOccupied: false,
        prevStation: 4,
        nextStation: [ 6, 7 ],
        isTowerLogicRequired: true,
        flightNumber: []
    },
    6: {
        isOccupied: false,
        prevStation: 5,
        nextStation: [8],
        isTowerLogicRequired: true,
        flightNumber: []
    },
    7: {
        isOccupied: false,
        prevStation: 5,
        nextStation: [8],
        isTowerLogicRequired: true,
        flightNumber: []
    },
    8: {
        isOccupied: false,
        prevStation: [ 6, 7 ],
        nextStation: [9],
        isTowerLogicRequired: true,
        flightNumber: []
    },
    9: {
        isOccupied: false,
        prevStation: 4,
        nextStation: [10],
        isTowerLogicRequired: false,
        flightNumber: []
    },
    10: {
        isOccupied: false,
        prevStation: 9,
        nextStation: [null],
        isTowerLogicRequired: false,
        flightNumber: []

    },
    100: {
        isOccupied: false,
        prevStation: 9,
        nextStation: [null],
        isTowerLogicRequired: false,
        flightNumber: []

    }
}

module.exports = stations;
