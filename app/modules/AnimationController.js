'use strict';

var TweenMax = require('../vendor/gsap/TweenMax');
// var Draggable = require('../vendor/gsap/Draggable');

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

  // lever anim
  this.leverAnimation = function(element, container) {
    this.element = element;

    TweenMax.set(element, {y: -100});

    Draggable.create(element, {
      type:"y",
      bounds: container,
      throwProps: true,
      cursor: '-webkit-grab', /* set initial cursor to grab */
      onDragStart:function(){
           TweenMax.set(element,{cursor:'-webkit-grabbing'});
      },
      onDragEnd:function() {
        console.log("lever pulled");
        TweenMax.to(element, 0.5, {
          y: -100,
          ease: Back.easeOut
        });
      }
    });
  }

};
