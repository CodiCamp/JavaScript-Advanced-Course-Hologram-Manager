// Settings menu
(function(Global, app) {

    var view = app.views.loginView = Global.GenericView.extend({
        name: 'login',

        persistent: true,

        init: function () {
            console.log('inited', this.name); //@todo: remove

            this.closeFromUi = this.closeFromUi.bind(this);

            this.authenticate = this.authenticate.bind(this);
        },

        elements: {
            loginBtn: null,
            skipBtn: null,
            recoverPasswordBtn: null,
            emailField: null,
            closeSubNav: null,
            passwordField: null
        },

        /**
         * When markup is ready do your stuff :)
         */
        onRender: function() {

            console.log('render ' + this.name); //@todo: remove
            this.getElements();
            this.bindEvents();
        },

        getElements: function () {

            this.elements.fbAuthenticate = document.querySelector('[data-method="facebook"]');
            this.elements.ggAuthenticate = document.querySelector('[data-method="google"]');
            this.elements.ghAuthenticate = document.querySelector('[data-method="github"]');

            this.elements.loginBtn = this.placeholder.querySelector('#initiate-authentication');
            this.elements.skipBtn = this.placeholder.querySelector('#continue-local');
            this.elements.recoverPasswordBtn = this.placeholder.querySelector('#recover-password');
            this.elements.emailField = this.placeholder.querySelector('#email-field');
            this.elements.closeSubNav = document.getElementById('close-subconfiguration');
            this.elements.passwordField = this.placeholder.querySelector('#password-field');
            this.elements.states = this.placeholder.querySelectorAll('[data-state]');
        },

        bindEvents: function () {
            var fbButton = this.elements.fbAuthenticate;
            var ggButton = this.elements.ggAuthenticate;
            var ghButton = this.elements.ghAuthenticate;

            Events.subscribe(this.elements.loginBtn, 'click', this.authenticate);
            Events.subscribe(fbButton, 'click', app.model.online.oAuthenticate);
            Events.subscribe(ggButton, 'click', app.model.online.oAuthenticate);
            Events.subscribe(ghButton, 'click', app.model.online.oAuthenticate);
            Events.subscribe(this.elements.closeSubNav, 'click', this.closeFromUi);

            //Add states to the state object
            Array.prototype.forEach.call(this.elements.states, function(state) {
                Events.subscribe(state, 'click', function() {
                    app.stateObject.addState(state.dataset.state);
                });
            });

            // Events.subscribe(this.elements.skipBtn, 'click', this.continueLocal);
            // Events.subscribe(this.elements.recoverPasswordBtn, 'click', this.recoverPassword);
        },

        unbindEvents: function () {

            Events.unsubscribe(this.elements.loginBtn, 'click', this.authenticate);
            Events.unsubscribe(this.elements.fbAuthenticate, 'click', app.model.online.oAuthenticate('facebook'));
            Events.unsubscribe(this.elements.ggAuthenticate, 'click', app.model.online.oAuthenticate('google'));
            Events.unsubscribe(this.elements.ghAuthenticate, 'click', app.model.online.oAuthenticate('github'));
            Events.unsubscribe(this.elements.closeSubNav, 'click', this.closeFromUi);

            // Events.unsubscribe(this.elements.skipBtn, 'click', this.continueLocal);
            // Events.unsubscribe(this.elements.recoverPasswordBtn, 'click', this.recoverPassword);
        },

        /**
         * Get fields values and pass then to the model
         */
        authenticate: function (evnt) {

            evnt.preventDefault();

            // TO DO: validate fields
            app.model.authenticate({
                email: this.elements.emailField.value,
                password: this.elements.passwordField.value
            });
        },

        /**
         * Close login navigation
         */
        closeFromUi: function () {

            app.stateObject.addState('main');
            this.close();
        },

        /**
         * Close login navigation
         */
        close: function () {
            console.log('sub nav closed - login'); //@todo: remove
            this.placeholder.style.display = 'none';
        },

        /**
         * Switch to local storage model
         */
        continueLocal: function (evnt) {
            evnt.preventDefault();
        },

        /**
         * Send password recovery mail
         */
        recoverPassword: function (evnt) {
            evnt.preventDefault();
        },

        /**
         * Remove event listeners and markup
         * Must be called when login occurs
         * @return {Void}
         */
        destroyOnLogin: function destroyLoginView() {
            this.rendered = false;
            this.unbindEvents();
        }
    });

})(window, window.app);