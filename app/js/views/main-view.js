// Initial

var app = app || {};

(function (global){

	var view = {

		init: function(option){
			this.template = app.templates.main;
			this.name = 'baseView';
			this.placeholder = document.getElementById("content"); 

			this.render();
		},

		render: function(){
			this.placeholder.innerHTML = this.template; 
		}
	};

})(window);