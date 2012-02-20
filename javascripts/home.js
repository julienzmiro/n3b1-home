/*
- Donner une class .anim a tous les elements animables
- Au layout, stocker les values initiales des elements (x, y, opacity,...)
*/

$(document).ready(function() {
	var onScroll = function() {
			display.currentY = $(window).scrollTop();
			if(display.currentY > 0) {
				display.isAnimStarted = true;
			} else {
				display.isAnimStarted = false;
			}
			display.animCoeff = Math.floor((display.currentY / ($(document).height() - $(window).height())) * 100);
			if(display.isAnimStarted) {
				display.update();
			} else {
				display.init();
			}
			animations.play();
		},
		display = {
			currentY: 0,
			animCoeff: 0,
			isAnimStarted: false,
			canvasH: 1500,
			init: function() {
				display.resizeMainTitle();
				$("#content").height($(window).height() - 158);
				// First screen position
				$("#homeScreen1").offset(function(index, coords) {
					var newTop = 0;

					newTop = ($(window).height() / 2) - ($("#homeScreen1").height() / 2) - 75;
					return {top: newTop, left: coords.left};
				});
				// Menu initial position
				$("#mainNav").css("margin-top", function() {
					var newMarginTop = 0;

					newMarginTop = ($(window).height() / 2) - ($("#mainNav").height() / 2) - 210;
					return newMarginTop + "px";
				});
				// Canvas scroller height in order to set a fake scrollbar
				$("#canvasScroller").height(display.canvasH);
				// Get animMe elems values
				animations.elements = [$("#mainNav").clone()];
				$(".animMe:not(#mainNav)").each(function(i) {
					//$(this).css("position", "absolute");
					animations.elements.push($(this).clone());
				});
			},
			update: function() {
				
			},
			resizeMainTitle: function() {
				// recuperer la largeur du container
				var containerW = $("#content").width(),
					mainRatio = 9.5,
					subRation = 7.5;
				// taille de police = un certain pourcentage de la largeur du container
				$("#homeTitle1").css("font-size", Math.floor(containerW / mainRatio) + "px");
				$("#homeTitle1 .grey").css("font-size", Math.floor(containerW / subRation) + "px");
				$("#homeTitle1").css("line-height", Math.floor(containerW / mainRatio) + "px");
			}
		},
		animations = {
			elements: [],
			getElementById: function(idToFetch) {
				var i;
				for(i = 0; i < animations.elements.length; i++) {
					if($(animations.elements[i]).attr("id") == idToFetch) {
						return animations.elements[i];
					}
				}
				return null;
			},
			play: function() {
				//Menu
				if(display.animCoeff >= 1 && display.animCoeff <= 20) {
					$("#mainNav").css("margin-top", function(index, value) {
						var currentValue = value.substring(0, $("#mainNav").css("margin-top").length - 2),
								initValue = $(animations.getElementById("mainNav")).css("margin-top").substring(0, $(animations.getElementById("mainNav")).css("margin-top").length - 2),
								coeff = $(window).height() / 185;
								console.log(coeff);
						return initValue - (Math.floor(display.animCoeff * coeff));
					});
				}
				//#homeScreen1 p
				if(display.animCoeff >= 1 && display.animCoeff <= 20) {
					
				}
			}
		};

	// Listeners
	$(window).bind("resize", onScroll);
	$(window).bind("scroll", onScroll);

	// Init
	// TODO : dans l'init, on devra verifier la taille de l'ecran et n'afficher le mode interactif que si l'ecran a une certaine taille
	display.init();
});