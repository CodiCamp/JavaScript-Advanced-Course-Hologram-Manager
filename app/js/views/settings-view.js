// Settings menu

var app = app || {};

(function(Global){

    app.views.settingsView = {
        name: 'settings',

        init: function(option){
            this.template = Templates[this.name];
            this.placeholder = document.getElementById('settings-wrapper');

            this.render();
        },

        render: function(){
            this.placeholder.innerHTML = this.template;

        },

        destroy: function () {
            console.info('Destroyed: ' + this.name);
        }
    };
    
})(window);