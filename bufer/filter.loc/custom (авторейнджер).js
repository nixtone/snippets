$(document).ready(function() {
	
	$("img").lazyload();
	
	// Расчет высоты футера
	var height = parseInt($("footer").outerHeight(true))+"px";
	$("#wrapper").css('margin-bottom', '-'+height);
	$("#footer-push").height(height);

	// Вспомогатель флоата
	$(".fll, .flr, .left, .right").parent().addClass('clear');

	// Просмотр картинок
	$(".fancy").fancybox();

	// Скидка 40
	$("#skidka40").click(function(event) {
		$(this).remove();
	});
	
	//
	$(".hamburger").click(function(event){
		$("nav").toggle();
	});
	
	// Поиск подстроки в строке
	function strstr( haystack, needle, bool ) {
		var pos = 0;
		pos = haystack.indexOf( needle );
		if( pos == -1 ){
			return false;
		} else{
			if( bool ){
				return haystack.substr( 0, pos );
			} else{
				return haystack.slice( pos );
			}
		}
	}
	function matchTip(cifra, line) {
		var rg = new RegExp(","+cifra+",");
		var resRE = rg.test(line);
		var resM = false;
		resM = (cifra==line) ? true : false;
		if(resRE || resM) return true;
	}
	
	// Фильтр автомобилей
	function avtoFilter(selector, activSibFiltr, d1, d2) { // "селектор типа", "активный соседний фильтр", "тип данных свой", "тип данных соседа"
		$(selector).click(function(event) {
			if($(activSibFiltr).data(d2)) var hasD2 = $(activSibFiltr).data(d2); // Соседний выбранный фильтр
			if($(this).hasClass('active')) {
				// снимаем выборку
				$(this).removeClass('active');
				if(hasD2) {
					$("#katalog .item").each(function(index, el) {
						// if($(this).data(d2) == hasD2) $(this).show();
						if(strstr(""+$(this).data(d2)+"", ""+hasD2+"") && matchTip(hasD2, $(this).data(d2))) $(this).show();
					});
				}
				else {
					$("#katalog .item").show();
				}
			}
			else {
				// Назначаем выборку
				var d = $(this).data(d1);
				$(this).addClass('active').siblings().removeClass('active');
				$("#katalog .item").hide().each(function(index, el) {
					if(hasD2) {
						// if($(this).data(d1)==d && $(this).data(d2)==hasD2) $(this).show();
						if((strstr(""+$(this).data(d1)+"", ""+d+"") && matchTip(d, $(this).data(d1))) && (strstr(""+$(this).data(d2)+"", ""+hasD2+"") && matchTip(hasD2, $(this).data(d2)))) $(this).show();
					}
					else {
						// if($(this).data(d1)==d) $(this).show();
						if(strstr(""+$(this).data(d1)+"", ""+d+"") && matchTip(d, $(this).data(d1))) $(this).show();
					}
				});
			}
		});
	}
	avtoFilter("#vibor_avto .kat_area .item", "#vibor_avto .korobka-peredach_area .item.active", "tip", "kp"); // Для выбора по типу авто
	avtoFilter("#vibor_avto .korobka-peredach_area .item", "#vibor_avto .kat_area .item.active", "kp", "tip"); // Для выбора по типу коробки передач

	// Закрытие машины в ленте
	$("#katalog .close.inlist").click(function(event) {
		$(this).parent(".item").fadeOut(300);
	});

	// Открытие машины попапа
	$(".avto_pp").click(function(event) {
		if($(document).width() <= 620) $("body").addClass("oh");
		$(".popup.avto .avtoarea").empty();
		$(".popup.avto .avtoarea").append($(this).closest(".item").find(".forPopup").html());
		$(".overlay").fadeIn(300);//.css('min-height', $(".popup.avto").height());
	});
	// Закрытие машины попапа
	$(".overlay .close.popup").click(function(event) {
		$(this).closest(".overlay").fadeOut(300);
		$("body").removeClass("oh");
	});
	
	$(document).on('click','.botarray.close.popup',function() {
		$(this).parent().closest(".overlay").fadeOut(300);
		$("body").removeClass("oh");
	});
	
	// Отправка заявки на авто
	$("body").on('submit', '.zayavka_na_avto', function(event) {
		event.preventDefault();
		$.post('/', $(this).serialize(), function(data) {
			if(data['code']) {
				alert(data['msg']);
				$(".overlay").fadeOut(300);
			}
			else {
				alert(data['msg']);
			}
		}, "json");
	});
	
	
	
	/* --- Слайдер --- */
	//Обработка клика на стрелку вправо
	$(document).on('click', ".carousel-button-right",function(){ 
		var carusel = $(this).parents('.carousel');
		right_carusel(carusel);
		return false;
	});
	//Обработка клика на стрелку влево
	$(document).on('click',".carousel-button-left",function(){ 
		var carusel = $(this).parents('.carousel');
		left_carusel(carusel);
		return false;
	});
	function left_carusel(carusel){
	   var block_width = $(carusel).find('.carousel-block').outerWidth();
	   $(carusel).find(".carousel-items .carousel-block").eq(-1).clone().prependTo($(carusel).find(".carousel-items")); 
	   $(carusel).find(".carousel-items").css({"left":"-"+block_width+"px"});
	   $(carusel).find(".carousel-items .carousel-block").eq(-1).remove();    
	   $(carusel).find(".carousel-items").animate({left: "0px"}, 300); 
	   
	}
	function right_carusel(carusel){
	   var block_width = $(carusel).find('.carousel-block').outerWidth();
	   $(carusel).find(".carousel-items").animate({left: "-"+ block_width +"px"}, 300, function(){
		  $(carusel).find(".carousel-items .carousel-block").eq(0).clone().appendTo($(carusel).find(".carousel-items")); 
		  $(carusel).find(".carousel-items .carousel-block").eq(0).remove(); 
		  $(carusel).find(".carousel-items").css({"left":"0px"}); 
	   }); 
	}
	$(function() {
	//Раскомментируйте строку ниже, чтобы включить автоматическую прокрутку карусели
		auto_right('.carousel:first');
	})
	// Автоматическая прокрутка
	function auto_right(carusel){
		setInterval(function(){
			if (!$(carusel).is('.hover'))
				right_carusel(carusel);
		}, 3000)
	}
	// Навели курсор на карусель
	$(document).on('mouseenter', '.carousel', function(){$(this).addClass('hover')})
	//Убрали курсор с карусели
	$(document).on('mouseleave', '.carousel', function(){$(this).removeClass('hover')})
	
	/* --- Конец слайдера --- */
	
});