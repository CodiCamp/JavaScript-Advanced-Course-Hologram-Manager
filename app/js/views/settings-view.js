// Settings menu

var app = app || {};

(function(Global) {

    app.views.settingsView = {
        name: 'settings'
    };
    _.extend(app.views.settingsView, Global.GenericView);
    
})(window);