'use strict';

var TweenMax = require('../vendor/gsap/TweenMax');
var Draggable = require('../vendor/gsap/utils/Draggable');
var throwProps = require('../vendor/gsap/utils/throwPropsPlugin.min');

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
  this.leverAnimation = function(element) {
    this.element = element;

    TweenMax.set(element, {y: -300, x: -40});

    Draggable.create(element, {
      type:'y',
      throwProps: true,
      edgeResistance: 1.5,
      bounds: {minY: -300, maxY: 0},
      cursor: '-webkit-grab',
      onDragStart:function() {
           TweenMax.set(element, {cursor:'-webkit-grabbing'});
      },
      onDragEnd:function() {
        console.log('lever pulled');
        TweenMax.to(element, 0.5, {
          y: -300,
          ease: Back.easeOut
        });

        TweenMax.to('.inline-slots', 3, {
          delay: 0.25,
          autoAlpha: 1,
          ease: Power4.easeInOut,
          onComplete: function() {
            TweenMax.to('.inline-slots', 0.25, {
              autoAlpha: 0,
              onComplete: function() {
                window.location.href='#greeting';
              }
            });
          }
        });
        
      }
    });

  };

};
