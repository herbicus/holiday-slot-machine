'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var AnimationController = require('../../modules/AnimationController');

var Home = Backbone.View.extend({

  events: {
    'click a': 'leverPull',
  },

  initialize: function() {
    this.listenTo(this.model, 'change:route', this.onRouteChange);

    $('.slots-container').removeClass("hasWon");

    this.animate = new AnimationController();

    this.gameMechanics();
  },

  gameMechanics: function() {

    TweenMax.set('#lever', {y: -300, x: -40});

    Draggable.create('#lever', {
      type:'y',
      throwProps: true,
      edgeResistance: 1.5,
      bounds: {minY: -300, maxY: 0},
      cursor: '-webkit-grab',
      onDragStart:function() {
           TweenMax.set('#lever', {cursor:'-webkit-grabbing'});
      },
      onDragEnd:function() {
        console.log('lever pulled');

        // game logic
        this.slotOne = [1,2,3];
        this.slotTwo = [1,2,3];
        this.choiceOne =  _.sample(this.slotOne, 1).toString();
        this.choiceTwo = _.sample(this.slotTwo, 1).toString();
        this.hasWon;

        if (this.choiceOne === this.choiceTwo) {
          console.log('won');
          this.hasWon = true;
          $('.slots-container').addClass("hasWon");
        } else {
          console.log('lost');
          this.hasWon = false;
          $('.slots-container').removeClass("hasWon");
        }

        console.log(this.hasWon);
        
        TweenMax.to('#lever', 0.5, {
          y: -300,
          ease: Back.easeOut
        });

        // slots spinning animation
        TweenMax.to('.inline-slots', 3, {
          delay: 0.25,
          autoAlpha: 1,
          ease: Power4.easeInOut,
          onComplete: function() {
            TweenMax.to('.inline-slots', 0.25, {
              autoAlpha: 0,
              onComplete: function() { // when slots are done spinning....
                if ($('.slots-container').hasClass('hasWon')) {
                  window.location.href = '#greeting';
                  console.log('You have won, show somthing', this.hasWon);
                } else {
                  console.log('You have lost, try again');
                }
                
              }
            });
          }
        });
        
      }

    });

  }
});

module.exports = Home;
