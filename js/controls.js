(function (global) {
    'use strict';
    global.Controls = new Class({
        initialize: function (controls) {
            this.keys = controls;
            this.name = 'Controls';
            console.log('Controls initialized');
        },
        addListeners: function (self) {
            var once = true;
            var keys = this.keys;
            document.addEventListener('keydown', function (e) {
                e.preventDefault();
                if (!self.game.gameIsOver && self.game.attributes.ready) {
                    Utils.keyMap[e.key.toLowerCase()] = true;
                }
                if (once && !self.game.gameIsOver && self.game.attributes.ready) {
                    once = false;
                    var int = setInterval(function () {
                        if (!self.game.attributes.pause) {
                            if (Utils.keyMap[keys.jump] && !self.jumping && !self.falling) {
                                self.moves.jump();
                            }
                            if (Utils.keyMap[keys.right] && !Utils.keyMap[keys.left]) {
                                self.moves.toRight();
                            }
                            if (Utils.keyMap[keys.left] && !Utils.keyMap[keys.right]) {
                                self.moves.toLeft();
                            }
                        }
                        if (self.game.gameIsOver) {
                            clearInterval(int);
                        }
                    }, 50);
                    document.addEventListener('keyup', function (e) {
                        Utils.keyMap[e.key.toLowerCase()] = false;
                        if (!Utils.keyMap[keys.right] && !Utils.keyMap[keys.left] && !Utils.keyMap[keys.jump]) {
                            once = true;
                            clearInterval(int);
                        }
                    });
                }
            });
            var gamepad = navigator.getGamepads()[0] || false;
            if (gamepad) {
                this.gamepadController(self);
            }
        },
        gamepadController: function (self) {
            function thisController() {
                if (!self.game.attributes.pause && !self.game.gameIsOver) {
                    if (navigator.getGamepads()[0].buttons[1].pressed && !self.jumping && !self.falling) {
                        self.moves.jump();
                        if (self.game.attributes.ready && !self.game.onplay) {
                            self.game.onplay = true;
                            self.game.begin();
                        }
                    }
                    if (navigator.getGamepads()[0].axes[0] > 0.7 || navigator.getGamepads()[0].axes[9] > -1 && navigator.getGamepads()[0].axes[9] < -0.4) {
                        self.moves.toRight();
                        if (self.game.attributes.ready && !self.game.onplay) {
                            self.game.onplay = true;
                            self.game.begin();
                        }
                    }
                    if (navigator.getGamepads()[0].axes[0] < -0.7 || navigator.getGamepads()[0].axes[9] > 0.7 && navigator.getGamepads()[0].axes[9] < 1) {
                        self.moves.toLeft();
                        if (self.game.attributes.ready && !self.game.onplay) {
                            self.game.onplay = true;
                            self.game.begin();
                        }
                    }
                }
                requestAnimationFrame(thisController);
            }
            requestAnimationFrame(thisController);
        },
        changeControl: function (action, game) {
            var self = this;
            function controlChangeHandler(e) {
                if (e.key !== 'Escape') {
                    self.keys[action] = e.key.toLowerCase();
                    game.screen.controlsScreen();
                }
                document.removeEventListener('keyup', controlChangeHandler);
            }
            document.addEventListener('keyup', controlChangeHandler);
        }
    });
}(this));