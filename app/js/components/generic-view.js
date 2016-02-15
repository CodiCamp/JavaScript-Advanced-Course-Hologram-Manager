/***
 * Base view for all of the existing ones;
 * methods to be overridden when needed
 */
(function(Global) {

    Global.GenericView = {

        init: function() {
            this.template = Templates[this.name];
            this.placeholder = document.getElementById(this.name + '-wrapper');
        },

        render: function() {
            this.placeholder.innerHTML = this.template();
        },

        destroy: function() {
            console.info('Destroyed: ' + this.name);
        }
    };

    _.extendOwn(Global.GenericView, Global.Initable);

})(window);
