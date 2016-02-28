// Initial
(function(Global, app) {

    app.views.mainView = _.extendOwn({
        name: 'main',

        screen: {
            width: 0,
            height: 0
        },

        elements: {
            projectionArea: null
        },

        init: function () {
            console.log(this.name);
        },


        getElements: function () {
            this.elements.projectionArea = document.getElementById('projection');
            // this.controls.flipImage = document.getElementById('js-flip-image');
            // this.controls.fullScreen = document.getElementById('js-full-screen');
        },

        updateScreenParams: function () {
            this.screen.width = window.innerWidth ;
            this.screen.height = window.innerHeight ;
            this.projectionAreaSize = Math.min(this.screen.width, this.screen.height);
            this.projectionAreaPositionX = (this.screen.width / 2) - (this.projectionAreaSize / 2);
            this.projectionAreaPositionY = 0;

            this.sizeProjectionArea();
        },

        sizeProjectionArea: function () {
            //size
            this.elements.projectionArea.style.width = this.projectionAreaSize + 'px';
            this.elements.projectionArea.style.height = this.projectionAreaSize + 'px';

            //position
            this.elements.projectionArea.style.top = this.projectionAreaPositionY + 'px';
            this.elements.projectionArea.style.left = this.projectionAreaPositionX + 'px';
        }

    }, Global.GenericView);

    app.views.mainView.onRender = function() {
        this.getElements();
        this.updateScreenParms();
    };
    

})(window, window.app);