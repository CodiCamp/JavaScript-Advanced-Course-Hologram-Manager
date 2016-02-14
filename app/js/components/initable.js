(function(Global) {
    Global.Initable = {
        listenForInit: function() {
            Events.subscribe(document, 'app:init', this.init.bind(this));
        },
        extend: function(extendObj) {
            _.extendOwn(extendObj, this);
            extendObj.listenForInit();
        }
    };
})(window);
