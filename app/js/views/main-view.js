// Initial

var app = app || {};

(function(Global) {

    app.views.mainView = {
        name: 'main'
    };
    _.extend(app.views.mainView, Global.GenericView);

})(window);