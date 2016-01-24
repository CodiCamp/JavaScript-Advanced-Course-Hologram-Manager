var templates = {};

(function() {
    var appState = {
        state: {page: ''},

        listenForStateChange: function() {
            stateObj = this;

            this.addState('page1');
            window.addEventListener('popstate', function(event) {
                var state = event.state.page;
                stateObj.addState(state);
            });
        },

        addState: function(state) {
            this.state.page = state;
            history.pushState(this.state, '', '');
            this.loadTemplate();
        },

        loadTemplate: function() {
            // Problem with LABjs:
            // Only scripts are loading and you don't have the ability to load html directly.
            // How we will protect other files to be loaded?
            var file = 'templates/' + this.state.page + '.js',
                callback = function() {
                    this.render(this.state.page);
                }.bind(this);

            $LAB.script({ src: file, type: 'text/javascript' }).wait(callback);
        },

        render: function(template) {
            document.querySelector('#container').innerHTML = templates[template];
        }
    };

    appState.listenForStateChange();

    var navButtons = document.querySelectorAll('.nav');
    Array.prototype.forEach.call(navButtons, function(button) {
        button.addEventListener('click', function() {
            appState.addState(this.dataset.link);
        });
    });
})();
