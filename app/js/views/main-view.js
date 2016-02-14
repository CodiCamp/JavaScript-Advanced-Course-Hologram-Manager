// Initial
(function(Global, app) {

    app.views.mainView = {
        name: 'main'
    };
    _.extend(app.views.mainView, Global.GenericView);

    Events.subscribe(document, 'app:init', app.views.mainView.init.bind(app.views.mainView));

})(window, window.app);