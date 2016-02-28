/***
 * Base view for all of the existing ones;
 * methods to be overridden when needed
 */
(function(Global) {

    Global.GenericView = {

        initialize: function() {
            this.template = Templates[this.name];
            this.placeholder = document.getElementById(this.name + '-wrapper');

            this.init();
        },

        onRender: function() {},

        render: function() {
            this.placeholder.innerHTML = this.template();
            this.onRender();
        },

        destroy: function() {
            console.info('Destroyed: ' + this.name);
        }
    };

    Global.GenericView = _.extendOwn(Global.GenericView, Global.Initable);

})(window);
