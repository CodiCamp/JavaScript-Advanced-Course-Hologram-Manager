/**
 * Application model
 */

var app = window.app || {};

(function () {

    app.model = {

        get: function(key){
            var value = localStorage.getItem(key);

            if (!value) {return;}

            // in case it is an object that has been stringified
            if (value[0] === "{") {
              value = JSON.parse(value);
            }

            return value;
        },

        set: function(key, value){
            if (!key || !value) {return;}

            if (typeof value === "object") {
              value = JSON.stringify(value);
            }
            localStorage.setItem(key, value);
        },

        parse: function(obj){

        }
    };
})();
