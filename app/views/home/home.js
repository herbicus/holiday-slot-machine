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

    document.getElementById('theme').play();

    $('.slots-container').removeClass("hasWon");

    this.animate = new AnimationController();

    this.gameMechanics();
  },

  // Game logic and mechanics/animation
  gameMechanics: function() {

    var content = {
      data: this.model.get('data'),
      winningSrc: _.sample(this.model.get('data').icons, 1),
      losingSrc1: _.sample(this.model.get('data').icons, 1),
      losingSrc2: _.sample(this.model.get('data').icons, 1),
      losingSrc3: _.sample(this.model.get('data').icons, 1)
    };

    console.log(content);

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
        document.getElementById('crank').play();

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

          console.log(content.winningSrc);
          $('.reveal').attr('src', content.winningSrc);

        } else {
          console.log('lost');
          this.hasWon = false;
          $('.slots-container').removeClass("hasWon");
          $('.reveal-left').attr('src', content.losingSrc1);
          $('.reveal-middle').attr('src', content.losingSrc2);
          $('.reveal-right').attr('src', content.losingSrc3);
        }

        console.log(this.hasWon);
        
        TweenMax.to('#lever', 0.5, {
          y: -300,
          ease: Back.easeOut
        });

        TweenMax.to('.reveal', 0.5, {
          display: 'none',
          autoAlpha: 0,
          top: '60%'
        });

        // slots spinning animation
        TweenMax.to('.inline-slots', 3, {
          autoAlpha: 1,
          ease: Power4.easeInOut,
          onComplete: function() {
            TweenMax.to('.inline-slots', 0.25, {
              autoAlpha: 0,
              onComplete: function() { // when slots are done spinning....
                if ($('.slots-container').hasClass('hasWon')) {
                  TweenMax.staggerTo('.reveal', 0.5, {
                    display: 'block',
                    autoAlpha: 1,
                    top: '63%',
                    ease: Back.easeOut,
                    onComplete: function() {
                      document.getElementById('winner').play();
                      window.location.href = '#greeting';
                    }
                  }, 0.25);
                  console.log('You have won, show somthing', this.hasWon);
                } else {
                  console.log('You have lost, try again');
                  document.getElementById('loser').play();
                  TweenMax.staggerTo('.reveal', 0.5, {
                    display: 'block',
                    autoAlpha: 1,
                    top: '63%',
                    ease: Back.easeOut
                  }, 0.25);
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
