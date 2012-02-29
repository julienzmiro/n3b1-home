// TODO : minimiser le fouc notamment sur la typo soit en placant un preload, soit en placant les scripts juste apres les css

$(document).ready(function () {
	var isScrolled = false,
		scrollorama,
		initScreenPositions = [];

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

		resizeText();
		resizeBubbles();

		scrollorama = null;
		scrollorama = $.scrollorama({
	        blocks:'.animScreen'
	    });
		initScreenPositions = [
			0,
			parseInt($('#homeScreen3').css("top")) - parseInt($('#homeScreen2').css("top")),
			parseInt($('#homeScreen4').css("top")) - parseInt($('#homeScreen2').css("top")),
			parseInt($('#homeScreen5').css("top")) - parseInt($('#homeScreen2').css("top")),
			parseInt($('#homeScreen6').css("top")) - parseInt($('#homeScreen2').css("top")),
			parseInt($('#homeScreen7').css("top")) - parseInt($('#homeScreen2').css("top"))
		];
		initLayout();

	};

	function initLayout () {
		var pos = $("#homeScreen1").height() < $(window).height() ? ($(window).height() - $("#homeScreen1").height()) / 2 : 10;

		$('#homeScreen1').css({top: pos + "px"});

		$('#homeScreen2').css({top: $(window).height() + "px"});
		$('#homeScreen3').css({top: $(window).height() + initScreenPositions[1] + "px"});
		$('#homeScreen4').css({top: $(window).height() + initScreenPositions[2] + "px"});
		$('#homeScreen5').css({top: $(window).height() + initScreenPositions[3] + "px"});
		$('#homeScreen6').css({top: $(window).height() + initScreenPositions[4] + "px"});
		$('#homeScreen7').css({top: $(window).height() + initScreenPositions[5] + "px"});

		$("#homeMainSquare").css({top: parseInt($('#homeScreen2').css("top")) + 150 + "px"});

		// Anim configuration
		/*console.log($(window).height() + 50);
		scrollorama.animate("#introTxtContainer",{
		    delay: $(window).height() + 50,
		    duration: 300,
		    property: 'opacity',
		    start: 1,
		    end: 1,
		    pin: true
		});*/

		// First image
		// TODO : pour gerer les positions fixed voir si il ne faut pas donner a chaque bloque la hauteur de window
		scrollorama.animate("#homeImgRea1",{
		    delay: 900,
		    duration: 300,
		    baseline: "bottom",
		    property: 'top',
		    end: parseInt($('#homeImgRea1').css("top")) - 250,
		    pin: true
		});
		scrollorama.animate("#homeImgRea1",{
		    delay: 900,
		    duration: 300,
		    baseline: "bottom",
		    property: 'rotate',
		    end: 50
		});
		scrollorama.animate("#homeImgRea1",{
		    delay: 900,
		    duration: 600,
		    baseline: "bottom",
		    property: 'left',
		    end: $(window).width() + 100
		});

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