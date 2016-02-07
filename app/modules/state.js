(function(app) {

    /**
     * TO DO: Link to the main app namespace
     */

    app.state = {

        state: {page: ''},

        /**
         * [listenForStateChange description]
         * @return {Void} [description]
         */
        listenForStateChange: function() {
            stateObj = this;

            this.addState('page1');

            window.addEventListener('popstate', function(event) {
                var state = event.state.page;
                stateObj.addState(state);
            });
        },

        /**
         * Add state - equals to routing
         * @param {Object} state
         * @return {Void}
         */
        addState: function(state) {
            this.state.page = state;
            history.pushState(this.state, '', '');
        }
    };

    app.state.listenForStateChange();
    
})(window.app || {});