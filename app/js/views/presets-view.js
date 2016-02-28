// Presets menu

(function(Global, app) {

    app.views.presetsView = {
        name : 'presets',
        init: function () {
        	console.log(this.name);
        }
    };
    app.views.presetsView = _.extend(app.views.presetsView, Global.GenericView);

    app.views.presetsView.listenForInit();
    
})(window, window.app);