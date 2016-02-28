// Initial
(function(Global, app) {

    app.views.mainView = {
        name: 'main',
        init: function () {
            console.log(this.name);
        }

    };

    Global.GenericView.extend(app.views.mainView);

})(window, window.app);