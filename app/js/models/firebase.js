/**
 * Created by samuil on 03-Apr-16.
 * Firebase example usage
 * Modified by Ani on 10-Apr-16
 */

var app = window.app || {};

(function (Global, Firebase) {

    var model = app.model = app.model || {};

    app.DB = new Firebase("https://radiant-fire-7275.firebaseio.com");

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
            // TO DO: set authentication useful data in user model
            watchData();
        }
    }

    /**
     * Get initial data from firebase
     * @retun {Void}
     */
    function watchData() {

        app.DB.child('presets').on('value', function (snapshot){
            model.online.getAllPresets(snapshot.val());
            app.DB.child('presets').off('value');
        });
    }

    // Alternatively, authenticate users anonymously
    // TO DO: Move authentication to login screen
    app.DB.authAnonymously(authHandler);

    // TO DO: Authenticate users with email/password combination
    // TO DO: Authenticate users with via popular OAuth providers

    // Authenticate users with a custom authentication token
    //DB.authWithCustomToken("<token>", authHandler);

    // Or with an email/password combination
    //DB.authWithPassword({
    //    email    : 'bobtony@firebase.com',
    //    password : 'correcthorsebatterystaple'
    //}, authHandler);
    // Or via popular OAuth providers ("facebook", "github", "google", or "twitter")
    //DB.authWithOAuthPopup("<provider>", authHandler);
    //DB.authWithOAuthRedirect("<provider>", authHandler);

    model.online = {

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
         * @param {String} key - name of the added Preset
         * @param {Object} obj - added Preset
         */
        addPreset: function (key,obj) {

            obj.name = key;
            var presets = app.DB.child("presets").push(); // push() generates a unique ID for the object in DB
            obj.path = presets.toString();
                presets.set(obj);
            // console.log(obj.path);


            // var pushObj = JSON.stringify(obj);
            // var parsedObj = JSON.parse( key + " : " + pushObj );
            // var presets = app.DB.child("presets").set(parsedObj);
            // var presets = app.DB.child("presets").set(parsedObj);
            // var presets = app.DB.child("presets").set(obj);
        },

        /**
         * Retrieves Data from DB by it's preset name
         * @param  {String} key - name of the Preset
         * @return {Object}
         */
        readSpecificPreset: function (key) {

            var specificPreset = {};

            app.DB.child('presets').on('value', function (snapshot){

                var snapshotArr = snapshot.val();

                _.each( snapshotArr , function(shot){

                    if (shot.name === key) {
                        // console.log(shot);
                        specificPreset = shot;
                        console.log(specificPreset);
                    } else {}

                });

            });

            return specificPreset;

        },

        /**
         * Removes Preset by it's name
         * @param  {String} key - name of the Preset
         * @return void
         */
        removeSpecificPreset: function (key) {

            var retrievedPresets = app.model.online.readSpecificPreset(key);
            // console.log(retrievedPresets);

            var ref = new Firebase(retrievedPresets.path);

            ref.remove();
        },

        /**
         * Clears all the Presets in DB
         * @return void
         */
        removeAllPresets: function() {

            app.DB.child('presets').remove();
        }

    };
})(window, Firebase);
