(function (global) {
    'use strict';
    global.Class = function (methods) {
        var ObjectClass = function () {
            this.initialize.apply(this, arguments);
            console.log('Factory has created ' + this.name);
        };
        for (var property in methods) {
            ObjectClass.prototype[property] = methods[property];
        }
        if (!ObjectClass.prototype.initialize) {
            ObjectClass.prototype.initialize = function () {
            };
        }
        return ObjectClass;
    };
}(this));