// Presets menu

(function(Global, app) {

    app.views.presetsView = {
        name : 'presets'
    };
    _.extend(app.views.presetsView, Global.GenericView);

    app.views.presetsView.listenForInit();
    
})(window, window.app);