/**
 * Created by samuil on 03-Apr-16.
 * Firebase example usage
 * Modified by Ani on 10-Apr-16
 */

var app = window.app || {};

(function (Global, Firebase) {

    var model = app.model = app.model || {};

    app.DB = new Firebase("https://hologram-manager.firebaseio.com");

    // Create a callback to handle the result of the authentication
    function authHandler(error, authData) {
        if (error) {
            model.mode = 'local';
            console.log("Login Failed!", error);

            //Get local presets list
            model.getAllPresets();

        } else {
            model.mode = 'online';
            console.log("Authenticated successfully with payload:", authData);
            model.data.user = authData;
            watchData();
        }
    }

    function registerHandler (error) {
        if(!error) {

        } else {

        }
    }

    /**
     * Get initial data from firebase
     * @retun {Void}
     */
    function watchData() {

        app.DB.child("users/"+app.model.data.user.uid+"/presets").on('value', function (snapshot){
            model.online.getAllPresets(snapshot.val());
            app.DB.child("users/"+app.model.data.user.uid+"/presets").off('value');
        });
    }

    // Alternatively, authenticate users anonymously
    // TO DO: Move authentication to login screen
    // app.DB.authAnonymously(authHandler);


    /**
     * Facebook Authentication
     * FB API : https://developers.facebook.com/apps/608905429283761/dashboard/
     * Guide: https://www.firebase.com/docs/web/guide/login/facebook.html
     */
    function fbAuthenticate(){
        app.DB.authWithOAuthPopup("facebook", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with facebook:", authData);
          }
        });
    }

    /**
     * Github Authentication
     * Github Api : https://github.com/settings/applications/335149
     * Guide : https://www.firebase.com/docs/web/guide/login/github.html
     *         https://developer.github.com/v3/oauth/
     */
    function ghAuthenticate(){
        app.DB.authWithOAuthPopup("github", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with github:", authData);
          }
        });
    }

    /**
     * Google Authentication
     * Google Api : https://console.developers.google.com/apis/credentials?project=codicamphologram-1279&authuser=2
     * Guide : https://www.firebase.com/docs/web/guide/login/google.html
     */
    function ggAuthenticate(){
        app.DB.authWithOAuthPopup("google", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with google:", authData);
          }
        });
    }

    /**
     * Holds interactions with firebase
     * @type {Object}
     */
    model.online = {

        /**
         * @param {Object} data
         * data.email
         * data.password
         * @return {Void}
         */
        authenticate: function authenticateWithEmailAndPassword (data) {

            app.DB.authWithPassword({
               email: data.email,
               password: data.password
            }, authHandler);
        },

        /**
         * @param {Object} data
         * data.email
         * data.password
         * @return {Void}
         */
        registerUser: function registerNewUser (data) {

            app.DB.createUser({
               email: data.email,
               password: data.password
            }, registerHandler);
        },

        fbAuthenticate: fbAuthenticate,
        ghAuthenticate: ghAuthenticate,

        /**
         * Sets presets list in model.data
         * @param {Object} presetsList
         */
        getAllPresets: function (presetsList) {
            //Clear previous data
            model.data.presets = [];

            _.each(presetsList, function(value, key){
                value.id = key;
                model.data.presets.push(value);
            });
        },

        /**
         * Adds preset in Firebase
         * @param {Object} obj - added Preset
         */
        addPreset: function (obj) {
            // DONE : Add name to the default object for presets
            app.DB.child("users/"+app.model.data.user.uid+"/presets").push(obj);
        },

        /**
         * Retrieves Data from DB by it's preset name
         * @param  {String} key - name of the Preset
         * @return {Object}
         */
        readSpecificPreset: function (key) {

            return model.data.presets[key];
        },

        /**
         * Removes Preset by it's name
         * @param  {String} key - name of the Preset
         * @return void
         */
        removeSpecificPreset: function (id) {

            app.DB.child("users/"+app.model.data.user.uid+"/presets").child(id).remove();
        },

        /**
         * Clears all the Presets in DB
         * @return void
         */
        removeAllPresets: function() {

            app.DB.child("users/"+app.model.data.user.uid+"/presets").remove();
        },

        updatePreset: function(id,obj) {
            app.DB.child("users/"+app.model.data.user.uid+"/presets").child(id).update(obj);
        },

        // updateMultiplePresets: function() {
        //     // Still thinking about it
        // }

    };
})(window, Firebase);
