
/*
 * Top Menu Control
 */
function topMenuCtrl(){
	var oldId = 'home';
	$('ul.top-menu li').click(function(){
		// progress
		var index = $(this).index();
		$(this).addClass('selected').siblings().removeClass('selected');
		var width = $('.myprogress').width() / 3 * index + 'px';
		$('.myprogress .progress-bar').width(width);

		//content
		var newId = $(this).attr('data-id');
		$('.' + oldId).slideUp(500, function(){
			$(this).removeClass('active')
			$('.' + newId).addClass('active').slideDown(500,function(){
				oldId = newId;
			});
		});
	});
}

/*
 * Carousel Button Control
 */
function carouselBtnCtrl(){
	$('.carousel-inner').mouseenter(function(){
		$('.carousel-control.left i').stop().animate({
			left: '20px',
			opacity: 1
		},500);
		$('.carousel-control.right i').stop().animate({
			right: '20px',
			opacity: 1
		},500);
	});

	$('.carousel-inner').mouseout(function(){
		$('.carousel-control.left i').stop().animate({
			left: '-50px',
			opacity: 0
		},500);
		$('.carousel-control.right i').stop().animate({
			right: '-50px',
			opacity: 0
		},500);
	});
	$('.carousel-control').mouseenter(function(){
		$('.carousel-control.left i').stop().animate({
			left: '20px',
			opacity: 1
		},500);
		$('.carousel-control.right i').stop().animate({
			right: '20px',
			opacity: 1
		},500);
	});
}

/*
 * Photo List Control
 */
function photoListCtrl(){
	var $filter = $('#photo-filter');
	var $container = $('#photo-list');
	$container.isotope({
		filter: '*',
		layoutMode: 'masonry',
		animationOptions: {
			duration: 750,
			easing: 'linear'
		}
	});
	$filter.find('li').click(function() {
		var selector = $(this).attr('data-filter');
		$filter.find('li').removeClass('selected');
		$(this).addClass('selected');
		$container.isotope({
			filter: selector,
			animationOptions: {
				animationDuration: 750,
				easing: 'linear',
				queue: false,
			}
		});
		return false;
	});
}

$(function(){
	// control
	topMenuCtrl();
	carouselBtnCtrl();
	photoListCtrl();

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
			closeBtnText: "Enter!",
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
});