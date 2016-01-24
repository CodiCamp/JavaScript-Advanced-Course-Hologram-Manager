var app = app || {};

(function (global){

	var view = {

	 init: function (option){

		this.template = option.template || app.templates.main(data);
		this.name = option.name;
		this.placeholder = document.getElementById("content"); 

		render();
		
	},

	render: function(){

		this.placeholder.innerHTML = this.template; 
	}

}


})(window)