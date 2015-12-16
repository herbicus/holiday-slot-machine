var CSSPlugin = require('../vendor/gsap/plugins/CSSPlugin');
var snow = require('../vendor/snow');

module.exports = function() {

  this.letItSnow = function(element) {
    this.element = element;

    $.fn.snow({ minSize: 5, maxSize: 50, newOn: 1000, flakeColor: '#fcfcfc' });


  };

};