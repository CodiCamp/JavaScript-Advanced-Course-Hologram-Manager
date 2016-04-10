(function(Global) {
    Global.Initable = {
        listenForInit: function() {
            Events.subscribe(document, 'app:init', this.initialize.bind(this));
        },

        /**
         * Removes event "app:init" with "initialize" handler for every object that extends "Initable" object.
         *
         * @return void
         */
        stopListenForInit: function () {
            Events.unsubscribe(document, 'app:init', this.initialize.bind(this));
        },

        extend: function(extendObj) {
            extendObj = _.extendOwn({},this, extendObj);
            extendObj.listenForInit();

            return extendObj;
        }
    };
})(window);
