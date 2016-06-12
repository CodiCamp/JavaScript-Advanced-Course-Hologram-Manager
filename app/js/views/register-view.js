(function(Global, app) {

    var view = app.views.registerView = Global.GenericView.extend({
        name: 'register',

        persistent: true,

        init: function () {
            console.log('inited', this.name); //@todo: remove

            this.closeFromUi = this.closeFromUi.bind(this);

            // TODO: replace with register function
            // this.authenticate = this.authenticate.bind(this);
        },

        elements: {

            // skipBtn: null,

            emailField: null,
            closeSubNav: null,
            passwordField: null,
            confirmPassword: null,
            registerBtn: null

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

            this.elements.registerBtn = this.placeholder.querySelector('#initiate-registration');
            // this.elements.skipBtn = this.placeholder.querySelector('#continue-local');

            this.elements.emailField = this.placeholder.querySelector('#register-email');
            this.elements.closeSubNav = document.getElementById('close-subconfiguration');
            this.elements.passwordField = this.placeholder.querySelector('#register-password');
            this.elements.confirmPassword = this.placeholder.querySelector('#confirm-password');
            this.elements.states = this.placeholder.querySelectorAll('[data-state]');
        },

        bindEvents: function () {

            Events.subscribe(this.elements.registerBtn, 'click', this.register);
            Events.subscribe(this.elements.closeSubNav, 'click', this.closeFromUi);

            //Add states to the state object
            Array.prototype.forEach.call(this.elements.states, function(state) {
                Events.subscribe(state, 'click', function() {
                    app.stateObject.addState(state.dataset.state);
                });
            });

            // Events.subscribe(this.elements.skipBtn, 'click', this.continueLocal);

        },

        unbindEvents: function () {

            Events.unsubscribe(this.elements.registerBtn, 'click', this.register);
            Events.unsubscribe(this.elements.closeSubNav, 'click', this.closeFromUi);

            // Events.unsubscribe(this.elements.skipBtn, 'click', this.continueLocal);

        },

        /**
         * Get fields values and pass then to the model
         * TODO  validate password and confirm password
         */
        register: function (evnt) {

            evnt.preventDefault();

            var err = '';

            if(view.elements.passwordField.value != view.elements.confirmPassword.value){
                err += "Passwords aren't matching! \n";
            }

            if (!view.validateEmail(view.elements.emailField.value)) {
                err += "Invalid email address!";
            }

            if(!err){

                app.model.registerUser({
                    email: view.elements.emailField.value,
                    password: view.elements.passwordField.value
                });
            }
            else {
                console.log(err);
            }
        },

        /**
         * Close register navigation
         */
        closeFromUi: function () {

            app.stateObject.addState('main');
            this.close();
        },

        /**
         * Close register navigation
         */
        close: function () {
            console.log('sub nav closed - register'); //@todo: remove
            this.placeholder.style.display = 'none';
        },

        validateEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },

        /**
         * Switch to local storage model
         */
        continueLocal: function (evnt) {
            evnt.preventDefault();
        },

    });

})(window, window.app);