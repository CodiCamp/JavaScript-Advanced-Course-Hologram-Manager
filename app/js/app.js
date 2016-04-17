/**
 * Application main files
 * Task: resolve app to global name space
 */
(function (Global, _opbeat) {
    Global.app = Global.app || {};

    var states = [];

    app.run = [];
    app.config = {

        path: {
            root: 'app/',
            components: 'components/',
            modules: 'modules/',
            templates: 'templates/',
            views: 'views/',
            models: 'models/'
        }
    };

    /***
     * Initialize app modules
     */
    var initApp = function () {

        Events.publish(document, 'app:init');
    };

    //Define namespace for views
    app.views = {};
    app.models = {};

    //define required files
    var files = {
        templates: ['templates.js'],
        components: ['initable.js', 'generic-view.js', 'events.js'],
        views: ['main-view.js', 'login-view.js', 'presets-view.js', 'settings-view.js'],
        modules: ['state.js'],
        models:['model.js','firebase.js']
    };

    var bootstrapApp = (function(app){
        var scriptsToLoad = [];

        _opbeat('config', {
           debug: true, // Toggles debug-mode - outputs debug messages to the console
           libraryPathPattern: '(node_modules|bower_components)' // Regex pattern used to determine whether a file is a library file or not.
        });

        $LAB.setGlobalDefaults({
            BasePath: app.config.path.root
        });

        _.each(files, function (value, key) {

            //Load modules
            scriptsToLoad = scriptsToLoad.concat(_.map(value, function(module) {
                return app.config.path[key] + module;
            }));
        });
        

        $LAB.script(scriptsToLoad)
            .wait(function () {
                initApp();
            });

    })(app);

})(window, _opbeat);