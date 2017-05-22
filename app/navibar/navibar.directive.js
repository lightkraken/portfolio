'use strict';

angular.module('portfolio.navibar')

.directive('navibar', [function(){
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'navibar/navibar.tpl.html',
      link: function($scope, $element) {

        // change navbar height on scrolling
      	var didScroll = false;
      	var changeNavbarOn = 75;
      	var adjustNavbarHeight = function() {
          var scrollY = $(window).scrollTop();
      		if (scrollY >= changeNavbarOn) {
            $element.addClass('navibar--scrolled');
      		}
      		else {
            $element.removeClass('navibar--scrolled');
      		}
      		didScroll = false;
      	};
        adjustNavbarHeight();

        // highlight the current section in the navbar
        var highlightSelection = function(selection, remove) {
          switch(selection) {
            case 'about':
              if (remove) {
                $('.navibar-item--about').removeClass('navibar-item--selected');
              } else {
                $('.navibar-item--about').addClass('navibar-item--selected');
              }
              break;
            case 'portfolio':
              if (remove) {
                $('.navibar-item--portfolio').removeClass('navibar-item--selected');
              } else {
                $('.navibar-item--portfolio').addClass('navibar-item--selected');
              }
              break;
            case 'contact':
              if (remove) {
                $('.navibar-item--contact').removeClass('navibar-item--selected');
              } else {
                $('.navibar-item--contact').addClass('navibar-item--selected');
              }
              break;
            default:
              $('.navibar-item--about').removeClass('navibar-item--selected');
              $('.navibar-item--portfolio').removeClass('navibar-item--selected');
              $('.navibar-item--contact').removeClass('navibar-item--selected');
          }
        };

        var highlightCurrentSection = function(){
          var windowMidPoint = $(window).height()/2 + $(window).scrollTop();
          var about = {
            top: $('#about').offset().top,
            bottom: $('#about').offset().top + $('#about').outerHeight() + $('#about-skills').outerHeight() + $('#about-tools').outerHeight()
          };
          var portfolio = {
            top: $('#portfolio').offset().top,
            bottom: $('#portfolio').offset().top + $('#portfolio').outerHeight()
          };
          var contact = {
            top: $('#contact').offset().top,
            bottom: $('#contact').offset().top + $('#contact').outerHeight()
          };

          if ((about.top < windowMidPoint) && (about.bottom > windowMidPoint)) {
            highlightSelection('about');
          } else {
            highlightSelection('about', true);
          }

          if ((portfolio.top < windowMidPoint) && (portfolio.bottom > windowMidPoint)) {
            highlightSelection('portfolio');
          } else {
            highlightSelection('portfolio', true);
          }

          if ((contact.top < windowMidPoint) && (contact.bottom > windowMidPoint)) {
            highlightSelection('contact');
          } else {
            highlightSelection('contact', true);
          }
        };
        highlightCurrentSection();

        // watch scroll to change navbar height, and highlight current section
        window.addEventListener( 'scroll', function() {
    			if(!didScroll) {
    				didScroll = true;
    				setTimeout(adjustNavbarHeight, 250);
    			}
          if (!movingToSection) {
            highlightCurrentSection();
          }
    		}, false);

        var movingToSection = false;
        $scope.scrollToSection = function(id){
          var windowTop = $(window).scrollTop();
          var elementPosition = $(id).offset().top;
          var duration = Math.abs(windowTop - elementPosition) * 0.4;
          if (duration < 500) {
            duration = 500;
          }
          if (id !== '#top') {
            elementPosition -= 85;
          }

          $({scroll: windowTop}).animate({scroll: elementPosition}, {
            duration: duration,
            easing: 'swing',
            step: function(val){
              $(window).scrollTop(val);
            },
            start: function(){
              movingToSection = true;
              highlightSelection('none');
              if (id === '#about') {
                highlightSelection('about');
              } else if (id === '#portfolio') {
                highlightSelection('portfolio');
              } else if (id === '#contact') {
                highlightSelection('contact');
              }
            },
            complete: function(){
              movingToSection = false;
              highlightCurrentSection();
            }
          });
        };

      }
    };
}]);
