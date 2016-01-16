(function() {
    var templates = {
        page1: 'Hello, this is page 1',
        page2: 'Woo, you just got on page2!',
        page3: 'In the jungle, the mighty jungle... '
    };

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
           var container = document.querySelector('#container');
           container.innerHTML = templates[this.state.page];
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