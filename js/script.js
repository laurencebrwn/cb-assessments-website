var landingScrollChevronPressed = false;
var landingScreenGone = false;
$(function() {
	$('#landingScrollChevron').on('click', function(e) {
		landingScrollChevronPressed = true;
	});
});
$(function() {
	$('.scrollChevron').each(function(){
			$(this).on('click', function(e) {
			e.preventDefault();
			$('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'swing');
		})
	});
});
$(window).on("load",function() {
	function fade(pageLoad) {
		var windowTop=$(window).scrollTop(), windowBottom=windowTop+$(window).innerHeight();
		var min=0, max=1, threshold=0.01;

		$(".section").each(function() {
			/* Check the location of each desired element */
			var objectHeight=$(this).outerHeight(), objectTop=$(this).offset().top, objectBottom=$(this).offset().top+objectHeight;

			/* Fade element in/out based on its visible percentage */
			if (objectTop < windowTop) {
				if (objectBottom > windowTop) {$(this).fadeTo(0,min+((max-min)*((objectBottom-windowTop)/objectHeight)));}
				else if ($(this).css("opacity")>=min+threshold || pageLoad) {$(this).fadeTo(0,min);}
			} else if (objectBottom > windowBottom) {
				if (objectTop < windowBottom) {$(this).fadeTo(0,min+((max-min)*((windowBottom-objectTop)/objectHeight)));}
				else if ($(this).css("opacity")>=min+threshold || pageLoad) {$(this).fadeTo(0,min);}
			} else if ($(this).css("opacity")<=max-threshold || pageLoad) {$(this).fadeTo(0,max);}
		});
	}
  	fade(true); //fade elements on page-load
  	$(window).scroll(function(){fade(false);}); //fade elements on scroll

  	function fadeMenu(pageLoad) {
  		var windowTop=$(window).scrollTop();
  		var objectHeight=$("#landingScreen").outerHeight(), objectTop=$("#landingScreen").offset().top, objectBottom=$("#landingScreen").offset().top+objectHeight;
  		if (landingScreenGone == false){
	  			if ((objectBottom-(objectHeight*0.025)) >= windowTop) {
	  			$("#homeHeader").fadeTo(0,0);
	  		} else {
	  			$("#homeHeader").fadeTo(200,1);
	  			landingScreenGone = true;
	  			if (landingScrollChevronPressed == true){
	  				setTimeout(() => {  $("#landingScreen").hide(); $("#landingScreen").addClass("hide"); }, 500);
	  			} else {
		  			$("#landingScreen").hide();
		  			$("#landingScreen").addClass("hide");
		  		}
	  		}
	  	}
  	}
	fadeMenu(true); //fade elements on page-load
  	$(window).scroll(function(){fadeMenu(false);}); //fade elements on scroll
  });