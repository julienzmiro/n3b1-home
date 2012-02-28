// TODO : minimiser le fouc notamment sur la typo soit en placant un preload, soit en placant les scripts juste apres les css

$(document).ready(function () {
	var isScrolled = false;

	// Resize text + a l'update
	function init () {
		var $square = $("#homeImgSuitedSquare");

		if ($(window).scrollTop() > 0) {
			isScrolled = true;
		}

		$square.detach();
		$("#homeImgSmartSquare, #homeImgHelpfulSquare").remove();
		$square.attr("id", "homeMainSquare");
		$("#homeScreen2").before($square);

		initLayout();
		resizeText();
		resizeBubbles();
	};

	function initLayout () {
		var pos = $("#homeScreen1").height() < $(window).height() ? ($(window).height() - $("#homeScreen1").height()) / 2 : 10,
				posScreen2 = $(window).height() + 20;

		$('#homeScreen1').css({top: pos + "px"});
		$('#animContainer').css({top: posScreen2 + "px"});

		$('#animContainer *').css({opacity: 0});
	};

	function resizeBubbles () {
		console.log("dsdq");
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

	$(window).bind("resize", function (e) {
		if ($(window).scrollTop() > 0) {
			isScrolled = true;
		}
		if (!isScrolled) {
			initLayout();	
		}
		resizeText();
		resizeBubbles();
	});

	init();

});