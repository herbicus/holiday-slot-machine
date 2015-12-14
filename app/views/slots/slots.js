'use strict';

var $ = require('jquery');
var _ = require('underscore');
var Backbone = require('backbone');
var template = require('./slots.html');
var AnimationController = require('../../modules/AnimationController');

var Slots = Backbone.View.extend({

  template: _.template(template()),

  initialize: function() {

    this.listenTo(this.model, 'change:route', this.onRouteChange);

    this.$el.html(template());

    $('.slots-container').removeClass('hasWon');

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

    // game logic and animations happen in onDragEnd()
    Draggable.create('#lever', {
      type:'y',
      throwProps: true,
      edgeResistance: 1.5,
      // bounds: {minY: -300, maxY: 0},
      bounds: {minY: -300, maxY: 0},
      cursor: '-webkit-grab',
      onDragStart:function() {
           TweenMax.set('#lever', {cursor:'-webkit-grabbing'});
      },
      onDragEnd:function() { // spin slots
        console.log('lever pulled');
        document.querySelector('#crank').play();

        // snap lever back up
        TweenMax.to('#lever', 0.5, {
          y: -300,
          ease: Back.easeOut
        });

        // game logic vars
        this.spinOne = [1, 2, 3];
        this.spinTwo = [1, 2, 3];
        this.choiceOne =  _.sample(this.spinOne, 1).toString();
        this.choiceTwo = _.sample(this.spinTwo, 1).toString();
        this.hasWon;

        // stuff to do if win or lose
        // if win - add hasWon class/asign three identical icons to display in slots
        if (this.choiceOne === this.choiceTwo) {
          this.hasWon = true;

          $('.slots-container').addClass('hasWon');

          console.log(content.winningSrc);
          $('.reveal').attr('src', content.winningSrc);

        // if lose - grab three different icons
        } else {
          this.hasWon = false;
          $('.slots-container').removeClass('hasWon');
          $('.reveal-left').attr('src', content.losingSrc1);
          $('.reveal-middle').attr('src', content.losingSrc2);
          $('.reveal-right').attr('src', content.losingSrc3);
        }

        // hide revealed icons to make way for animated slots gif
        TweenMax.set('.reveal', {display: 'none', autoAlpha: 0, top: '55%'});

        // slots spinning animation
        var tl = new TimelineMax();
        tl.to('.inline-slots', 1, {autoAlpha: 1});
        tl.to('.inline-slots', 2.5, {
          autoAlpha: 1,
          ease: Power4.easeInOut,
          onComplete: function() { // when finished spin anim, reveal
            TweenMax.to('.inline-slots', 0.25, {
              autoAlpha: 0,
              onComplete: function() { // when slots are done spinning...               
                // if win, display three identical icons
                if ($('.slots-container').hasClass('hasWon')) {
                  TweenMax.staggerTo('.reveal', 0.5, {
                    display: 'block',
                    autoAlpha: 1,
                    top: '63%',
                    ease: Back.easeOut,
                    onComplete: function() { // reveal #greeting view
                      document.querySelector('#winner').play();
                      window.location.href = '#greeting';
                    }
                  }, 0.25);

                // if lose, dispaly three different icons
                } else {
                  document.querySelector('#loser').play();
                  TweenMax.staggerTo('.reveal', 0.5, {
                    display: 'block',
                    autoAlpha: 1,
                    top: '63%',
                    ease: Back.easeOut
                  }, 0.25);
                }
                
              } // end onComplete - winning or losing slot machine icons reveal
            
            }); // end Tween - spin gifs end and reveal icons

          } // end onComplete - spin gif animation and decide to reveal win or lose icons

        }); // end Tween - slots spin animation
        
      } // end onDragEnd()

    }); // end Draggable

  }

});

module.exports = Slots;
