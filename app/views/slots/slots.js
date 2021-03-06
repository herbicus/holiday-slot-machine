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
      data: this.model.get('data')
    };

    /**
      * Mobile - Button
    */
    $('#mobilePlay').on('click', function() {
      console.log('lever pulled');
      document.querySelector('#crank').play();
      document.querySelector('#motion').play();

      // snap lever back up
      TweenMax.to('#lever', 0.35, {
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

        $('.reveal').attr('src', _.sample(content.data.icons, 1).toString());

      // if lose - grab three different icons
      } else {
        this.hasWon = false;
        $('.slots-container').removeClass('hasWon');
        $('.reveal-left').attr('src', _.sample(content.data.icons, 1).toString());
        $('.reveal-center').attr('src', _.sample(content.data.icons, 1).toString());
        $('.reveal-right').attr('src', _.sample(content.data.icons, 1).toString());
      }

      // hide revealed icons to make way for animated slots gif
      TweenMax.set('.reveal', {display: 'none', autoAlpha: 0, top: '45%'});

      // slots spinning animation
      var tl = new TimelineMax();
      tl.to('.inline-slots', 1, {autoAlpha: 1});
      tl.to('.inline-slots', 3, {
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
                    setTimeout(function() { 
                      document.querySelector('#winner').play();
                      window.location.href = '#greeting';
                    }, 750);                    
                  }
                }, 0.25);

              // if lose, dispaly three different icons
              } else {
                setTimeout(function() { 
                  document.querySelector('#loser').play();
                }, 750);

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
    
    }); // end Mobile button onClick()
   
    /**
      * Desktop - Draggable Lever
    */
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
        document.querySelector('#motion').play();

        // snap lever back up
        TweenMax.to('#lever', 0.35, {
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

          $('.reveal').attr('src', _.sample(content.data.icons, 1).toString());

        // if lose - grab three different icons
        } else {
          this.hasWon = false;
          $('.slots-container').removeClass('hasWon');

          $('.reveal-left').attr('src', _.sample(content.data.icons, 1).toString());
          $('.reveal-center').attr('src', _.sample(content.data.icons, 1).toString());
          $('.reveal-right').attr('src', _.sample(content.data.icons, 1).toString());
        }

        // hide revealed icons to make way for animated slots gif
        TweenMax.set('.reveal', {display: 'none', autoAlpha: 0, top: '45%'});

        // slots spinning animation
        var tl = new TimelineMax();
        tl.to('.inline-slots', 1, {autoAlpha: 1});
        tl.to('.inline-slots', 3, {
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
                      setTimeout(function() { 
                        document.querySelector('#winner').play();
                        window.location.href = '#greeting';
                      }, 1000);                    
                    }
                  }, 0.25);

                // if lose, dispaly three different icons
                } else {
                  setTimeout(function() { 
                    document.querySelector('#loser').play();
                  }, 750);

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
