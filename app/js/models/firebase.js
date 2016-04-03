/**
 * Created by samuil on 03-Apr-16.
 * Firebase example usage
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
        }
    };
})(window, Firebase);
