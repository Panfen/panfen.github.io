
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
});