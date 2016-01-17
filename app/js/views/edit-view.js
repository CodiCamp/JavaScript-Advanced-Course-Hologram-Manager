// Create edit menu


var app = app || {};

(function(global){

	init: function(option){

		this.template = app.templates.edit;
		this.name = 'editMenu';
		this.placeholder = document.createElement('aside');

		render();
	}

	render: function(){

		this.plaseholder.innerHTML = this.template;

	}
})(window)