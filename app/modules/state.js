(function(Global, app) {
    
    app.stateObject = {

        page: null,

        /**
         * [listenForStateChange description]
         * @return {Void} [description]
         */
        listenForStateChange: function() {
            var stateObj = this;

            window.addEventListener('popstate', function(event) {
                var state = event.state.page;
                console.log('STATE OBJECT: going back to: ' + state + ' view'); //@todo: remove
                stateObj.addState(state);
            });
        },

        /**
         * Add state - equals to routing
         * @param {Object} state
         * @return {Void}
         */
        addState: function(state) {
            
            if (this.page) {
                app.views[this.page + 'View'].destroy();
            }

            this.page = state;
            history.pushState({page: state}, '', '');
            console.log('STATE OBJECT: pushed ' + state + ' view'); //@todo: remove

            app.views[state + 'View'].render();
        },

        initialize: function () {

            this.addState('main');
            this.listenForStateChange();
        }
    };

    //initializing the default (=main) state
    Events.subscribe(document, 'app:init', function() {
        app.stateObject.initialize.bind('STATE OBJECT: ' + app.stateObject);
        Events.unsubscribe(document, 'app:init');
    });

    Global.Initable.extend(app.stateObject);
    
})(window, window.app || {});