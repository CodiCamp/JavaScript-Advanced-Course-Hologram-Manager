// Settings menu

var app = app || {};

(function(Global){

	var view = {

		init: function(option){
			this.template = app.templates.settings;
			this.name = 'settingsMenu';
			this.placeholder = document.getElementById('settings-wrapper');

			this.render();
		},

		render: function(){
			this.placeholder.innerHTML = this.template;

		}
	};
	
})(window);