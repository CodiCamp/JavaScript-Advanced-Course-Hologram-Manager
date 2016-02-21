/**
 * Application model
 */

var app = window.app || {};

(function () {

    app.model = {

        /**
         * Settings object - keeps image properties
         * @type {Object}
         */
        settings: {
            scaled : {
                width : 'width:' + widthValue,
                height : 'height' + heightValue
            },
            translated: {
                x : x,
                y : y,
                z : z
            },
            rotated : 'rotate('+deg+'deg)',
            fliped : {

                horizontalFront : 'transform: rotateX(180deg)',
                horizontalBack : 'transform: rotateX(-180deg)',
                verticalFront : 'transform: rotateY(180deg)',
                verticalBack : 'transform: rotateY(-180deg)'

            },
            moved : {
                left : 'translate('+x+','+y+')',
                right: 'translate('+x+','+y+')',
                up : 'translate('+x+','+y+')',
                down : 'translate('+x+','+y+')'
            }
        },

        /**
         * @param  {String} key
         * @return {Object} value
         */
        get: function(key) {

            var value = JSON.parse(localStorage.key);

            return value;
        },

        /**
         * @param {String} key
         * @param {Object} obj
         */
        set: function(key,obj) {

            var  value = JSON.stringify(obj);
            localStorage.setItem(key,value);

        },

        parse: function(obj) {

        }
    };
})();
