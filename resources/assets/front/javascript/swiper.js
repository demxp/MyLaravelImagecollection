;(function($) {
	var scrollSlider = function () {
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            direction: 'vertical',
            slidesPerView: 1,
            paginationClickable: true,
            spaceBetween: 30,
            mousewheelControl: true
        });
    };

	$(function() { 
        scrollSlider();
	});
	
})(jQuery);