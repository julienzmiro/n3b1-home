// TODO : gerer correctement les positions comme http://jsfiddle.net/UNnZQ/1/
// TODO : Voir pk le scrollTop de l'init ne fonctionne pas
$(document).ready(function () {
	
	var init = function () {
		$(window).scrollTop(0);
		layout.initStatic();
		if(layout.isDynamic) {
			layout.initDynamic();
		}
		$(window).scroll(onScroll);
		$(window).resize(onScroll);
	},
	layout = {
		canvasH: 0,
		canvasW: 0,
		firstScreenMarginTop: 0,
		isDynamic: function () {
			// TODO : check screen size
			return true;
		},
		initStatic: function () {
			layout.resizeText();
		},
		initDynamic: function () {
			layout.canvasH = $("#content").height();
			layout.canvasW = $("#content").width();
			$("#canvasScroller").height(layout.canvasH);
			$(".animScreen").each(function (i) {
				$(this).css("position", "fixed");
				$(this).css("width", layout.canvasW);
				$(this).css("display", "none");
			});
			$("#content").css("height", layout.canvasH);
			layout.posFirstScreen();
		},
		update: function () {
			$(".animScreen").each(function (i) {
				$(this).css("position", "static");
			});
			layout.canvasH = $("#content").height();
			layout.canvasW = $("#content").width();
			$("#canvasScroller").height(layout.canvasH);
			$(".animScreen").each(function (i) {
				$(this).css("position", "fixed");
				$(this).css("width", layout.canvasW);
			});
			$("#content").css("height", layout.canvasH);
			layout.posFirstScreen();
		},
		posFirstScreen: function () {
			var pos = $("#homeScreen1").height() < $(window).height() ? ($(window).height() - $("#homeScreen1").height()) / 2 : 10;

			/*$("#homeScreen1").css("top", pos + "px");*/
			$('#homeScreen1').animate({
			  top: pos + "px"
			}, 300, function() {
			  // Animation complete.
			});
			
			$("#homeScreen1").css("display", "block");
			layout.firstScreenMarginTop = ($(window).height() - $("#homeScreen1").height()) / 2;
		},
		resizeText: function () {
			// TODO : do the same for all texts
			var containerW = $("#content").width(),
				mainRatio = 9.5,
				subRation = 7.5;
			$("#homeTitle1").css("font-size", Math.floor(containerW / mainRatio) + "px");
			$("#homeTitle1 .grey").css("font-size", Math.floor(containerW / subRation) + "px");
			$("#homeTitle1").css("line-height", Math.floor(containerW / mainRatio) + "px");
		}
	},
	anim = {
		coeff: 0,
		isStarted: false,
		topY: 0,
		bottomY: 0,
		winScroll: 0,
		lastWinScroll: 0,
		isScrollingDown: function() {
			if (anim.winScroll > anim.lastWinScroll) {
				return true;
			} else {
				return false;
			}
		},
		update: function () {
			anim.lastWinScroll = anim.winScroll;
			anim.winScroll = anim.topY = $(window).scrollTop();
			anim.bottomY = anim.winScroll + $(window).height();
			anim.coeff = Math.floor((anim.topY / ($(document).height() - $(window).height())) * 100);

			if (anim.topY > 0) {
				anim.isStarted = true;
			} else {
				anim.isStarted = false;
			}
			
			anim.play();
			
		},
		play: function() {
			if(anim.coeff > 0 && anim.coeff <= 20) {
				// TODO : replacer l'anim en position de depart #homeScreen1 au centre quand on revient au debut (animate ?)

				/*if(anim.isScrollingDown()) {
					$("#homeScreen1").css({top: "-=20px"});
				} else {
					$("#homeScreen1").css({top: "+=20px"});
				}*/

				$("#homeScreen1").css("top", - $(window).scrollTop() + layout.firstScreenMarginTop + "px");

				//$("#homeScreen1").css("top", - $(window).scrollTop() + ($("#homeScreen1").offset().top) + "px");
				//$("#homeScreen1").css({top: "-=" + $(window).scrollTop() + "px"});
				
			}
		}
	},
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