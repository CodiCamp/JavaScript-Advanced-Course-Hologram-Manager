// Presets menu

var app = app || {};

(function(Global){

    app.views.presetsView = {

        name: 'presets',
        
        init: function(option){
            this.template = Templates[this.name];
            this.placeholder = document.getElementById('presets-wrapper');

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