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

    document.querySelector('#theme').volume = 0.2;
    this.animate.animateIn(this.el);
    //this.animate.iconSpin('#mainIcon');

    var tl = new TimelineMax();

    tl.to('#greeting', 0.75, {delay: 0.15, height: '90%', ease: Back.easeInOut});
    tl.to('.hero-title-holder', 0.75, {top: -100, autoAlpha: 1, ease: Power2.easeOut}, 0.8);
    tl.to('.l-greeting-section', 0.75, {top: 0, autoAlpha: 1, ease: Power4.easeOut}, 0.9);
    tl.to('#greeting img', 0.75, {top: 0, autoAlpha: 1, ease: Power3.easeOut}, 1);
    tl.to('#social-list', 0.75, {top: 0, autoAlpha: 1, ease: Power3.easeOut}, 1.15);
    tl.to('.btn-play-again', 0.75, {top: 0, autoAlpha: 1, ease: Power3.easeOut}, 1.25);

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
