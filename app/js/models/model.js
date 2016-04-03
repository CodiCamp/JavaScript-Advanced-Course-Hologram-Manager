/**
 * Application model
 */

var app = window.app || {};

(function (global) {

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
        },

        /**
         * @param  {String} key
         * @return {Object} value
         * @return
         */
        get: function(key) {

            // var value = JSON.parse(localStorage.key);
            // return value;

            var gm = JSON.parse(localStorage.getItem(key));
            console.log(gm);
        },

        /**
         * @param {String} key
         * @param {Object} obj
         * @return
         */
        set: function(key,obj) {

            // var  value = JSON.stringify(obj);
            // localStorage.setItem(key,value);

            var m = obj;
            localStorage.setItem(key,JSON.stringify(m));

        },

        /**
         * Help function that recursive adds objects properties to local storage
         * @param  {String} path - current path that will be key
         * @param  {Object} obj
         * @return
         */
        parse: function(path,obj) {

            for(var prop in obj) {

                path += "." + prop;
                localStorage.setItem(path,JSON.stringify(obj[prop]));
                path = path.substr(0,path.lastIndexOf("."));

                if (typeof obj[prop] === "object") {

                    var subObj = obj[prop];
                    var currentPath = path + "." + prop;
                    this.parse(currentPath,subObj);

                }

                else {
                    continue;
                }

            }
        },

        /**
         * Adds elements to local storage
         * @param {String} key
         * @param {Object} obj
         * @return
         */
        add: function(key,obj) {

            var path = key;
            localStorage.setItem(path,JSON.stringify(obj));

            if (typeof obj === "object") {
                this.parse(path,obj);
            }
            else {
                return obj;
            }

        },

        /**
         * Retrieves a specific item from local storage by its key
         * @param  {String} key
         * @return
         */
        read: function(key) {

            var item = JSON.parse(localStorage.getItem(key));
            console.log(item);

        },

        /**
         * Retrieves all items in local storage
         * @return {String} in console
         * @return
         */
        readAll : function() {

            for(var i=0, len=localStorage.length; i<len; i++) {
                var key = localStorage.key(i);
                var value = localStorage[key];
                if(key.indexOf(".") < 0) {
                    //console.log(key + " => " + value);
                    console.log(key + ":");
                    console.log(JSON.parse(localStorage.getItem(key)));
                }
            }

        },

        /**
         * Deletes a specific item from local storage by its key
         * @param  {String} key
         * @return
         */
        remove: function(key) {

            localStorage.removeItem(key);

        },

        /**
         * Deletes all items from local storage
         * @return
         */
        removeAll: function() {

            localStorage.clear();

        },

        /**
         * Removes a specific Presets
         * @param  {String} presetsKey
         * @return
         */
        removePresets: function(presetsKey){
            localStorage.removeItem(presetsKey);

            for(var key in localStorage) {
               if (key.startsWith(presetsKey+".")) {
                    localStorage.removeItem(key);
               } else {
                    continue;
               }
            }
        }
    };
})(window);
