## Fancybox попап
[Документация](http://fancyapps.com/fancybox/3/) | [Репозиторий](https://github.com/fancyapps/fancybox)
```html
<script>$('[data-fancybox="gallery"], [data-fancybox]').fancybox();</script>
<a href="/image_big.jpg" data-fancybox="gallery"><img src="/image_small.jpg" alt=""></a>
```
## Маска для формы
[Репозиторий](https://github.com/digitalBush/jquery.maskedinput)
```html
<script> // Нельзя пропустить место под цифру
$("input[name='PHONE']").mask("+7 (999) 999-9999").on('click', function (e) {
	    var caret = e.target.selectionStart;
	    var text = $(this).val();
	    var lastChar = text.indexOf('_');
	    if (lastChar < caret && lastChar !== -1) {
	        $(this).caret(lastChar);
	    }
	}).on('keydown', function (e) {
	    if (e.keyCode === 39 || e.keyCode === 37) {
	        var caret = e.target.selectionStart;
	        var text = $(this).val();
	        var lastChar = text.indexOf('_');
	        if (lastChar <= caret && lastChar !== -1) {
	            $(this).caret(lastChar - 1);
	        }
	    }
	});
</script>
```
## Slick слайдер
[Документация](https://kenwheeler.github.io/slick/) | [Репозиторий](https://github.com/kenwheeler/slick)
```html
<div class="slick-slider">
	<div></div>
	<div></div>
	<div></div>
</div>

<script>
$('.slick-slider').slick({
    slidesToShow: 4,
    slidesToScroll: 1,
	responsive: [
		{
			breakpoint: 970,
			settings: {
				slidesToShow: 3
			}

		}
    ],

});
</script>
```
## Admin-recover
- WordPress
- Joomla
- MODX Evo, Revo
- Drupal 5,6,7
- OpenCart