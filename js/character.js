(function (global) {
    'use strict';
    global.Character = new Class({
        position: new Proxy({x: 0, y: 0}, {
            set: function (obj, attr, value) {
                obj[attr] = value;
                if (attr === 'x' || attr === 'y') {
                    if (obj.x < -100) {
                        obj.parent.game.gameOver();
                        obj.x -= 200;
                    }
                    Utils.moveBody(obj.parent.body, obj);
                }
                return true;
            }
        }),
        initialize: function (start, bodyURL, name, controls) {
            this.body = Utils.createBody(bodyURL, start);
            this.position.parent = this;
            this.position.x = start.x;
            this.position.y = start.y;
            this.moves = new Moves(this);
            this.controls = new Controls(controls);
            this.name = name;
            console.log('Character initialized');
        },
        addListeners: function () {
            this.controls.addListeners(this);
            console.log(this.name + '\'s listeners added');
        }
    });
}(this));