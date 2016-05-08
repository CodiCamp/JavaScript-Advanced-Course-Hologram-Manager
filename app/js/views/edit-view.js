// Settings menu
(function(Global, app) {

    app.views.editView = Global.GenericView.extend({
        name: 'edit',
        init: function () {
            console.log(this.name);
        },

        elements: {
            closeSubNav: null
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

            this.elements.closeSubNav = document.getElementById('close-subconfiguration');
        },

        bindEvents: function () {

            Events.subscribe(this.elements.closeSubNav, 'click', this.closeSubNavigation);
        },

        unbindEvents: function () {

            Events.unsubscribe(this.elements.closeSubNav, 'click', this.closeSubNavigation);
        },

        /**
         * Close login navigation
         */
        closeSubNavigation: function () {
            console.log('sub nav closed - edit');
            this.parentElement.parentElement.innerHTML = '';
        },
    });

})(window, window.app);