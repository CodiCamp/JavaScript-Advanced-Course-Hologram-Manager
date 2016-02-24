// Initial
'use strict';
var app = app || {};

(function (global){

	app.mainView = {

		init: function() {
			// this.template = app.templates.main;
			// this.name = 'baseView';
			// this.placeholder = document.getElementById("content")

			// this.render();
			this.hologramUI();
		},

		render: function() {
			this.placeholder.innerHTML = this.template; 
		},

		/***
		* Start app - the code structer will be change
		*/
		hologramUI: function() {

	        this.width = global.innerWidth;
	        this.height = global.innerHeight;
	        this.container = document.querySelector('.main-container');
	        this.one = document.querySelector('.triangle-one');
	        this.two = document.querySelector('.triangle-two');
	        this.three = document.querySelector('.triangle-three');
	        this.four = document.querySelector('.triangle-four');
	        this.img = document.querySelectorAll('.main-img');
	        this.button = document.querySelector('.button');
	        this.wrapper = document.querySelector('.wrapper');
	        this.closeBtn = document.querySelector('.close-btn');
	        this.nav = document.querySelector('.nav');
	        this.certain = document.querySelector('.certain');
	        this.imgWidth = 0;
	        this.imgHeight = 0;
	        this.timer = null;
	        this.timerActive = null;
	        this.imgResize = {};

	        console.log(this.width);
	        console.log(this.height);

	        this.addStyles(this.width, this.height);
	        this.bindEvents();
	    },

	    /***
		* Get viewport size
		* @param {int} width - viewport width
		* @param {int} height - viewport height
		* @return Object
		*/
	    getSize: function(width, height) {

	        if (width > height) {
	                this.imgResize = {
	                size: height,
	                type: 'height'
	            };
	        } else {
	            this.imgResize = {
	                size: width,
	                type: 'width'
	            };
	        }

	        return this.imgResize;
	    },

	    /***
		* Apply css style to elements based on viewport size
		* @param {int} width - viewport width
		* @param {int} height - viewport height
		* @return void
		*/
	    addStyles: function(width, height) {

	        var resize = this.getSize(width, height);
	        console.log(resize.size);

	        this.container.style.cssText = 'height: ' + resize.size + 'px; width: ' + resize.size + 'px';

	        for (var i = 0; i < this.img.length; i++) {
	            this.img[i].style.width = (resize.size*25)/100 + 'px';
	        }

	        this.imgHeight = this.img[1].height;
	        this.imgWidth = this.img[1].width;

	        console.log(this.imgHeight);

	        this.one.style.cssText = 'height: ' + this.imgHeight + 'px; width: ' + this.imgWidth + 'px';
	        this.two.style.cssText = 'height: ' + this.imgHeight + 'px; width: ' + this.imgWidth + 'px';
	        this.three.style.cssText = 'height: ' + this.imgHeight + 'px; width: ' + this.imgWidth + 'px';
	        this.four.style.cssText = 'height: ' + this.imgHeight + 'px; width: ' + this.imgWidth + 'px';

	        this.img[1].style.right = '-' + (this.imgWidth - this.imgHeight)/2 + 'px';
	        this.img[3].style.left = '-' + (this.imgWidth - this.imgHeight)/2 + 'px';

	        this.wrapper.style.paddingTop = '0px';
	        this.wrapper.style.paddingBottom = '0px';

	        if (resize.type === 'width') {
	            console.log(resize.type);
	            this.wrapper.style.paddingTop = ((this.height - resize.size)/2) + 'px';
	            this.wrapper.style.paddingBottom = ((this.height - resize.size)/2) + 'px';
	        }
	    },

	    /***
		* Bind all events
		* @return void
		*/
	    bindEvents: function() {

	        this.showMouse = this.showMouse.bind(this);
	        this.checkRotaion = this.checkRotaion.bind(this);
	        this.showMenu = this.showMenu.bind(this);
	        this.hideMenu = this.hideMenu.bind(this);

	        global.addEventListener('mousemove', this.showMouse);
	        global.addEventListener('touchmove', this.showMouse);
	        
	        // global.addEventListener("orientationchange", this.checkRotaion, false);
	        global.addEventListener("resize", this.checkRotaion, false);

	        this.button.addEventListener("click", this.showMenu);
	        this.button.addEventListener("touchstart", this.showMenu);

	        this.closeBtn.addEventListener("click", this.hideMenu);
	        this.closeBtn.addEventListener("touchstart", this.hideMenu);

	        this.certain.addEventListener("click", this.hideMenu);
	        this.certain.addEventListener("touchstart", this.hideMenu);
	    },

	    /***
		* Bind mousemove event
		* @return void
		*/
	    bindMouseMove: function() {
	    	window.addEventListener('mousemove', this.showMouse);
	    	window.addEventListener('touchmove', this.showMouse);
	    },

	    /***
		* Bind mousemove event
		* @return void
		*/
	    unbindMouseMove: function() {
	    	window.removeEventListener('mousemove', this.showMouse);
	    	window.removeEventListener('touchmove', this.showMouse);
	    },

	    /***
		* Hide mouse cursor and menu button
		* @return void
		*/
	    hideMouse: function() {
	        this.wrapper.classList.add('no-cursor');
	        this.button.classList.remove('active');
	    },

	    /***
		* Show mouse cursor and menu button
		* @return void
		*/
	    showMouse: function() {

	        var self = this;

            self.wrapper.classList.remove('no-cursor');
            self.button.classList.add('active');

	        clearTimeout(self.timer);

	        self.timer = setTimeout(self.hideMouse.bind(self), 3000);
	    },

	    /***
		* Check for viewport changes and apply them to addStyle function
		* @return void
		*/
	    checkRotaion: function() {

	        this.width = global.innerWidth;
	        this.height = global.innerHeight;

	        this.addStyles(this.width, this.height);

	        console.log('rotate');
	        console.log(global.innerWidth);
	        console.log(global.innerHeight);
	    },

	    /***
		* Show navigation menu
		* @return void
		*/
	    showMenu: function(e) {

	    	e.preventDefault();

	    	// resize hologram container for preview - in workin progress
	    	this.width = global.innerWidth - 300;
	        this.height = global.innerHeight - 300;
	    	var size = this.getSize(this.width, this.height);
			// resize hologram container for preview - in workin progress
	    	if (size.type === 'height') {
	    		console.log('in height');

		        this.addStyles(this.width, this.height);
	    	}

	    	this.nav.classList.add('active');
	    	this.button.classList.remove('active');
	    	this.certain.classList.add('active');

	    	this.unbindMouseMove();
	    },

	    /***
		* Hide navigation menu
		* @return void
		*/
	    hideMenu: function() {

	    	this.width = global.innerWidth;
	        this.height = global.innerHeight;
	    	var size = this.getSize(this.width, this.height);

	    	if (size.type === 'height') {
	    		console.log('in height');

		        this.addStyles(this.width, this.height);
	    	}

	    	this.nav.classList.remove('active');
	    	this.button.classList.add('active');
	    	this.certain.classList.remove('active');

	    	this.bindMouseMove();
	    }
	};

	app.mainView.init();
})(window);