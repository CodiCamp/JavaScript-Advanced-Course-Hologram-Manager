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
        scaled : {
            width :  0 ,
                height :  0
        },
        translated: {
            x : 0,
                y : 0,
                z : 0 //
        },
        rotated : 0,
            fliped : {

            horizontal: 0,
                vertical : 0,

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

    // TO DO: Implement all other methods


})(window);
