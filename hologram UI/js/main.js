(function startHologramUI() {

    /***
    * 
    */
    function HologramUI() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.container = document.querySelector('.main-container');
        this.one = document.querySelector('.triangle-one');
        this.two = document.querySelector('.triangle-two');
        this.three = document.querySelector('.triangle-three');
        this.four = document.querySelector('.triangle-four');
        this.img = document.querySelectorAll('.main-img');
        this.button = document.querySelector('.button');
        this.wrapper = document.querySelector('.wrapper');
        this.imgWidth = 0;
        this.imgHeight = 0;
        this.timer = null;
        this.imgResize = {};

        console.log(this.width);
        console.log(this.height);

        this.addStyles(this.width, this.height);
        this.bindEvents();
    }

    HologramUI.prototype.getSize = function(width, height) {

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
    };

    HologramUI.prototype.addStyles = function(width, height) {

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
    };
    
    HologramUI.prototype.bindEvents = function() {

        this.showMouse = this.showMouse.bind(this);
        this.checkRotaion = this.checkRotaion.bind(this);

        window.addEventListener('mousemove', this.showMouse);
        window.addEventListener('touchmove', this.showMouse);
        // window.addEventListener("orientationchange", this.checkRotaion, false);
        window.addEventListener("resize", this.checkRotaion, false);
    };

    HologramUI.prototype.hideMouse = function() {
        this.wrapper.classList.add('no-cursor');
        this.button.classList.remove('active');
    };

    HologramUI.prototype.showMouse = function() {

        var self = this;
            self.wrapper.classList.remove('no-cursor');

        setTimeout(function() {
            self.button.classList.add('active');
        }, 600);

        clearTimeout(self.timer);

        self.timer = setTimeout(self.hideMouse.bind(self), 3000);
    };

    HologramUI.prototype.checkRotaion = function() {

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.addStyles(this.width, this.height);

        console.log('rotate');
        console.log(window.innerWidth);
        console.log(window.innerHeight);
    };

    new HologramUI();

})();