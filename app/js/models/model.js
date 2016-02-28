/**
 * Application model
 */

var app = window.app || {};

(function () {

    app.model = {

        /**
         * Model object - keeps image properties
         * @type {Object}
         */
        defaults: {
            scaled : {
                width :  0 ,
                height :  0
            },
            translated: {
                x : x,
                y : y,
                z : z //
            },
            rotated : deg,
            fliped : {

                horizontal: 0,
                vertical : 0,

            },
            moved : {
                x : x,
                y : y,
                z : z
            }
        },

        /**
         * @param  {String} key
         * @return {Object} value
         */
        get: function(key) {

            var value = JSON.parse(localStorage.key);

            return value;
        },

        /**
         * @param {String} key
         * @param {Object} obj
         */
        set: function(key,obj) {

            var  value = JSON.stringify(obj);
            localStorage.setItem(key,value);

        },

        parse: function(obj) {

        }
    };
})();
