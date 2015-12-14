'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var template = require('./home.html');
var AnimationController = require('../../modules/AnimationController');

var Home = Backbone.View.extend({

  template: _.template(template()),

  initialize: function() {

    this.$el.html(template());

    //document.querySelector('#theme').play();

    $('.slots-container').removeClass('hasWon');
    
  }

});

module.exports = Home;
