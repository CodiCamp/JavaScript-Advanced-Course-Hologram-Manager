/**
 * Application model
 */

var app = window.app || {};

(function () {

    app.model = {

        get: function(key){

            var value = JSON.parse(localStorage.key);

            return value;
        },

        set: function(key,obj){

            var  value = JSON.stringify(obj);

            localStorage.setItem(key,value);

        },

        parse: function(obj){

        }
    };
})();
