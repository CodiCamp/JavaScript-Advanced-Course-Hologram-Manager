// Settings menu
(function(Global, app) {

    app.views.loginView = Global.GenericView.extend({
        name: 'login',

        /**
         * Persistent views are rendered once
         * And must be destroyed manually
         * In this case destroy only if login is successful
         */
        persistent: true,
        init: function () {
            console.log('inited', this.name);
        },

        /**
         * When markup is ready do your stuff :)
         */
        onRender: function() {

            console.log('render ' + this.name);
            this.getElements();
            this.bindEvents();
        },

        getElements: function () {

        },

        bindEvents: function () {

        },

        unbindEvents: function () {

        },

        /**
         * Remove event listeners and markup
         * Called manually
         * @return {Void}
         */
        destroy: function destroyLoginView() {
            this.rendered = false;
            this.unbindEvents();
        }
    });
    
})(window, window.app);