// Initial
(function(Global, app) {

    var view = app.views.mainView = Global.GenericView.extend({
        name: 'main',

        screen: {
            width: 0,
            height: 0
        },

        elements: {
            projectionArea: null
        },

        uiElements: {
            configurationButton: null,
            closeConfigurationButton: null,
            configurationModal: null
        },

        init: function () {
            console.log(this.name);
        },


        getElements: function () {
            //Configuration elements
            this.uiElements.closeConfigurationButton = document.getElementById('close-configuration');
            this.uiElements.configurationModal = document.getElementById('configuration-modal');
            this.uiElements.configurationButton = document.getElementById('call-configuration');
            //Projection elements
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
        },

        onRender: function() {
            this.getElements();
            this.updateScreenParams();
            this.bindEvents();
        },

        bindEvents: function () {
            //Call configuration modal
            Events.subscribe(this.uiElements.configurationButton, 'click', function showConfigurationMenu () {
                view.uiElements.configurationModal.classList.add('active');
            });

            //Close configuration modal
            Events.subscribe(this.uiElements.closeConfigurationButton, 'click', function hideConfigurationMenu () {
                view.uiElements.configurationModal.classList.remove('active');
            });
        }

    });    

})(window, window.app);