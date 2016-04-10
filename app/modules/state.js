(function(Global, app) {
    
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

        initialize: function () {

            this.addState('main');
            this.listenForStateChange();
        }
    };

    //initializing the default (=main) state
    Events.subscribe(document, 'app:init', function appStateInit () {
        app.stateObject.initialize.bind(app.stateObject);
        Events.unsubscribe(document, 'app:init', appStateInit);
    });

    Global.Initable.extend(app.stateObject);
    
})(window, window.app || {});