$(document).ready(function() {
	$(".content .tabs .item").click(function(event) {
		$(this).addClass('active').siblings().removeClass('active');
		var tab_c = $(this).data('c');
		$(this).closest('.content').find('.panels > .panel.c' + tab_c).addClass('active').siblings().removeClass('active');
	});
});