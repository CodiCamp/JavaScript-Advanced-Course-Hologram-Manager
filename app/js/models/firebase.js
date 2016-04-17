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
            model.data.user = authData;
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
    // app.DB.authAnonymously(authHandler);

    // TO DO: Authenticate users with email/password combination
    // TO DO: Authenticate users with via popular OAuth providers

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
        authentiate: function authenticateWithEmailAndPassword (data) {

            DB.authWithPassword({
               email: data.email,
               password: data.password
            }, authHandler);
        }
    };

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

    // model.online = {
    //
    //     /**
    //      * Sets presets list in model.data
    //      * @param {Object} presetsList
    //      */
    //     getAllPresets: function (presetsList) {
    //         //Clear previous data
    //         model.data.presets = [];
    //
    //         _.each(presetsList, function(value, key){
    //             value.id = key;
    //             model.data.presets.push(value);
    //         });
    //     },
    //
    //     /**
    //      * Adds preset in Firebase
    //      * @param {Object} obj - added Preset
    //      */
    //     addPreset: function (obj) {
    //         // TO DO : Add name to the default object for presets
    //         var presets = app.DB.child("presets").push(obj);
    //     },
    //
    //     /**
    //      * Retrieves Data from DB by it's preset name
    //      * @param  {String} key - name of the Preset
    //      * @return {Object}
    //      */
    //     readSpecificPreset: function (key) {
    //
    //         return model.data.presets[key];
    //     },
    //
    //     /**
    //      * Removes Preset by it's name
    //      * @param  {String} key - name of the Preset
    //      * @return void
    //      */
    //     removeSpecificPreset: function (id) {
    //
    //         app.DB.child('presets').child(id).remove();
    //     },
    //
    //     /**
    //      * Clears all the Presets in DB
    //      * @return void
    //      */
    //     removeAllPresets: function() {
    //
    //         app.DB.child('presets').remove();
    //     }
    //
    // };
})(window, Firebase);
