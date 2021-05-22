// Округление цены
parseFloat(total).toFixed(2);

// Разница дат
d = new Date(); 
p = new Date(d.getTime() + -7*86400000);
monthA = '01,02,03,04,05,06,07,08,09,10,11,12'.split(',');
document.write(p.getDate() + '.' + monthA[p.getMonth()] + '.' + d.getFullYear());

// Спойлер --v.3
$(".spoiler").each(function(i, el) {
	var spoiler_in = $(this).data("in")?$(this).data("in"):'Подробнее';
	var spoiler_out = $(this).data("out")?$(this).data("out"):'Скрыть';
	var spoiler_more = '<a href="javascript:void(0)" class="spoiler_more">'+spoiler_in+'</a>';
	$(this).wrapInner('<div class="spoiler_inner c'+i+'" style="display:none;"></div>'); // при наличии стиля, атрибут "style" удалить
	$(this).data("open") ? $(this).prepend(spoiler_more) : $(this).append(spoiler_more) ;
	$(this).find(".spoiler_more").click(function(event) {
		$(this).parent(".spoiler").find(".spoiler_inner.c"+i).is(":hidden") ? $(this).text(spoiler_out) : $(this).text(spoiler_in) ;
		$(this).parent(".spoiler").find(".spoiler_inner.c"+i).toggle();
	});
});


// Плавная прокрутка по якорю --v.1
$('nav a').on('click', function(event) {
	$('html,body').stop().animate({ scrollTop: $($(this).attr('href')).offset().top }, 1000);
	event.preventDefault();
});


// Общий сниппет адаптивности --v.1
var comSnipAdapt1 = 960;
var comSnipAdapt2 = comSnipAdapt1++;
function comSnipAdapt_ifBig() {
	// console.log("big");
}
function comSnipAdapt_ifSmall() {
	// console.log("small");
}
if ($(window).width() <= comSnipAdapt2) {
	comSnipAdapt_ifSmall();
}
$(window).resize(function (event) {
	if ($(window).width() <= comSnipAdapt2) {
		comSnipAdapt_ifSmall();
	}
});
if ($(window).width() >= comSnipAdapt1) {
	comSnipAdapt_ifBig();
}
$(window).resize(function (event) {
	if ($(window).width() >= comSnipAdapt1) {
		comSnipAdapt_ifBig();
	}
});

// Такой запрос прикрепляет файлы к аякс запросу
$.ajax({
	url: '/zajavki/',
	type: 'POST',
	data: new FormData(this),
	dataType: 'json',
	processData: false,
	contentType: false
}).always(function(data) {
	if(data['code']==1) {
		alert(data['msg']);
		jQuery('#overlay').removeClass('show');
		jQuery('body').removeClass('nos');
	}
	else if(data['code']==2) {
		alert(data['msg']);
	}
});


// Вспомогатель флоата 
$(".fll, .flr, .left, .right").parent().addClass('clear');
/*
.fll {
	float: left;
}
.flr {
	float: right;
}
.left {
	box-sizing: border-box;
	float: left;
	width: 50%;
}
.right {
	box-sizing: border-box;
	float: right;
	width: 50%;
}
*/

// Подгонка высоты элементов
function hefoal(target) {
	var h = $(target).outerHeight(true);
	$(target).each(function() {
		if($(this).height() > h) h = $(this).outerHeight(true);
	});
	$(target).css('height', h);
}
hefoal("#resultatov .box");