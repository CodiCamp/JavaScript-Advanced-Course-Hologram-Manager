// Presets menu

(function(Global, app) {

    app.views.presetsView = Global.GenericView.extend({
        name : 'presets',
        init: function () {
            console.log('init', this.name);
        }
    });

    
    
})(window, window.app);