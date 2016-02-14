// Initial
(function(Global, app) {

    app.views.mainView = {
        name: 'main'
    };
    _.extend(app.views.mainView, Global.GenericView);

})(window, window.app);