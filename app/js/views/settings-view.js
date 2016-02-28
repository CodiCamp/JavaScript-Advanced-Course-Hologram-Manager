// Settings menu
(function(Global, app) {

    app.views.settingsView = Global.GenericView.extend({
        name: 'settings',
        init: function () {
            console.log(this.name);
        }
    });
    
})(window, window.app);