// Settings menu
(function(Global, app) {

    app.views.loginView = Global.GenericView.extend({
        name: 'login',
        init: function () {
            console.log(this.name);
        }
    });
    
})(window, window.app);