/**
 * Application main files
 * Task: resolve app to global name space
 */
(function (Global) {
    Global.app = Global.app || {};

    app.config = {

        path: {
            root: 'app/',
            modules: 'modules/',
            templates: 'templates/',
            views: 'views/'
        }
    };

    var bootstrapApp = (function(app){

        //TASK: Load all other modules and scripts via $LAB
        var files = {
            modules: ['state.js'],
            templates: ['templates.js'],
            views: ['main-view.js', 'presets-view.js', 'settings-view.js']
        };

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