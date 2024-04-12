(function() {
	jQuery.extend( jQuery.easing,{
		easeOutQuart: function (x, t, b, c, d) {
			return -c * ((t=t/d-1)*t*t*t - 1) + b;
		}
	});

	var slide = function(tclass){

		var box = $(tclass),
			rollEle = box.children('ul'),
			list = rollEle.children('li'),
			length = list.length,
			leftButton = box.find('.prev'),
			rightButton = box.find('.next');

			if(box.length < 1) return;

		var curIndex = 1,
			speed = 800,
			auto = 4000,
			autoTime = null,
			move = list.eq(curIndex).outerWidth(true);

		var start = function(){
			autoTime = setInterval(function(){
				toNext();
			},auto);
		}

		var toNext = function(){
			rollEle.stop(true,true).animate({marginLeft : -move*2},speed,'easeOutQuart',function(){
				rollEle.children('li').eq(0).appendTo($(this));
				$(this).css({marginLeft : -move});	
			});
		}

		var toPrev = function(){
			var last = rollEle.children().last();
			last.prependTo(rollEle);
			rollEle.css({marginLeft:-move*2});
			rollEle.stop(true,true).animate({marginLeft:-move},speed,'easeOutQuart');
		}

		var t = null;

		box.hover(function(){
			clearInterval(t);
			clearInterval(autoTime);
		},function(){
			t = setTimeout(function(){
				start();
			},auto);
		});
	
		leftButton.click(function(){
			toPrev();
		});

		rightButton.click(function(){
			toNext();
		});

		start();	

	}

	$(function(){
		slide('.joinscrolllist');
	});

})();