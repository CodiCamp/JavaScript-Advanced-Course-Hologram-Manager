/**
 * Application main files
 * Task: resolve app to global name space
 */
(function (Global) {
    Global.app = Global.app || {};

    var states = [];

    app.config = {

        path: {
            root: 'app/',
            components: 'components/',
            modules: 'modules/',
            templates: 'templates/',
            views: 'views/'
        }
    };

    //Define namespace for views
    app.views = {};

    //define required files
    var files = {
        modules: ['state.js'],
        components: ['generic-view.js'],
        templates: ['templates.js'],
        views: ['main-view.js', 'presets-view.js', 'settings-view.js']
    };

    var bootstrapApp = (function(app){

        $LAB.setGlobalDefaults({
            BasePath: app.config.path.root
        });

        _.each(files, function (value, key) {
            
            //Load modules
            $LAB.script(_.map(value, function(module) {
                return app.config.path[key] + module;
            }));
        });

    })(app);



})(window);