// TODO : gerer correctement les positions comme http://jsfiddle.net/UNnZQ/1/
// TODO : Voir pk le scrollTop de l'init ne fonctionne pas sous chrome
// TODO : Au lieu d'appeler anim.update() à chaque scroll, l'appeler avec un rAF : https://tinker.io/cbd9d/1
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

			$('#homeScreen1').animate({
			  top: pos + "px"
			}, 300, function() {
			  $(window).scrollTop(0);
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
		speed: 0,
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
			//anim.coeff = Math.floor((anim.topY / ($(document).height() - $(window).height())) * 100);
			//anim.coeff = Math.floor((anim.bottomY / ($(document).height() - $(window).height())) * 100);
			anim.coeff = Math.floor((anim.topY / $(document).height()) * 100);
			anim.speed = Math.round(Math.min($(document).height() / 100, 100));

			if (anim.topY > 0) {
				anim.isStarted = true;
			} else {
				anim.isStarted = false;
			}
			
			anim.play();
			
		},
		play: function() {
			console.log("play : " + anim.winScroll);
			// Anim #homeScreen1 Y
			if (anim.coeff > 0 && anim.coeff <= 5) {
				console.log("play 0 - 5 : " + anim.winScroll);
				$("#homeScreen1").css("top", - $(window).scrollTop() + (layout.firstScreenMarginTop + anim.speed) + "px");
			}
			// Anim #homeScreen1 Y 2nd part
			// Il ne faut plus se baser sur le scrollTop car il aura avance entre temps...
			// Il faut soustraire du scrollTop la valeur absolue representee par le pourcentage entre 5 et 5 (arret vs reprise)
			// coeff to absolue : (anim.coeff / 100) * $(document).height())
			if (anim.coeff > 10 && anim.coeff <= 15) {
				console.log("play 10 - 15 : " + anim.winScroll);
				$("#homeScreen1").css("top", - ($(window).scrollTop() - ((5 / 100) * $(document).height())) + (layout.firstScreenMarginTop - anim.speed * 2) + "px");
			}
			// Intro phrase (scroll for more) opacity
			// coeff local : (anim.coeff / (coeffMax - coeffMin)) * 100
			// ex : (10 / (15 - 0)) * 100
			$("#homeScreen1PScroll").css("opacity", 1 - (anim.coeff / 15));
		}
	},
	onScroll = function (e) {
		console.log("onScroll : " + anim.winScroll);
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