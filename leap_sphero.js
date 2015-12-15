"use strict";

var Cylon = require("cylon");

var TURN_TRESHOLD = 0.2,
    TURN_SPEED_FACTOR = 2.0;

var DIRECTION_THRESHOLD = 0.25,
    DIRECTION_SPEED_FACTOR = 0.05;

var UP_CONTROL_THRESHOLD = 50,
    UP_SPEED_FACTOR = 0.01,
    CIRCLE_THRESHOLD = 1.5;

var handStartPosition = [],
    handStartDirection = [];

var handWasClosedInLastFrame = false;

Cylon.robot({
    connections: {
        sphero: { adaptor: 'sphero', port: '/dev/tty.Sphero-WRR-AMP-SPP' },
        keyboard: { adaptor: "keyboard" },
        leapmotion: { adaptor: "leapmotion" }
    },

    devices: {
        sphero: { driver: 'sphero' },
        keyboard: { driver: "keyboard", connection: "keyboard" },
        leapmotion: { driver: "leapmotion", connection: "leapmotion" }
    },

    work: function (my) {
        my.keyboard.on("right", function () {
            my.sphero.roll(60, 270);
        });
        my.keyboard.on("left", function () {
            my.sphero.roll(60, 90);
        });
        my.keyboard.on("up", function () {
            my.sphero.roll(60, 0);
        });
        my.keyboard.on("down", function () {
            my.sphero.roll(60, 180);
        });
    }
}).start();