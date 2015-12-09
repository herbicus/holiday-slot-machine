'use strict';

var TweenMax = require('../vendor/gsap/TweenMax');

module.exports = function() {

  // show();
  this.animateIn = function(element) {
    this.element = element;

  	TweenMax.to(element, 0.5, {
      delay: 0.025,
      display: 'block',
  	  autoAlpha: 1,
  	  ease: Power1.easeOut
  	});
  };

  // hide();
  this.animateOut = function(element) {
  	this.element = element;
    
  	TweenMax.to(element, 0.5, {
  	  autoAlpha: 0,
      display: 'none',
  	  ease: Power3.easeOut
  	});
  };

};
