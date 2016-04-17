/**
 * Application model
 */

var app = window.app || {};

(function (global) {
    var model = app.model = app.model || {};

    /**
     * Model object - keeps image properties
     * @type {Object}
     */
    model.defaults = {
        name: 'Default',
        scaled : {
            width :  0 ,
            height :  0
        },
        translated: {
            x : 0,
            y : 0,
            z : 0
        },
        rotated : {
            x : 0,
            y : 0,
            z : 0
        },
        fliped : {
            horizontal: 0,
            vertical : 0
        },
        moved : {
            x : 0,
            y : 0,
            z : 0
        }
    };

    model.data = {
        presets: [],
        user: {
            logged: false
        }
    };

    /**
     * Gets all presets by replacing the currently loaded
     * Delegates to localStorage || Firebase
     * @return {Void}
     */
    model.getAllPresets = function () {

        model[model.mode].getAllPresets();
    };

    model.addPreset = function (presetObject) {

        model[model.mode].addPreset(presetObject);
    };

    model.readSpecificPreset = function (presetsKey) {

        model[model.mode].readSpecificPreset(presetsKey);
    };

    model.removeSpecificPreset = function (presetsKey) {

        model[model.mode].removeSpecificPreset(presetsKey);
    };

    model.removeAllPresets = function() {

        model[model.mode].removeAllPresets();
    };


    // TO DO: Update presets

})(window);
