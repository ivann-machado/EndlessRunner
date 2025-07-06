(function () {
    'use strict';
    var integer = 0;
    var Game = new Class({
        attributes: new Proxy({
            ready: false,
            pause: false,
            score: 0,
            level: 1,
            distance: 0,
        }, {
            set: function (obj, attr, value) {
                obj[attr] = value;
                switch (attr) {
                    case 'score':
                    score.innerText = value;
                    break;
                    case 'distance':
                    if (value === 0) {
                        obj.level = 1;
                        this.changeTheme(obj, 1);
                    }
                    if (value >= 1200) {
                        if (obj.level === 1) {
                            obj.level = 2;
                            this.changeTheme(obj, 2);
                        }
                    }
                    if (value >= 10000) {
                        if (obj.level === 2) {
                            obj.level = 3;
                            this.changeTheme(obj, 3);
                        }
                    }
                    if (value >= 25000) {
                        if (obj.level === 3) {
                            obj.level = 4;
                            this.changeTheme(obj, 4);
                        }
                    }
                    break;
                }
                return true;
            },
            changeTheme: function (obj, level) {
                if (obj.parent.song) {
                    obj.parent.song.pause();
                    obj.parent.song.currentTime = 0;
                    console.log('Level changed to ' + obj.level);
                }
                obj.parent.song = Utils.LevelTheme[level];
                obj.parent.song.play();
                obj.parent.song.loop = true;
            }
        }),
        characters: [],
        name: 'Game',
        onplay: false,
        initialize: function (characters) {
            this.attributes.parent = this;
            this.onplay = false;
            this.gameIsOver = false;
            this.screen = new Screen(this);
            this.characters = [];
            this.addCharacters(characters);
            this.addListeners();
            this.platforms = new Platforms();
            this.screen.startScreen();
            this.song = Utils.StartScreenTheme;
            this.song.play();
            this.song.loop = true;
            Utils.game = this;
            Utils.highscore.getHs();
            console.log('Game initialized');
        },
        play: function () {
            this.screen.gameScreen();
            this.platforms.startPlatforms();
            this.attributes.ready = true;
            this.attributes.score = 0;
            this.attributes.distance = 0;
            this.characters[0].position.x = 0;
            this.characters[0].position.y = window.innerHeight - 88 - 160;
        },
        stop: function () {
            this.attributes.ready = false;
            this.onplay = false;
            this.gameIsOver = false;
            this.attributes.pause = false;
            this.characters[0].falling = false;
            this.characters[0].jumping = false;
            Utils.keyMap = {};
        },
        begin: function () {
            var self = this;
            this.int = setInterval(function () {
                if (!self.attributes.pause) {
                    requestAnimationFrame(function () {
                        Utils.moveMap(1 * (self.attributes.level * self.attributes.level), self);
                        self.attributes.score += 1 * self.attributes.level;
                        self.attributes.distance += 1 * self.attributes.level;
                        if (self.platforms.self.length * 89 < window.innerWidth + 89) {
                            self.platforms.generateMap();
                        }
                    });
                }
            }, 10);
        },
        gameOver: function () {
            var self = this;
            if (!self.gameIsOver) {
                self.gameIsOver = true;
                clearInterval(self.int);
                Utils.SFX.falling.play();
                setTimeout(function () {
                    self.song.pause();
                    self.screen.gameOverScreen();
                    Utils.highscore.setHs(self.attributes.score);
                    self.stop();
                    Utils.SFX.gameOver.play();
                }, 1000);
            }
        },
        addListeners: function () {
            var self = this;
            self.characters.forEach(function (element) {
                element.addListeners();
            });
            document.addEventListener('keyup', function (e) {
                if (e.key === 'Escape' && self.attributes.ready) {
                    self.attributes.pause = !self.attributes.pause;
                    self.screen.pauseScreen();
                }
            });
            document.addEventListener('keydown', function (e) {
                if (self.attributes.ready && !self.onplay) {
                    self.onplay = true;
                    self.begin();
                }
            });
            document.addEventListener('click', function (e) {
                switch (e.target.id) {
                    case 'play':
                        self.play();
                        break;
                    case 'back':
                        self.screen.startScreen();
                        break;
                    case 'startscreen':
                        self.screen.startScreen();
                        if (self.song) {
                            self.song.currentTime = 0;
                        }
                        self.song = Utils.StartScreenTheme;
                        self.song.play();
                        self.song.loop = true;
                        break;
                    case 'credits':
                        self.screen.creditsScreen();
                        break;
                    case 'controls':
                    self.screen.controlsScreen();
                        break;
                    case 'sound':
                        self.screen.soundScreen();
                        break;
                    case 'master':
                        self.screen.changeSoundScreen('Master');
                        Utils.listenVolumeChange('masterVolume');
                        break;
                    case 'theme':
                        self.screen.changeSoundScreen('Theme');
                        Utils.listenVolumeChange('themeVolume');
                        break;
                    case 'sfx':
                        self.screen.changeSoundScreen('SFX');
                        Utils.listenVolumeChange('SFXVolume');
                        break;
                    case 'backsoundscreen':
                        self.screen.soundScreen();
                        break;
                    case 'highscore':
                        self.screen.highscoreScreen();
                        break;
                    case 'jump':
                        self.characters[0].controls.changeControl('jump', self);
                        break;
                    case 'left':
                        self.characters[0].controls.changeControl('left', self);
                        break;
                    case 'right':
                        self.characters[0].controls.changeControl('right', self);
                        break;
                }
            });
            console.log('Game\'s charaters\' listeners ready');
        },
        addCharacters: function (characters) {
            var self = this;
            characters.forEach(function(element) {
                self.addGameToCharacters(element);
                self.characters.push(element);
            });
        },
        addGameToCharacters: function (character) {
            character.game = this;
        }
    });
document.addEventListener('DOMContentLoaded', function () {
    var characterStartPosition = {x: 0, y: window.innerHeight - 160 - 88};
    var character = new Character(characterStartPosition, 'img/idleright.gif', 'Francesca', {jump: ' ', left: 'q', right: 'd'});
    var One = new Game([character]);
    });
}());
