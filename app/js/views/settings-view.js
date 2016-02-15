// Settings menu
(function(Global, app) {

    app.views.settingsView = {
        name: 'settings'
    };
    _.extend(app.views.settingsView, Global.GenericView);

    app.views.settingsView.listenForInit();
    
})(window, window.app);