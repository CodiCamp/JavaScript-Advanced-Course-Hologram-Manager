(function(Global) {
    Global.Initable = {
        listenForInit: function() {
            this.initialize = this.initialize.bind(this);
            this.stopListenForInit = this.stopListenForInit.bind(this);
            
            Events.subscribe(document, 'app:init', this.initialize);
            Events.subscribe(document, 'app:init', this.stopListenForInit);
        },

        /**
         * Removes event "app:init" with "initialize" handler for every object that extends "Initable" object.
         * @return {void}
         */
        stopListenForInit: function () {
            Events.unsubscribe(document, 'app:init', this.initialize);
            Events.unsubscribe(document, 'app:init', this.stopListenForInit);
        },

        extend: function(extendObj) {
            extendObj = _.extendOwn({}, this, extendObj);
            extendObj.listenForInit();

            return extendObj;
        }
    };
})(window);
