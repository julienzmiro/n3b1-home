// TODO : minimiser le fouc notamment sur la typo soit en placant un preload, soit en placant les scripts juste apres les css
// TODO : alternative d'anim : mettre juste le square en position fixed et animer les differents elements quand le square les rencontre (ex : quand les rougaes sont au dessus du square ils tournent)
// TODO : Utiliser un pourcentage de scroll comme sur les autres fichiers. Puis, fixer un range d'anim et la propriete en fonction du pourcentage dans ce range.
// Si l'anim fixed du txt d'intro est trop compliquee : Essayer avec juste l'opacite

// TODO : Soit nouvelle anim :
/*
New anim :
First screen -> Fade 0
Second screen up
First image out
First text 3D out
Second text 3D in
Second image in
Second image out
Second text 3D out
Third text 3D in
Third image in
Last screen fade -> 0
About screen first title fade in
Age fade in
...
*/
// TODO : soit on garde l'anim mais on laisse tous les screens en fixed top 0, et on joue plutot sur l'opacite voir des effets de margin-top pour simuler le scroll
$(document).ready(function () {
	var isScrolled = false,
		didScroll = false,
		scrolledValue = 0,
		scrolledPercent = 0,
		lastScrolledValue = 0,
		scrollingDown = false,
		browserPrefix = "";

	// shim layer with setTimeout fallback
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function( callback ){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

	// Resize text + a l'update
	function init () {
		var $square = $("#homeImgSuitedSquare");

		if ($.browser.mozilla)	browserPrefix = "-moz-";
		if ($.browser.webkit)	browserPrefix = "-webkit-";
		if ($.browser.opera)	browserPrefix = "-o-";
		if ($.browser.msie)		browserPrefix = "-ms-";

		$(window).bind("resize", function (e) {
			if ($(window).scrollTop() > 0) {
				isScrolled = true;
			}
			if (!isScrolled) {
				// TODO : Faire une fonction updateLayout pour mettre a jour le first screen si topScroll = 0
				//updateLayout();	
			}
			resizeText();
			resizeBubbles();
		});

		$(window).bind("scroll", function (e) {
			scrollHandler();
		});

		if ($(window).scrollTop() > 0) {
			isScrolled = true;
		}

		$square.detach();
		$("#homeImgSmartSquare, #homeImgHelpfulSquare").remove();
		$square.attr("id", "homeMainSquare");
		$("#homeScreen2").before($square);

		resizeText();
		resizeBubbles();
		initLayout();

		scrollHandler();

		(function animloop(){
	      	requestAnimFrame(animloop);
	      	if(didScroll){
				animate();
				didScroll = false;
			}
	    })();

	};

	function initLayout () {
		//var pos = $("#homeScreen1").height() < $(window).height() ? ($(window).height() - $("#homeScreen1").height()) / 2 : 10;

		// TODO : Voir si il ne serait pas plus simple de gerer les pin avec des positions fixed pour tous les animScreen (cf dessous)
		// + scrollWrapper + positions a la place des height + dans scrollHandler $("#homeScreen1").css("top", "+=10 - " + scrollTop + "px")
		$("#content").prepend('<div id="scrollWrapper"></div>');
		$("#scrollWrapper").css("height", $(window).height() * 7);
		$(".animScreen").css({position: "fixed"});
		$(".animScreen").not("#homeScreen1").css({opacity: 0});
		$("#homeScreen2").css("margin-top", $(window).height() + "px");
		$(".animScreen").each(function (i, elem) {
			$(this).css("top", ($(window).height() / 2 - $(this).height() / 2) + "px");
		});
		$("#homeMainSquare").css({top: $('#homeScreen2').offset().top + 150 + "px", opacity: 0});
		

		/*$(".animScreen").css({height: $(window).height(), marginBottom: 0});
		$("#homeScreen1").css("padding-top", ($(window).height() / 2) - 250 + "px");
		$("#homeMainSquare").css({top: $('#homeScreen2').offset().top + 150 + "px"});*/

		//$(".animScreen").css({position: "absolute"});

		/*$('#homeScreen1').css({top: pos + "px"});

		$('#homeScreen2').css({top: $(window).height() + "px"});
		$('#homeScreen3').css({top: $(window).height() + initScreenPositions[1] + "px"});
		$('#homeScreen4').css({top: $(window).height() + initScreenPositions[2] + "px"});
		$('#homeScreen5').css({top: $(window).height() + initScreenPositions[3] + "px"});
		$('#homeScreen6').css({top: $(window).height() + initScreenPositions[4] + "px"});
		$('#homeScreen7').css({top: $(window).height() + initScreenPositions[5] + "px"});

		$("#homeMainSquare").css({top: parseInt($('#homeScreen2').css("top")) + 150 + "px"});*/

	};

	function scrollHandler () {
		lastScrolledValue = scrolledValue;
		scrolledValue = $(window).scrollTop();
		scrolledPercent = Math.floor((scrolledValue / $(document).height()) * 100);

		if (lastScrolledValue > scrolledValue) {
			scrollingDown = false;
		} else {
			scrollingDown = true;
		}
		if (scrolledValue > 0) {
			isScrolled = true;
		}
		didScroll = true;
	};

	function animate () {
		/*******************
		homeScreen1
		*******************/
		/*
		// If no scroll => back to init position
		if (scrolledValue == 0) {
			$("#homeScreen1").animate({
				top: $(window).height() / 2 - $("#homeScreen1").height() / 2 + "px"
			}, 100);
		// Frist segment before fixed state
		} else if (scrolledValue > 0 && scrolledValue < 81) {
			if (scrollingDown) {
				$("#homeScreen1").css("top", "-=" + scrolledValue + "px");
			} else {
				$("#homeScreen1").css("top", "+=" + scrolledValue + "px");
			}
		// Fixed state
		} else if (scrolledValue > 80 && scrolledValue < 601) {
			$("#homeScreen1").css("top", ($(window).height() / 2 - $("#homeScreen1").height() / 2) - 80 + "px");
		// After fixed state
		} else {
			if (scrollingDown) {
				$("#homeScreen1").css("top", "-=" + (scrolledValue - 519) + "px");	
			} else {
				$("#homeScreen1").css("top", "+=" + (scrolledValue - 519) + "px");
			}
		}
		*/

		/*******************
		homeScreen1
		*******************/
		$("#homeScreen1").css("opacity", 1 - (scrolledPercent / 5));
		/*******************
		homeScreen2
		*******************/
		$("#homeScreen2").css("opacity", 0 + (scrolledPercent / 5));
		// max marginTop : $(window).height() min marginTop : 0
		$("#homeScreen2").css("margin-top", 0 + Math.floor((((100 - Math.min((scrolledPercent * 6), 100)) / 100) * $(window).height())) + "px");
		/*******************
		homeImgRea1
		*******************/
		// 0 a 55
		// TODO : trouver comment faire demarrer ce changement a un certain pourcentage
		$("#homeImgRea1").css(browserPrefix + "transform", "rotate(" + Math.floor(0 + (getLocalPercent(15, 25) / 100) * 55) + "deg)");
		// 0 + (scrolledPercent / 100) * 55
		// Faire un percentLocal entre la valeur de depart (soit en absolu soit en %) et la valeur de fin d'anim
	};

	function getLocalPercent (startAtPercent, endAtPercent) {
		var min = 0,
				max = 0,
				result = 0;

				min = ($(document).height() / 100) * startAtPercent;
				max = ($(document).height() / 100) * endAtPercent;

				result = ((scrolledValue - min) / (max - min)) * 100;
				if (result <= 0) {
					result = 0;
				} else if (result >= 100) {
					result = 100;
				}

		return result;
	};

	function resizeBubbles () {
		var containerW = $("#content").width(),
				mainRatio = 10;

				$("#homeHobImgVideoGames").css("width", Math.floor(containerW / (mainRatio / 1.2)) + "px");
				$("#homeHobImgVideoGames").css("height", $("#homeHobImgVideoGames").css("width"));

				$("#homeHobImgTennis").css("width", Math.floor(containerW / (mainRatio / 1.5)) + "px");
				$("#homeHobImgTennis").css("height", $("#homeHobImgTennis").css("width"));

				$("#homeHobImgDraw").css("width", Math.floor(containerW / (mainRatio / 1.7)) + "px");
				$("#homeHobImgDraw").css("height", $("#homeHobImgDraw").css("width"));

				$("#homeHobImgDev").css("width", Math.floor(containerW / (mainRatio / 1.95)) + "px");
				$("#homeHobImgDev").css("height", $("#homeHobImgDev").css("width"));

	};

	function resizeText () {
		var containerW = $("#content").width(),
				// Main title
				mainRatio = 9.5,
				subRation = 7.5,
				// Screen title
				stMainRatio = 7.2,
				stSubRatio = 16,
				// Age main
				ageMainRatio = 5.9,
				// Age right
				ageRightRatio = 25,
				// Age bottom
				ageBottomRatio = 39;
		
		// Main title
		$("#homeTitle1").css("font-size", Math.floor(containerW / mainRatio) + "px");
		$("#homeTitle1 .grey").css("font-size", Math.floor(containerW / subRation) + "px");
		$("#homeTitle1").css("line-height", Math.floor(containerW / mainRatio) + "px");

		// First screen title
		$(".screenTitle").css("font-size", Math.floor(containerW / stMainRatio) + "px");
		$(".screenTitle .grey").css("font-size", Math.floor(containerW / stSubRatio) + "px");
		$(".screenTitle").css("line-height", Math.floor(containerW / stMainRatio) + "px");

		// Age main
		$("#homeAgeYearsNum").css("font-size", Math.floor(containerW / ageMainRatio) + "px");
		$("#homeAgeYearsNum").css("top", Math.floor(containerW / (ageMainRatio * 2)) + "px");
		// Age right
		$("#homeAgeRight").css("font-size", Math.floor(containerW / ageRightRatio) + "px");
		$("#homeAgeRight").css("line-height", Math.floor(containerW / (ageRightRatio / 1.1)) + "px");
		$("#homeAgeRight").css("top", Math.floor(containerW / ageRightRatio) + "px");
		// Age bottom
		$("#homeAgeBottom").css("font-size", Math.floor(containerW / ageBottomRatio) + "px");
		$("#homeAgeBottom").css("top", Math.floor(containerW / (ageBottomRatio / 7)) + "px");

	}
	
	init();

});