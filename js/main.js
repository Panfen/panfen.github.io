
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

function photoList(){
	var $filter = $('#photo-filter');
	var $container = $('#photo-list');
	// Initialize isotope 
	$container.isotope({
		filter: '*',
		layoutMode: 'masonry',
		animationOptions: {
			duration: 750,
			easing: 'linear'
		}
	}); 
	
	// Filter items when filter link is clicked
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
photoList();

// On window load. This waits until images have loaded which is essential
$(window).load(function(){
	
	// Fade in images so there isn't a color "pop" document load and then on window load
	$("#photo-list li img").fadeIn(300);
	
	// clone image
	$('#photo-list li img').each(function(){
		var el = $(this);
		el.css({"position":"absolute","left":"5px","top":"5px"})
			.wrap("<div class='img_wrapper' style='display: inline-block'>")
			.clone()
			.addClass('img_grayscale')
			.css({"position":"absolute","z-index":"998","left":"5px","top":"5px","opacity":"0"})
			.insertBefore(el)
			.queue(function(){
				var el = $(this);
				el.parent().css({"width":this.width,"height":this.height
			});
			el.dequeue();
		});
		this.src = grayscale(this.src);
	});
	
	// Fade image 
	$('#photo-list li img').mouseover(function(){
		$(this).parent().find('img:first').stop().animate({opacity:1}, 300);
	});

	$('.img_grayscale').mouseout(function(){
		$(this).stop().animate({opacity:0}, 300);
	});
});

// Grayscale w canvas method
function grayscale(src){
	var canvas = document.createElement('canvas');
	var ctx = canvas.getContext('2d');
	var imgObj = new Image();
	imgObj.crossOrigin = '';
	imgObj.src = src;
	canvas.width = imgObj.width;
	canvas.height = imgObj.height; 
	ctx.drawImage(imgObj, 0, 0);
	var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
	for(var y = 0; y < imgPixels.height; y++){
		for(var x = 0; x < imgPixels.width; x++){
			var i = (y * 4) * imgPixels.width + x * 4;
			var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
			imgPixels.data[i] = avg; 
			imgPixels.data[i + 1] = avg; 
			imgPixels.data[i + 2] = avg;
		}
	}
	ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
	return canvas.toDataURL();
}		