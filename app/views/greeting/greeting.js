'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var template = require('./greeting.html');
var AnimationController = require('../../modules/AnimationController');

var Greeting = Backbone.View.extend({

  template: _.template(template()),

  initialize: function() {

    var content = {
      data: this.model.get('data'),
      winningSrc: _.shuffle(this.model.get('data').icons, 1),
      losingSrc1: _.shuffle(this.model.get('data').icons, 1),
      losingSrc2: _.shuffle(this.model.get('data').icons, 1),
      losingSrc3: _.shuffle(this.model.get('data').icons, 1)
    };

    this.$el.html(this.template(content));

    this.listenTo(this.model, 'change:route', this.onRouteChange);

    this.animate = new AnimationController();

  },

  // #greeting autoAlpha: 0 - sets position of icon and greeting
  hide: function() {
    this.animate.animateOut(this.el);
    
    TweenMax.to('.hero-title-holder', 0.5, {
      top: 0,
      ease: Power4.easeOut
    });

    TweenMax.to('.l-greeting-section', {top: -135});
    TweenMax.set('#greeting img', {top: -500, autoAlpha: 0});
  },

  // #greeting autoAlpha: 1 - tweens greeting and icon
  show: function() {

    this.animate.animateIn(this.el);

    //this.animate.iconSpin('#mainIcon');
    document.querySelector('#theme').volume = 0.2;

    TweenMax.to('.hero-title-holder', 1, {
      top: -100,
      ease: Power2.easeOut
    });

    TweenMax.to('.l-greeting-section', 0.5, {
      delay: 0.15,
      top: 0,
      ease: Power4.easeOut,
      onComplete: function() {
        TweenMax.to('#greeting img', 0.75, {
          top: 0,
          autoAlpha: 1,
          ease: Power3.easeOut
        });
      }
    });

  },

  onRouteChange: function() {

    if (this.model.get('route') === 'greeting' ){
      this.show();
    } else {
      this.hide();
    }
  }
});

module.exports = Greeting;
