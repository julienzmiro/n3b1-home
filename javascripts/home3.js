$(document).ready(function () {
	
	// Main init function
	var init = function () {
		$(document).scrollTop(0);
		layout.initStatic();
		if(layout.isDynamic) {
			layout.initDynamic();
		}
		$(window).scroll(onScroll);
		$(window).resize(onScroll);
	},
	// Layout object that will handle every action relative to the layout
	layout = {
		// Height of the content
		// TODO : should be fixed on init + resize / scroll
		canvasH: 1500,
		// Check the size of the screen for dynamic mode
		isDynamic: function () {
			// TODO : check screen size
			return true;
		},
		// Init layout of static mode
		initStatic: function () {
			layout.resizeText();
		},
		// Init layout of dynamic mode
		initDynamic: function () {
			$("#content").height($(window).height() - 158);
			// Canvas scroller height in order to set a fake scrollbar
			$("#canvasScroller").height(layout.canvasH);
			// Get animMe elems values
			//anim.elems = [$("#mainNav").clone()];
			//anim.elems = [];
			$(".animMe").each(function (i) {
				$(this).css("position", "absolute");
				$(this).css("top", 0);
				$(this).css("left", 0);
				$(".animScreen").css("display", "none");
			});
			layout.posFirstScreen();
			// Menu initial position
			/*
			$("#mainNav").css("margin-top", function() {
				var newMarginTop = 0;

				newMarginTop = ($(window).height() / 2) - ($("#mainNav").height() / 2) - 210;
				return newMarginTop + "px";
			});
			*/
		},
		// Update the layout when isAnimStarted
		update: function () {
			layout.posFirstScreen();
		},
		posFirstScreen: function () {
			$("#homeScreen1").offset(function (index, coords) {
				var newTop = 0;

				newTop = ($(window).height() / 2) - ($("#homeScreen1").height() / 2);
				return {top: newTop, left: coords.left};
			});
			$("#homeScreen1").css("display", "block");
		},
		// Handle text resizing depending on the container width
		resizeText: function () {
			// On pourrait stocker la height initiale de chaque text
			// Si le resize provoque un changement de height, on conserve la height initiale et on reduit la font-size relativement a la difference de height
			// TODO : do the same for all texts
			// recuperer la largeur du container
			var containerW = $("#content").width(),
				mainRatio = 9.5,
				subRation = 7.5;
			$("#homeTitle1").css("font-size", Math.floor(containerW / mainRatio) + "px");
			$("#homeTitle1 .grey").css("font-size", Math.floor(containerW / subRation) + "px");
			$("#homeTitle1").css("line-height", Math.floor(containerW / mainRatio) + "px");
		}
	},
	// Anim object that will handle everything related to animations
	anim = {
		// Value that represents the percent of animation that has been played
		coeff: 0,
		isStarted: false,
		// Store the absolute top position of the screen in the whole document
		topY: 0,
		// Store the absolute bottom position of the screen in the whole document
		bottomY: 0,
		// Store the absolute value of the document height above the top of the screen
		winScroll: 0,
		// Store anim elements
		elems: [
			{
				startAtCoeff: 1,
				endAtCoeff: 10,
				selector: "#homeScreen1",
				top: {
					from: 50,
					to: 5
				}
			}/*,
			{
				startAtCoeff: 20,
				endAtCoeff: 29,
				selector: "#homeScreen1",
				top: {
					from: 5,
					to: -10
				},
				opacity: {
					from: 1,
					to: 0
				}
			}*/
		],
		getElemsAnimatedAt: function (coeff) {
			var i,
				result = [];
			for(i = 0; i < anim.elems.length; i++) {
				if(anim.elems[i].startAtCoeff <= coeff && anim.elems[i].endAtCoeff >= coeff) {
					result.push(anim.elems[i]);
				}
			}

			return result;
		},
		// Update the animation state
		update: function () {
			anim.winScroll = anim.topY = $(window).scrollTop();
			anim.bottomY = anim.winScroll + $(window).height();
			anim.coeff = Math.floor((anim.topY / ($(document).height() - $(window).height())) * 100);

			if(anim.topY > 0) {
				anim.isStarted = true;
			} else {
				anim.isStarted = false;
			}
			
			anim.play();
			
		},
		play: function() {
			var animElems = anim.getElemsAnimatedAt(anim.coeff);

			$.each(animElems, function (i, cAnim) {
				if(cAnim.top) {
					$(cAnim.selector).css("top", function () {
						// Value relative au coeff local (startAt endAt)
						var newTop = 0,
							coeffLocal = Math.floor(anim.coeff / (cAnim.endAtCoeff - cAnim.startAtCoeff));
							console.log("-----------------------------------");
							console.log("anim.coeff / (cAnim.endAtCoeff - cAnim.startAtCoeff) = coeffLocal");
							console.log(anim.coeff + " / (" + cAnim.endAtCoeff + " - " + cAnim.startAtCoeff + ") = " + coeffLocal);

						newTop = cAnim.top.to * coeffLocal;
						console.log("newTop : " + newTop);

						return newTop;
					})
				}
			});
/*
			if(anim.coeff > 0 && anim.coeff <= 10) {
				console.log(">0 && <= 10 : " + anim.coeff);
			} else if(anim.coeff > 10 && anim.coeff <= 20) {
				console.log("> 10 &&<= 20 : " + anim.coeff);
			} else if(anim.coeff > 20 && anim.coeff <= 30) {
				console.log("> 20 &&<= 30 : " + anim.coeff);
			} else if(anim.coeff > 30 && anim.coeff <= 40) {
				console.log("> 30 &&<= 40 : " + anim.coeff);
			} else if(anim.coeff > 40 && anim.coeff <= 50) {
				console.log("> 40 &&<= 50 : " + anim.coeff);
			} else if(anim.coeff > 50 && anim.coeff <= 60) {
				console.log("> 50 &&<= 60 : " + anim.coeff);
			} else if(anim.coeff > 60 && anim.coeff <= 70) {
				console.log("> 60 &&<= 70 : " + anim.coeff);
			} else if(anim.coeff > 70 && anim.coeff <= 80) {
				console.log("> 70 &&<= 80 : " + anim.coeff);
			} else if(anim.coeff > 80 && anim.coeff <= 90) {
				console.log("> 80 &&<= 90 : " + anim.coeff);
			} else if(anim.coeff > 90 && anim.coeff <= 100) {
				console.log("> 90 &&<= 100 : " + anim.coeff);
			}
*/
			/*$("#homeScreen1").css("opacity", 1 - ((anim.coeff * 2) / 100));*/
			/*
			$.each(anim.elems, function (key, value) {
				var elemAnimCoeff = 0,
					selec = "#" + key;
				
				
				elemAnimCoeff = Math.round(((anim.bottomY - this.startAnim) / this.animDuration) * 100);
				
				// Il faut fixer au elemAnimCoeff
				if (elemAnimCoeff < 100) {
					$(selec).css("opacity", elemAnimCoeff / 100);
					$(selec).css("left", 4000 - elemAnimCoeff * 40);
				} else {
					$(selec).css("opacity", 1);
					$(selec).css("left", 0);
				}
				$(selec).css("top", ((this.startY + (this.endY - this.startY)) - anim.winScroll) + "px");
			});
			*/
		}
	},
	// Handle scroll and resize events
	onScroll = function (e) {
		if(e.type == "resize") {
			layout.resizeText();	
		}
		anim.update();
		if(!anim.isStarted) {
			layout.update();
		}
	};

	init();
});