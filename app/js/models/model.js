/**
 * Application model
 */

var app = window.app || {};

(function () {

    app.model = {

        /**
         * @param  {String} key
         * @return {Object} value
         */
        get: function(key){

            var value = JSON.parse(localStorage.key);

            return value;
        },

        /**
         * @param {String} key
         * @param {Object} obj
         */
        set: function(key,obj){

            var  value = JSON.stringify(obj);

            localStorage.setItem(key,value);

        },

        parse: function(obj){

        }
    };
})();
