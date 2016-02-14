(function(app) {

    /**
     * TO DO: Link to the main app namespace
     */

    app.stateObject = {

        page: null,
        routes: [],

        /**
         * [listenForStateChange description]
         * @return {Void} [description]
         */
        listenForStateChange: function() {
            var stateObj = this;

            window.addEventListener('popstate', function(event) {
                var state = event.state.page;
                stateObj.addState(state);
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
            history.pushState(this.state, '', '');

            app.views[state + 'View'].render();
        },

        setup: function () {

            this.addState('main');
            this.listenForStateChange();
        }
    };
    
})(window.app || {});