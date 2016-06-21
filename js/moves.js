(function (global) {
    'use strict';
    global.Moves = new Class({
        jumpPower: 0,
        speed: 0,
        initialize: function (boundTo) {
            this.boundTo = boundTo;
            this.boundTo.actualStance = 'standing';
            this.name = 'Moves';
            console.log('Moves initialized');
        },
        jump: function () {
            var self = this;
            self.jumpPower = 45;
            self.boundTo.jumping = true;
            if (self.boundTo.actualStance === 'moving-left') {
                Utils.changeStance(self.boundTo.body, 'img/jumpleft.gif');
            }
            else {
                Utils.changeStance(self.boundTo.body, 'img/jumpright.gif');
            }
            Utils.SFX.jump.currentTime = 0;
            Utils.SFX.jump.play();
            var int = setInterval(function () {
                if (!self.boundTo.game.attributes.pause) {
                    requestAnimationFrame(function () {
                        var under = Utils.checkUnder(self.boundTo.position, Math.abs(self.jumpPower));
                        var nextPosition = self.boundTo.position;
                        if (under && self.jumpPower < 0) {
                            nextPosition.y += under;
                        }
                        else {
                            nextPosition.y -= self.jumpPower;
                        }
                        if (self.jumpPower > -50) {
                            self.jumpPower -= 5;
                        }
                        if (under && self.jumpPower < 0) {
                            self.boundTo.jumping = false;
                            if (self.moving) {
                                if (self.boundTo.actualStance === 'moving-right') {
                                    Utils.changeStance(self.boundTo.body, 'img/movementright.gif');
                                }
                                else if (self.boundTo.actualStance === 'moving-left') {
                                    Utils.changeStance(self.boundTo.body, 'img/movementleft.gif');
                                }
                            }
                            else {
                                if (self.boundTo.actualStance === 'moving-left') {
                                    Utils.changeStance(self.boundTo.body, 'img/idleleft.gif');
                                }
                                else {
                                    Utils.changeStance(self.boundTo.body, 'img/idleright.gif');
                                }
                            }
                            clearInterval(int);
                        }
                        else if (self.boundTo.body.offsetTop > window.outerHeight) {
                            clearInterval(int);
                            self.boundTo.game.gameOver();
                        }
                    });
                }
            }, 17);
        },
        fall: function () {
            var self = this;
            var under = Utils.checkUnder(self.boundTo.position, self.fallingSpeed);
            if (!under) {
                if (self.boundTo.actualStance === 'moving-left') {
                    Utils.changeStance(self.boundTo.body, 'img/jumpleft.gif');
                }
                else {
                    Utils.changeStance(self.boundTo.body, 'img/jumpright.gif');
                }
                if (!self.boundTo.falling) {
                    self.fallingSpeed = 0;
                    self.boundTo.falling = true;
                    var int = setInterval(function () {
                        if (!self.boundTo.game.attributes.pause) {
                            requestAnimationFrame(function () {
                                under = Utils.checkUnder(self.boundTo.position, self.fallingSpeed);
                                var nextPosition = self.boundTo.position;
                                if (under) {
                                    nextPosition.y += under;
                                }
                                else {
                                    nextPosition.y += self.fallingSpeed;
                                }
                                if (self.fallingSpeed < 50) {
                                    self.fallingSpeed += 5;
                                }
                                if (under) {
                                    self.boundTo.falling = false;
                                    if (self.moving) {
                                        if (self.boundTo.actualStance === 'moving-right') {
                                            Utils.changeStance(self.boundTo.body, 'img/movementright.gif');
                                        }
                                        else if (self.boundTo.actualStance === 'moving-left') {
                                            Utils.changeStance(self.boundTo.body, 'img/movementleft.gif');
                                        }
                                    }
                                    else {
                                        if (self.boundTo.actualStance === 'moving-left') {
                                            Utils.changeStance(self.boundTo.body, 'img/idleleft.gif');
                                        }
                                        else {
                                            Utils.changeStance(self.boundTo.body, 'img/idleright.gif');
                                        }
                                    }
                                    clearInterval(int);
                                }
                                else if (self.boundTo.body.offsetTop > window.outerHeight) {
                                    clearInterval(int);
                                    self.boundTo.game.gameOver();
                                }
                            });
                        }
                    }, 25);
                }
            }
        },
        toLeft: function () {
            var self = this;
            self.speed = 1;
            self.boundTo.actualStance = 'moving-left';
            if (!self.moving) {
                var int = setInterval(function () {
                    if (!self.boundTo.game.attributes.pause) {
                        if (self.boundTo.body.src !== 'img/movementleft.gif' && !self.boundTo.jumping && !self.boundTo.falling) {
                            Utils.changeStance(self.boundTo.body, 'img/movementleft.gif');
                        }
                        else if (self.boundTo.body.src !== 'img/jumpleft.gif') {
                            Utils.changeStance(self.boundTo.body, 'img/jumpleft.gif');
                        }
                        self.moving = true;
                        requestAnimationFrame(function () {
                            var nextPosition = self.boundTo.position;
                            var collision = Utils.checkCollision(nextPosition, 5 * self.speed, false);
                            if (self.boundTo.actualStance === 'moving-left' && self.boundTo.body.offsetLeft + 50 > 0 && collision !== 0) {
                                if (collision !== false) {
                                    nextPosition.x -= collision;
                                }
                                else {
                                    nextPosition.x -= 5 * self.speed;
                                }
                                if (self.speed > 0) {
                                    self.speed -= 0.05;
                                }
                                else {
                                    self.speed = 0;
                                }
                                if (!self.boundTo.jumping && !self.boundTo.falling) {
                                    Utils.SFX.footstep.play();
                                }
                                if (Utils.checkUnder(self.boundTo.position, 1) === false && !self.boundTo.jumping && !self.boundTo.falling) {
                                    self.fall();
                                }
                                if (self.speed === 0 || collision !== false) {
                                    self.moving = false;
                                    Utils.changeStance(self.boundTo.body, 'img/idleleft.gif');
                                    clearInterval(int);
                                }
                            }
                            else {
                                self.moving = false;
                                if (!self.boundTo.jumping && !self.boundTo.falling) {
                                    Utils.changeStance(self.boundTo.body, 'img/idleleft.gif');
                                }
                                clearInterval(int);
                            }
                        });
                    }
                }, 10);
            }
        },
        toRight: function () {
            var self = this;
            self.speed = self.boundTo.game.attributes.level;
            self.boundTo.actualStance = 'moving-right';
            if (!self.moving) {
                var int = setInterval(function () {
                    if (!self.boundTo.game.attributes.pause) {
                        if (self.boundTo.body.src !== 'img/movementright.gif' && !self.boundTo.jumping && !self.boundTo.falling) {
                            Utils.changeStance(self.boundTo.body, 'img/movementright.gif');
                        }
                        else if (self.boundTo.body.src !== 'img/jumpright.gif') {
                            Utils.changeStance(self.boundTo.body, 'img/jumpright.gif');
                        }
                        self.moving = true;
                        requestAnimationFrame(function () {
                            var nextPosition = self.boundTo.position;
                            var collision = Utils.checkCollision(nextPosition, (5 + self.speed - 1) * self.speed, true);
                            if (self.boundTo.actualStance === 'moving-right' && self.boundTo.body.offsetLeft < window.innerWidth - 100 && collision !== 0) {
                                if (collision !== false) {
                                    nextPosition.x += collision;
                                }
                                else {
                                    nextPosition.x += (5 + self.speed - 1) * self.speed;
                                }
                                if (self.speed > 0) {
                                    self.speed -= 0.05;
                                }
                                else {
                                    self.speed = 0;
                                }
                                if (!self.boundTo.jumping && !self.boundTo.falling) {
                                    Utils.SFX.footstep.play();
                                }
                                if (Utils.checkUnder(self.boundTo.position, 1) === false && !self.boundTo.jumping && !self.boundTo.falling) {
                                    self.fall();
                                }
                                if (self.speed === 0 || collision !== false) {
                                    self.moving = false;
                                    Utils.changeStance(self.boundTo.body, 'img/idleright.gif');
                                    clearInterval(int);
                                }
                            }
                            else {
                                self.moving = false;
                                if (!self.boundTo.jumping && !self.boundTo.falling) {
                                    Utils.changeStance(self.boundTo.body, 'img/idleright.gif');
                                }
                                clearInterval(int);
                            }
                        });
                    }
                }, 10);
            }
        },
        squat: function () {
            //To do
        }
    });
}(this));