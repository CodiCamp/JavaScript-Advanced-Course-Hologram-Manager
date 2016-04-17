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

    /**
     * Adds a preset to current model
     * @param {Object} presetObject
     * @return {Void}
     */
    model.addPreset = function (presetObject) {

        model[model.mode].addPreset(presetObject);
    };

    /**
     * Get data for specific preset
     * @param {String} presetsKey
     * @return {Void}
     */
    model.readSpecificPreset = function (presetsKey) {

        model[model.mode].readSpecificPreset(presetsKey);
    };

    /**
     * Remove specific preset
     * @param {String} presetsKey
     * @return {Void}
     */
    model.removeSpecificPreset = function (presetsKey) {

        model[model.mode].removeSpecificPreset(presetsKey);
    };

    /**
     * Delete al saved presets
     * @return {Void}
     */
    model.removeAllPresets = function() {

        model[model.mode].removeAllPresets();
    };

    // TO DO: Update presets

    /**
     * Authenticate user with email and password
     * @param email
     * @param password
     */
    model.authenticate = function authenticateUser (email, password) {

        /**
         * Current support is only online authentication
         */
        model.online.authenticate({
            email: username,
            password: password
        });
    };

    // TO DO: Authenticate user with OAUTH

})(window);
