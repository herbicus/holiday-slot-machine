'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var template = require('./home.html');
var AnimationController = require('../../modules/AnimationController');

var Home = Backbone.View.extend({

  template: _.template(template()),

  initialize: function() {

    this.listenTo(this.model, 'change:route', this.onRouteChange);

    this.$el.html(template());

    this.animate = new AnimationController();

    $('.slots-container').removeClass('hasWon');

    var content = {
      data: this.model.get('data')
    };

    $('.reveal-left').attr('src', _.sample(content.data.icons, 1).toString());
    $('.reveal-center').attr('src', _.sample(content.data.icons, 1).toString());
    $('.reveal-right').attr('src', _.sample(content.data.icons, 1).toString());

  },

  hide: function() {

    this.animate.animateOut(this.el);

  },

  show: function() {

    this.animate.animateIn(this.el);

    document.querySelector('#theme').play();

  },

  onRouteChange: function() {

    if (this.model.get('route') === 'home' ){
      this.show();
    } else {
      this.hide();
    }
  }

});

module.exports = Home;
