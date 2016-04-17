// Settings menu
(function(Global, app) {

    var view = app.views.loginView = Global.GenericView.extend({
        name: 'login',

        /**
         * Persistent views are rendered once
         * And must be destroyed manually
         * In this case destroy only if login is successful
         */
        persistent: true,
        init: function () {
            console.log('inited', this.name);

            this.authenticate = this.authenticate.bind(this);
        },
        
        elements: {
            loginBtn: null,
            skipBtn: null,
            recoverPasswordBtn: null,
            emailField: null,
            passwordField: null
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

            this.elements.loginBtn = this.placeholder.querySelector('#initiate-authentication');
            this.elements.skipBtn = this.placeholder.querySelector('#continue-local');
            this.elements.recoverPasswordBtn = this.placeholder.querySelector('#recover-password');
            this.elements.emailField = this.placeholder.querySelector('#email-field');
            this.elements.passwordField = this.placeholder.querySelector('#password-field');
        },

        bindEvents: function () {

            Events.subscribe(this.elements.loginBtn, 'click', this.authenticate);
            Events.subscribe(this.elements.skipBtn, 'click', this.continueLocal);
            Events.subscribe(this.elements.recoverPasswordBtn, 'click', this.recoverPassword);
        },

        unbindEvents: function () {

            Events.unsubscribe(this.elements.loginBtn, 'click', this.authenticate);
            Events.unsubscribe(this.elements.skipBtn, 'click', this.continueLocal);
            Events.unsubscribe(this.elements.recoverPasswordBtn, 'click', this.recoverPassword);
        },

        /**
         * Get fields vaues and pass then to the model
         */
        authenticate: function () {
            console.log(this.elements.emailField.value, this.elements.passwordField.value);
        },

        /**
         * Switch to local storage model
         */
        continueLocal: function () {

        },

        /**
         * Send password recovery mail
         */
        recoverPassword: function () {

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