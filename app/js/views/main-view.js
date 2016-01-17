var app = app || {};

(function (global){

	 createMain: function (option){

		this.template = option.template || app.templates.main;
		this.name = option.name;
		this.placeholder = document.getElementById("content"); 

		render();
		
	},

	render: function(){

		this.placeholder.innerHTML = this.template; 

	}


})(window)