'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var template = require('./nav.html');

var Nav = Backbone.View.extend({

  template: _.template(template()),

  // nav animation events
  events: {
    'click a': 'onClick',
    'click .btn-mobile-nav': 'navAnimation'
  },

  autoHide: function() {
    if (this.model.get('isMenuOpen') === true){
      this.navAnimation();
    }
  },

  initialize: function() {
    $('main').on('click', this.autoHide.bind(this));

    this.$el.html(template());

  },

  onClick:function(event) {
    this.navAnimation(null);
  },

  navAnimation: function() {

    this.model.set( 'isMenuOpen', !this.model.get('isMenuOpen'));

    if (this.model.get('mobile') || this.model.get('tablet')) {
      if ($('header nav').hasClass('opened')) {
        TweenMax.to('header nav', 0.30, {left: '-80%', ease: Power2.easeOut});
      } else {
        TweenMax.to('header nav', 0.50, {left: 0, ease: Power2.easeOut});
      }
    } 

    $('header nav').toggleClass('opened');

  }
});

module.exports = Nav;

