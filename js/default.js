//load
$(window).load(function(){
	$('#photo-list li').each(function(){
		$(this).css({"position":"absolute","left":"0px","top":"0px"});
	});
	//calling jPreLoader
	$('body').jpreLoader({
		splashID: "#jSplash",
		loaderVPos: '70%',
		autoClose: false,
		closeBtnText: "Enter",
		splashFunction: function() {  
			//passing Splash Screen script to jPreLoader
			$('#jSplash').children('section').not('.selected').hide();
			$('#jSplash').hide().fadeIn(800);
			
			timer = setInterval(function() {
				splashRotator();
			}, 4000);
		}
	}, function() {	//callback function
		clearInterval(timer);
		$('#header').animate({"top":0}, 800, function() {
			$('#wrapper').fadeIn(1000);
		});
	});

	//create splash screen animation
	function splashRotator(){
		var cur = $('#jSplash').children('.selected');
		var next = $(cur).next();
		
		if($(next).length != 0) {
			$(next).addClass('selected');
		} else {
			$('#jSplash').children('section:first-child').addClass('selected');
			next = $('#jSplash').children('section:first-child');
		}
			
		$(cur).removeClass('selected').fadeOut(800, function() {
			$(next).fadeIn(800);
		});
	}
});