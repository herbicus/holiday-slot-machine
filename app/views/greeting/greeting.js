'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var template = require('./greeting.html');
var AnimationController = require('../../modules/AnimationController');
var SlotMachine = require('../../modules/SlotMachine');

var Update = Backbone.View.extend({

  template: _.template(template()),

  events: {
    'click a': 'shffuleContent'
  },

  initialize: function() {

    // this.slotMachine = new SlotMachine();
    // this.slotMachine.init();   
    
    // underscore
    var content = {
      data: this.model.get('data'),
      newData: _.shuffle(this.model.get('data').greeting, 1),
      newImg: _.shuffle(this.model.get('data').icons, 1)
    };
    //var content = this.model.get('data');

    // console.log(this.newData);
    // console.log(this.newImg);

    console.log( content );


    this.$el.html(this.template(content));

    this.listenTo(this.model, 'change:route', this.onRouteChange);

    this.animate = new AnimationController();

  },

  init: function() {



  },

  shffuleContent: function() {
    console.log("pushed");
    _.shuffle(this.model.get('data').greeting, 1);
    _.shuffle(this.model.get('data').icons, 1);

    if (this.model.get('mobile') === false) {
      TweenMax.to('canvas', 0.25, {
        bottom: 0,
        ease: Power4.easeOut
      });
    }

  },

  hide: function() {
    this.animate.animateOut(this.el);
    // TweenMax.to(this.el, {
    //   bottom: 0,
    //   ease: Power4.easeOut
    // });
    // this.shffuleConent();
  },

  show: function() {

    this.animate.animateIn(this.el);
    // TweenMax.to(this.el, {
    //   bottom: '-10%',
    //   ease: Power4.easeOut
    // });
    // this.shffuleConent();
  },

  onClick:function(event) {
    // tracking call here
  },

  onRouteChange: function() {

    if (this.model.get('route') === 'greeting' ){
      this.show();
    } else {
      this.hide();
    }
  }
});

module.exports = Update;
