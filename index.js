"use strict";

var Cylon = require("cylon");
var Victor = require("victor");
var previousPalmPosition;

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
            my.sphero.roll(35, 90);
        });
        my.keyboard.on("left", function () {
            my.sphero.roll(35, 270);
        });
        my.keyboard.on("up", function () {
            my.sphero.roll(35, 0);
        });
        my.keyboard.on("down", function () {
            my.sphero.roll(35, 180);
        });       

        my.leapmotion.on("hand", function (hand) {
            var handOpen = !!hand.fingers.filter(function (f) {
                return f.extended;
            }).length;

            if (handOpen) {
                if (previousPalmPosition) {
                    var delta = new Victor(hand.palmPosition[0] - previousPalmPosition[0], hand.palmPosition[2] - previousPalmPosition[2]);
                    var angle = Math.floor(delta.angle() * 180 / Math.PI + 180);
                    var magnitude = Math.floor(delta.length());

                    if (magnitude > 2) {
                        my.sphero.roll(magnitude * 12, angle);
                    }
                }
            } else {
                my.sphero.stop();
            }

            previousPalmPosition = hand.palmPosition;
        });
    }
}).start();