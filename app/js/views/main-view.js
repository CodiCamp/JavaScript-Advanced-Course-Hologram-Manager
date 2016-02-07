// Initial

var app = app || {};

(function (global){

    app.views.mainView = {
        name: 'main',
        
        init: function(option){
            
            this.template = Templates[this.name];
            this.placeholder = document.getElementById("content"); 

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