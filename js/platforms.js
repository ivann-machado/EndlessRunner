(function (global) {
    'use strict';
    global.Platforms = new Class({
        initialize: function () {
            this.name = 'Platforms';
            this.self = [];
            this.idlePlatforms = [];
            this.onWork = false;
            this.lastY = 1;
            this.tiles = {
                right: {
                    normal: ['right0', 'right1', 'right2'],
                    half: ['right3']
                },
                middle: {
                    normal: ['middle0', 'middle1', 'middle2', 'middle3', 'middle4', 'middle5', 'middle6', 'middle7', 'middle8', 'middle9', 'middle10', 'middle11'],
                    half: ['middle12', 'middle13', 'middle14', 'middle15']
                },
                left: {
                    normal: ['left0', 'left1', 'left2'],
                    half: ['left3']
                }
            };
            console.log('Platforms initialized');
        },
        startPlatforms: function () {
            this.lastY = 1;
            var i;
            var selfLength = this.self.length;
            for (i = 0; i < selfLength; i += 1) {
                this.self[i].destruct();
            }
            this.self = [];
            var loadedTiles = Math.ceil(window.innerWidth / 89 + 5);
            for (i = 0; i < loadedTiles; i += 1) {
                this.createPlatform(89, 88, {x: 89 * i, y: window.innerHeight - 88}, {position: 'normal', type: i === 0 ? 'left' : (i === loadedTiles - 1 ? 'right' : 'middle')});
            }
        },
        createPlatform: function (length, height, position, type) {
            var self = this;
            var platform;
            if (!self.idlePlatforms.length) {
                platform = {
                    element: document.createElement('div'),
                    position: new Proxy({x: 0, y: 0}, {
                        set: function (obj, attr, value) {
                            obj[attr] = value;
                            if (attr === 'x' || attr === 'y') {
                                Object.assign(obj.parent.element.style, {top: obj.y + 'px', left: obj.x + 'px'});
                            }
                            if (attr === 'x' && value < -88) {
                                self.idlePlatforms.push(self.self.splice(self.self.indexOf(obj.parent), 1)[0]);
                                obj.parent.element.remove();
                            }
                            return true;
                        }
                    }),
                    destruct: function () {
                        this.element.remove();
                    }
                };  
            }
            else {
                platform = self.idlePlatforms.splice(0, 1)[0];
            }
            Object.assign(platform.element.style, {position: 'absolute', height: height + 'px', width: length + 'px'});
            platform.element.className = '';
            platform.element.classList.add('floor');
            platform.element.classList.add(this.tiles[type.type][type.position][Math.floor(Math.random() * this.tiles[type.type][type.position].length)]);
            platform.position.parent = platform;
            platform.position.x = position.x;
            platform.position.y = position.y;
            gameContent.appendChild(platform.element);
            this.self.push(platform);
        },
        generateMap: function () {
            var self = this;
            if (typeof(Worker) !== 'undefined' && !self.onWork) {
                self.onWork = true;
                var workerM = new Worker('js/worker.js');
                workerM.postMessage(self.lastY);
                workerM.addEventListener('message', function (event) {
                    var i;
                    var platLength = event.data.length;
                    for (i = 0; i < platLength; i += 1) {
                        self.createPlatform(89, event.data[i].position === 'normal' ? 88 : 46, {x: parseFloat(self.self[self.self.length - 1].element.style.left) + 89, y: window.innerHeight - (event.data[i].y === 1 ? 88 : 94) * event.data[i].y}, {type: event.data[i].type, position: event.data[i].position});
                    }
                    self.lastY = event.data[0].y;
                    self.onWork = false;
                });
            }
        }
    });
}(this));