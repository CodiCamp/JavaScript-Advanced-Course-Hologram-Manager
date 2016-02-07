// Presets menu

var app = app || {};

(function(Global){

	var view = {

		init: function(option){
			this.template = app.templates.presets;
			this.name = 'presetsMenu';
			this.placeholder = document.getElementById('presets-wrapper');

			this.render();
		},

		render: function(){
			this.placeholder.innerHTML = this.template;

		}
	};
	
})(window);