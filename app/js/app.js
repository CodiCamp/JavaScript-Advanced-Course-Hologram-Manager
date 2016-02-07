/**
 * Application main files
 * Task: resolve app to global name space
 */
(function (app) {

    app.config = {

        path: {
            root: 'app/',
            modules: 'modules/'
        }
    };

    var bootstrapApp = (function(app){

        //TASK: Load all other modules and scripts via $LAB
        var modules = ['state.js'];

        $LAB.setGlobalDefaults({
            BasePath: app.config.path.root
        });

        $LAB.script(_.map(modules, function(module) {
            return app.config.path.modules + module;
        }));

    })(app);



})(window.app || {});