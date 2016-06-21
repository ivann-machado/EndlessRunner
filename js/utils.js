(function (global) {
    'use strict';
    global.gameContent = document.getElementById('gameContent');
    global.gameChildren = gameContent.children;
    global.score = document.getElementById('score');
    global.Utils = {
        createBody: function (bodyURL, start) {
            var body = document.createElement('div');
            Object.assign(body.style, {position: 'absolute', height: '160px', width: '150px', backgroundColor: '',backgroundImage: 'url(' + bodyURL + ')', backgroundPosition: '0px -10px'});
            gameContent.appendChild(body);
            return body;
        },
        moveBody: function (body, position) {
            Object.assign(body.style, {top: position.y + 'px', left: position.x + 'px' });
        },
        changeStance: function (body, bodyURL) {
            requestAnimationFrame(function () {
                Object.assign(body.style, {backgroundImage: 'url(' + bodyURL + ')'});
            });
        },
        highscore: {
            hs: [],
            getHs: function () {
                this.hs = JSON.parse(localStorage.getItem('highscore')) || [];
            },
            setHs: function (score) {
                this.hs.push(score);
                this.hs.sort(function (a, b) {
                    return b - a;
                });
                this.hs = this.hs.slice(0, 10);
                localStorage.setItem('highscore', JSON.stringify(this.hs));
            }
        },
        checkUnder: function (position, speed) {
            var i;
            var x;
            for (i = 0; i <= speed; i += 1) {
                for (x = -20; x <= 20; x += 20) {
                    if (document.elementFromPoint(position.x + x + 75 - window.pageXOffset, position.y + 160 + i - window.pageYOffset) && document.elementFromPoint(position.x + x + 75 - window.pageXOffset, position.y + 160 + i - window.pageYOffset).classList.contains('floor')) {
                        return i;
                    }
                }
            }
            return false;
        },
        checkCollision: function (position, speed, forward) {
            var i;
            var y;
            if (forward) {
                for (i = 0; i <= speed; i += 1) {
                    for (y = 19; y < 160; y += 25) {
                        if (document.elementFromPoint(position.x + 100 + i - window.pageXOffset, position.y + y - window.pageYOffset) && document.elementFromPoint(position.x + 100 + i - window.pageXOffset, position.y + y - window.pageYOffset).classList.contains('floor')) {
                            return i;
                        }
                    }
                }
            }
            else {
                for (i = 0; i <= speed; i += 1) {
                    for (y = 19; y < 160; y += 25) {
                        if (document.elementFromPoint(position.x + 50 - i - window.pageXOffset, position.y + y - window.pageYOffset) && document.elementFromPoint(position.x + 50 - i - window.pageXOffset, position.y + y - window.pageYOffset).classList.contains('floor')) {
                            return i;
                        }
                    }
                }
            }
            return false;
        },
        moveMap: function (length, game) {
            var i;
            var platformsLength = game.platforms.self.length;
            for (i = 0; i < platformsLength; i++) {
                if (game.platforms.self[i]) {
                    game.platforms.self[i].position.x -= length;
                }
            }
            game.characters[0].position.x -= length;
        },
        masterVolume: 1,
        themeVolume: 1,
        SFXVolume: 1,
        StartScreenTheme: new Audio('sound/SongLevel/8BitMetal.wav'),
        LevelTheme: {
            1: new Audio('sound/SongLevel/Level0.wav'),
            2: new Audio('sound/SongLevel/Level1.wav'),
            3: new Audio('sound/SongLevel/Level2.wav'),
            4: new Audio('sound/SongLevel/Level3.wav'),
        },
        SFX: {
            jump: new Audio('sound/SFX/Jump.mp3'),
            footstep: new Audio('sound/SFX/Footstep.wav'),
            falling: new Audio('sound/SFX/Falling.wav'),
            gameOver: new Audio('sound/SFX/Game Over.mp3'),
        },
        listenVolumeChange: function (from) {
            var self = this;
            var layoutContainer = document.getElementById('layoutcontainer');
            var layout = layoutContainer.children[0];
            layout.style.width = (self[from] * 100) + '%';
            var click = false;
            function volumeHandler(e) {
                var position = e.pageX - layoutContainer.offsetLeft;
                position = position < 0 ? 0 : (position > 300 ? 300 : position);
                layout.style.width = (position / 300 * 100) + '%';
                self[from] = position / 300;
                self.changeVolume();
            }
            layoutContainer.addEventListener('mousedown', function (e) {
                volumeHandler(e);
                click = true;
            });
            document.addEventListener('mousemove', function (e) {
               if (click) {
                volumeHandler(e);
               }
            });
            document.addEventListener('mouseup', function (e) {
                click = false;
            });
        },
        changeVolume: function () {
            var themeVolume = this.masterVolume * this.themeVolume;
            var SFXVolume = this.masterVolume * this.SFXVolume;
            var i;
            for (i = 1; i <= 4; i += 1) {
                this.LevelTheme[i].volume = themeVolume;
            }
            this.game.song.volume = themeVolume;
            this.SFX.jump.volume = SFXVolume;
            this.SFX.footstep.volume = SFXVolume;
            this.SFX.falling.volume = SFXVolume;
            this.SFX.gameOver.volume = SFXVolume;
        },
        keyMap: {}
    };

}(this));