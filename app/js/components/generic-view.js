/***
 * Base view for all of the existing ones;
 * methods to be overridden when needed
 */
(function(Global) {

    Global.GenericView = {

        initialize: function() {
            this.template = Templates[this.name];

            this.init();

            this.stopListenForInit();
        },

        init: function () {},

        onRender: function() {},

        render: function() {

            if(!this.placeholder){
                this.placeholder = document.getElementById(this.name + '-wrapper');
            }

            this.placeholder.innerHTML = this.template(app.model.data);
            this.onRender();
        },

        destroy: function() {
            console.info('Destroyed: ' + this.name);
        }
    };

    Global.GenericView = _.extendOwn(Global.GenericView, Global.Initable);

})(window);
