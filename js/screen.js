(function (global) {
    'use strict';
    global.Screen = new Class({
        initialize: function (game) {
            this.game = game;
            this.name = 'Screen';
            this.screen = document.getElementsByClassName('menuScreen')[0];
            console.log('Screen initialized');
        },
        darkerScreen: function () {
            this.screen.classList.add('darker');
        },
        startScreen: function () {
            this.screen.innerHTML = '';
            this.screen.classList.add('startScreen');
            var title = document.createElement('h1');
            title.innerText = 'Flee From Pangolin';
            var play = document.createElement('div');
            play.id = 'play';
            play.classList.add('menuItem');
            play.innerText = 'Play';
            var controls = document.createElement('div');
            controls.id = 'controls';
            controls.classList.add('menuItem');
            controls.innerText = 'Controls';
            var sound = document.createElement('div');
            sound.id = 'sound';
            sound.classList.add('menuItem');
            sound.innerText = 'Sound';
            var highscore = document.createElement('div');
            highscore.id = 'highscore';
            highscore.classList.add('menuItem');
            highscore.innerText = 'HighScore';
            var credits = document.createElement('div');
            credits.id = 'credits';
            credits.classList.add('menuItem');
            credits.innerText = 'Credits';
            this.screen.appendChild(title);
            this.screen.appendChild(play);
            this.screen.appendChild(controls);
            this.screen.appendChild(sound);
            this.screen.appendChild(highscore);
            this.screen.appendChild(credits);
        },
        creditsScreen: function () {
            this.screen.innerHTML = '';
            var title = document.createElement('h1');
            title.innerText = 'Credits';
            var creditsContainer = document.createElement('div');
            creditsContainer.id = 'creditsContainer';
            creditsContainer.innerHTML = '<p><b>Clouds and sky background :</b> Artwork created by <a target="_blank" href="https://www.patreon.com/ansimuz">Luis Zuno</a> <a target="_blank" href="https://twitter.com/ansimuz">(@ansimuz)</a></p>    ';
            creditsContainer.innerHTML += '<p><b>Game level themes/SFX :</b> <a target="_blank" href="https://www.youtube.com/watch?v=dbACpSy9FWY">Juhani Junkala</a> juhani.junkala@musician.org</p>';
            creditsContainer.innerHTML += '<p><b>Start screen theme :</b> SketchyLogic</p>';
            creditsContainer.innerHTML += '<p><b>Start screen background :</b> <a target="_blank" href="http://cameos.tumblr.com/">cameos</a></p>';
            creditsContainer.innerHTML += '<p><b>Tileset :</b> mauriku</p>';
            creditsContainer.innerHTML += '<p><b>Character :</b> WorldWithoutWords</p>';
            var back = document.createElement('div');
            back.id = 'back';
            back.classList.add('menuItem');
            back.innerText = 'Back';
            this.screen.appendChild(title);
            this.screen.appendChild(creditsContainer);
            this.screen.appendChild(back);
        },
        controlsScreen: function () {
            this.screen.innerHTML = '';
            var title = document.createElement('h1');
            title.innerText = 'Controls';
            var jump = document.createElement('div');
            jump.id = 'jump';
            jump.classList.add('menuItem');
            jump.innerText = 'Jump: ' + (this.game.characters[0].controls.keys.jump === ' ' ? 'Spacebar' : this.game.characters[0].controls.keys.jump.toUpperCase());
            var left = document.createElement('div');
            left.id = 'left';
            left.classList.add('menuItem');
            left.innerText = 'Left move: ' + (this.game.characters[0].controls.keys.left === ' ' ? 'Spacebar' : this.game.characters[0].controls.keys.left.toUpperCase());
            var right = document.createElement('div');
            right.id = 'right';
            right.classList.add('menuItem');
            right.innerText = 'Right move: ' + (this.game.characters[0].controls.keys.right === ' ' ? 'Spacebar' : this.game.characters[0].controls.keys.right.toUpperCase());
            var back = document.createElement('div');
            back.id = 'back';
            back.classList.add('menuItem');
            back.innerText = 'Back';
            this.screen.appendChild(title);
            this.screen.appendChild(jump);
            this.screen.appendChild(left);
            this.screen.appendChild(right);
            this.screen.appendChild(back);
        },
        controlsPopScreen: function () {
            var pop = document.createElement('div');
            pop.id = 'pop';
            pop.innerText = 'Press a key to change or Escape to cancel';
            this.screen.appendChild(pop);
        },
        soundScreen: function () {
            this.screen.innerHTML = '';
            var title = document.createElement('h1');
            title.innerText = 'Sound';
            var master = document.createElement('div');
            master.id = 'master';
            master.classList.add('menuItem');
            master.innerText = 'Master';
            var theme = document.createElement('div');
            theme.id = 'theme';
            theme.classList.add('menuItem');
            theme.innerText = 'Theme';
            var sfx = document.createElement('div');
            sfx.id = 'sfx';
            sfx.classList.add('menuItem');
            sfx.innerText = 'SFX';
            var back = document.createElement('div');
            back.id = 'back';
            back.classList.add('menuItem');
            back.innerText = 'Back';
            this.screen.appendChild(title);
            this.screen.appendChild(master);
            this.screen.appendChild(theme);
            this.screen.appendChild(sfx);
            this.screen.appendChild(back);
        },
        changeSoundScreen: function (type) {
            this.screen.innerHTML = '';
            var title = document.createElement('h1');
            title.innerText = 'Sound';
            var subtitle = document.createElement('h2');
            subtitle.innerText = type;
            var container = document.createElement('div');
            container.id = 'layoutcontainer';
            var layout = document.createElement('span');
            layout.id = 'layout';
            var back = document.createElement('div');
            back.id = 'backsoundscreen';
            back.classList.add('menuItem');
            back.innerText = 'Back';
            this.screen.appendChild(title);
            this.screen.appendChild(subtitle);
            this.screen.appendChild(container);
            container.appendChild(layout);
            this.screen.appendChild(back);
        },
        highscoreScreen: function () {
            this.screen.innerHTML = '';
            var title = document.createElement('h1');
            title.innerText = 'Highscore';
            this.screen.appendChild(title);
            var i;
            var hsLenght = Utils.highscore.hs.length;
            var topScore;
            for (i = 0; i < hsLenght; i++) {
                topScore = document.createElement('p');
                topScore.innerText = (i + 1) + '. ' + Utils.highscore.hs[i];
                this.screen.appendChild(topScore);
            }
            var back = document.createElement('div');
            back.id = 'back';
            back.classList.add('menuItem');
            back.innerText = 'Back';
            this.screen.appendChild(back);
        },
        pauseScreen: function () {
            this.screen.innerHTML = '';
            if (this.game.attributes.pause) {
                this.darkerScreen();
                this.screen.classList.add('pause');
                var title = document.createElement('h1');
                title.innerText = 'PAUSE';
                this.screen.appendChild(title);
            }
            else {
                this.gameScreen();
                this.screen.classList.remove('pause');
            }
        },
        gameScreen: function () {
            this.screen.innerHTML = '';
            this.screen.classList = '';
            this.screen.classList.add('menuScreen');
        },
        gameOverScreen: function () {
            this.screen.innerHTML = '';
            this.darkerScreen();
            var title = document.createElement('h1');
            title.innerText = 'GAME OVER';
            var play = document.createElement('div');
            play.id = 'play';
            play.classList.add('menuItem');
            play.innerText = 'Retry';
            var startscreen = document.createElement('div');
            startscreen.id = 'startscreen';
            startscreen.classList.add('menuItem');
            startscreen.innerText = 'Title Screen';
            this.screen.appendChild(title);
            this.screen.appendChild(play);
            this.screen.appendChild(startscreen);
        }
    });
}(this));