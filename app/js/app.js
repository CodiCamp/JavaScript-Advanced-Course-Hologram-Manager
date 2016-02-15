/**
 * Application main files
 * Task: resolve app to global name space
 */
(function (Global) {
    Global.app = Global.app || {};

    var states = [];

    app.run = [];
    app.config = {

        path: {
            root: 'app/',
            components: 'components/',
            modules: 'modules/',
            templates: 'templates/',
            views: 'views/'
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

    //define required files
    var files = {
        templates: ['templates.js'],
        components: ['initable.js', 'generic-view.js', 'events.js'],
        views: ['main-view.js', 'presets-view.js', 'settings-view.js'],
        modules: ['state.js']
    };

    var bootstrapApp = (function(app){
        var scriptsToLoad = [];

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

})(window);