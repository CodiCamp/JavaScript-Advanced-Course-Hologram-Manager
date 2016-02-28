(function(Global) {
    Global.Initable = {
        listenForInit: function() {
            Events.subscribe(document, 'app:init', this.initialize.bind(this));
        },
        extend: function(extendObj) {
            extendObj = _.extendOwn({},this, extendObj);
            extendObj.listenForInit();

            return extendObj;
        }
    };
})(window);
