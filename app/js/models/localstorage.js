/**
 * Application model
 */

var app = window.app || {};

(function (global) {

    app.model = app.model || {};

    app.model.local = {

        presetsDataKeys : [],

        /**
         * Help function that recursive adds objects properties to local storage
         * @param  {String} path - current path that will be key
         * @param  {Object} obj
         * @return
         */
        // parse: function(path,obj) {

        //     for(var prop in obj) {

        //         path += "." + prop;
        //         localStorage.setItem(path,JSON.stringify(obj[prop]));
        //         path = path.substr(0,path.lastIndexOf("."));

        //         if (typeof obj[prop] === "object") {

        //             var subObj = obj[prop];
        //             var currentPath = path + "." + prop;
        //             this.parse(currentPath,subObj);
        //         } else {
        //             continue;
        //         }

        //     }
        // },

        /**
         * Adds elements to local storage
         * @param {String} key
         * @param {Object} obj
         * @return
         */
        addPreset: function(key,obj) {

            presetsDataKeys.push(key);

            var path = key;
            localStorage.setItem(path,JSON.stringify(obj));

            // if (typeof obj === "object") {
            //     this.parse(path,obj);
            // }
            // else {
            //     return obj;
            // }

        },

        /**
         * Retrieves a specific item from local storage by its key
         * @param  {String} key
         * @return
         */
        readSpecificPreset: function(key) {

            var item = JSON.parse(localStorage.getItem(key));
            console.log(item);

        },

        /**
         * Retrieves all items in local storage
         * @return {String} in console
         * @return
         */
        getAllPresets : function() {

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
         * Deletes all items from local storage
         * DONE : clear only the presets not all things
         * @return
         */
        removeAllPresets: function() {

            // localStorage.clear();
            for(var key in presetsDataKeys) {
                localStorage.removeItem(key);
            }
        },

        /**
         * Removes a specific Presets
         * @param  {String} presetsKey
         * @return
         */
        removeSpecificPreset: function(presetsKey){

            localStorage.removeItem(presetsKey);

            // for(var key in localStorage) {
            //     if (key.startsWith(presetsKey+".")) {
            //         localStorage.removeItem(key);
            //     } else {
            //         continue;
            //     }
            // }
        }

    };
})(window);
