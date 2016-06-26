/**
 * Created by samuil on 03-Apr-16.
 * Firebase example usage
 * Modified by Ani on 10-Apr-16
 */

var app = window.app || {};

(function (Global, Firebase) {

    var model = app.model = app.model || {};

    app.DB = new Firebase("https://hologram-manager.firebaseio.com");

    var oAuthPermissions = {

        facebook : 'email',

        google : 'email',

        github : 'user:email'

    }

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

    /**
     * Get initial data from firebase
     * @retun {Void}
     */
    function watchData() {

        app.DB.child("users/"+app.model.data.user.uid+"/presets").on('value', function (snapshot){
            model.online.getPresetsByLogin(snapshot.val());
            app.DB.child("users/"+app.model.data.user.uid+"/presets").off('value');
        });
    }

    // Alternatively, authenticate users anonymously
    // TO DO: Move authentication to login screen
    // app.DB.authAnonymously(authHandler);

    /**
     * Social Authentication
     * @param {String} oAuthString - facebook , google , github
     */
    function oAuthenticate(){

        var oAuthString = this.dataset.method;

        app.DB.authWithOAuthPopup(oAuthString, function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with:", authData);
          }
        },
        {
          // remember: "sessionOnly",
          scope: oAuthPermissions[oAuthString]
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
        registerUser: function (data) {

            app.DB.createUser({
               email: data.email,
               password: data.password
            }, function(error, userData) {
              if (error) {
                switch (error.code) {
                  case "EMAIL_TAKEN":
                    console.log("The new user account cannot be created because the email is already in use.");
                    break;
                  case "INVALID_EMAIL":
                    console.log("The specified email is not a valid email.");
                    break;
                  default:
                    console.log("Error creating user:", error);
                }
              } else {
                console.log("Successfully created user account :", userData);
              }
            });
        },

        oAuthenticate : oAuthenticate,


        /**
         * Sets presets list in model.data
         * @param {Object} presetsList
         */
        getPresetsByLogin: function (presetsList) {
            //Clear previous data
            model.data.presets = [];

            _.each(presetsList, function(value, key){
                value.id = key;
                model.data.presets.push(value);
            });
        },

        getAllPresets: function() {

            app.DB.child("users/"+app.model.data.user.uid+"/presets").on('value', function (snapshot){
                console.log(snapshot.val());
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
