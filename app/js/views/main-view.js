// Initial
(function(Global, app) {

    app.views.mainView = {
        name: 'main'
    };

    Global.GenericView.extend(app.views.mainView);

})(window, window.app);