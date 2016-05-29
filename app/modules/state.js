(function(Global, app) {

    app.stateObject = {

        page: null,

        /**
         * listenForStateChange - for 'back button' functionality
         * @return {Void}
         */
        listenForStateChange: function() {
            var stateObj = this;

            window.addEventListener('popstate', function(event) {
                var state = event.state.page;
                var prevState = app.stateObject.page;
                console.log('STATE OBJECT: going back to: ' + state + ' view'); //@todo: remove
                stateObj.addState(state);

                if(app.views[prevState + 'View'].persistent) {
                    app.views[prevState + 'View'].close();
                }

            });
        },

        /**
         * Add state - equals to routing
         * @param {String} state
         * @return {Void}
         */
        addState: function(state) {
            if (this.page) {
                app.views[this.page + 'View'].destroy();
            }

            this.page = state;
            history.pushState({page: state}, '', '');
            console.log('STATE OBJECT: pushed ' + this.page + ' view'); //@todo: remove

            app.views[state + 'View'].render();
        },

        /**
         * Preserve state - destroy every view except the given one
         * @param {String} state
         * @return {Void}
         */
        preserveState: function(state) {
            if (this.page !== state) {
                app.views[this.page + 'View'].destroy();
            }
        },

        initialize: function() {
            this.addState('main');
            this.listenForStateChange();
        }
    };

    app.stateObject = Global.Initable.extend(app.stateObject);

})(window, window.app || {});