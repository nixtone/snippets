'use strict';
$(document).ready(function($) {


    // вспомогательная функция переключения класса .active
    // ======================================================
    $.fn.switchClass = function(elClass) {
        if (elClass === undefined) {
            var elClass = 'active';
        }
        var $self = $(this);
        $self.addClass(elClass)
            .siblings().removeClass(elClass);
        return $self;
    };


    // Добавляем все таблицы во враппер для адаптивной работы
    // ======================================================
    $('table').wrap('<div class="table-wrap"></div>');


    // Запрет на "hover" при скроллинге страницы
    // ==========================================
    var body = document.body,
        timer;

    window.addEventListener('scroll', function() {
        clearTimeout(timer);
        if (!body.classList.contains('disable-hover')) {
            body.classList.add('disable-hover')
        }
        timer = setTimeout(function() {
            body.classList.remove('disable-hover')
        }, 100);
    }, false);


    // Функция рассчета максимального и минимального числа в массиве
    // =================================================================
    Array.max          = function(array) {
        return Math.max.apply(Math, array);
    };
    Array.min          = function(array) {
        return Math.min.apply(Math, array);
    };
    var resizeElements = function($elements) {
        if ($elements.length <= 0) {
            return;
        }

        var arHeights = [];
        var selector  = $elements.selector || '.' + $elements[0].className;

        // удаляем предыдущий расчет
        $('.align-the-height[data-selector="' + selector + '"]').remove();

        $elements.each(function(index, el) {
            arHeights.push($(el).height());
        });

        var maxHeight = Array.max(arHeights);

        $('<style class="align-the-height" data-selector="' + selector + '">' + selector + "{ height: " + maxHeight + "px !important; }</style>").appendTo("head");

        return $elements;
    };

    $.fn.alignTheHeight = function() {
        var $elements = $(this);
        if ($elements.length === 0)
            return;

        resizeElements($elements);

        // откладываем загрузку чтобы рассчет был верный
        $(window).on('load', {elements: $elements}, function(event) {
            var $elements = event.data.elements;
            resizeElements($elements);
        });
    };

    // resize выравнивания блоков
    $(window).on('resize', function(event) {
        $('.catalog-section__title').alignTheHeight();
        $('.similar-products__item').alignTheHeight();
        $('.similar-products__title').alignTheHeight();
        $('.our-production-list__title-wrap').alignTheHeight();
        $('.our-production-list__desc').alignTheHeight();
    });

    // Выравнивание блоков
    $('.catalog-section__title').alignTheHeight();
    $('.similar-products__item').alignTheHeight();
    $('.similar-products__title').alignTheHeight();
    $('.our-production-list__title-wrap').alignTheHeight();
    $('.our-production-list__desc').alignTheHeight();


    // Табы выбора типа мебели в футере
    // ================================
    var $sections = $('.tabs__section');
    var $btns     = $('.tabs__tab');
    $btns.on('click', function(event) {
        var $self        = $(this);
        var index        = $self.data('index');
        var $selfSection = $('.tabs__section--' + index);
        var needClose    = $self.hasClass('active');

        $btns.removeClass('active');
        $sections.removeClass('active');

        if (!needClose) {
            $selfSection.addClass('active');
            $self.addClass('active')
        }
    });


    // Телефонная маска
    // ================
    $('.js-phone-mask').mask('+7 (999) 999-9999');


    // Скрытие блока в форме
    // =====================
    $('.form__name--hidden').on('click', function(event) {
        var $self = $(this);
        $self.siblings('.form__label--hidden').slideToggle();
        $self.parents('.form__block').toggleClass('active');
    });


    // кнопка вверх
    // ============
    $('#back-top').hide();
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('#back-top').fadeIn();
            } else {
                $('#back-top').fadeOut();
            }
        });

        $('#back-top a').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });




    /**
     * Плагин, позволяющий адаптировать шрифт в зависимости от количества символов
     * @param {object} [options] - Опции плагина
     * @param [options.maxFontSize] - Максимально возможное значение шрифта
     * @param [options.minFontSize] - Минимально возможное значение шрифта
     * @param [options.maxLineHeight] - Максимальное возможное значение line-height
     * @param [options.minLineHeight] - Минимальное возможное значение line-height
     * @param [options.lengthBorder] - Длинна строки при которой она начинает адаптироваться
     * @param [options.deltaAdaptive] - Коэффициент влияющий на кривую уменьшения шрифта
     * @param [options.deltaLineHeight] - Коэффициент влияющий на кривую увеличения line-height
     * @return {jQuery|HTMLElement}
     */
    $.fn.adaptiveFont = function(options) {

        if (!options) options = {};

        var $adaptiveFont   = $(this),
            maxFontSize     = options.maxFontSize || 50,
            minFontSize     = options.minFontSize || 25,
            minLineHeight   = options.minLineHeight || 110,
            maxLineHeight   = options.maxLineHeight || 200,
            lengthBorder    = options.lengthBorder || 50,
            deltaAdaptive   = options.deltaAdaptive || 7.5,
            deltaLineHeight = options.deltaLineHeight || 0.7,
            initialFont     = parseInt($adaptiveFont.css('font-size')),
            computedLineHeight,
            computedFont;

        $adaptiveFont.each(function() {
            var $this      = $(this),
                lengthText = $this.text().length;
            if (lengthText > lengthBorder) {
                computedFont       = maxFontSize - (lengthText / lengthBorder) * deltaAdaptive;
                computedLineHeight = minLineHeight + (computedFont * deltaLineHeight);

                if (computedFont < minFontSize) {
                    computedFont = minFontSize;
                }

                if (computedLineHeight > maxLineHeight) {
                    computedLineHeight = maxLineHeight;
                }

            } else {
                computedFont       = maxFontSize;
                computedLineHeight = minLineHeight;
            }

            $this.css('font-size', computedFont + 'px');
            $this.css('line-height', computedLineHeight + '%');
        });

        return $adaptiveFont;
    };

});

/**
 * Подрезает строку, превышающую заданное количество символов
 * @param {int} length максимальная длинна строки
 * @param {string} [endString] то что должно подставляться в конец отрезанной строки
 * @param {boolean} [closestSpace] флаг. Если установлен в true, то функция не будет обрезать части слов.
 * @return {jQuery.fn.init|jQuery|HTMLElement}
 */
$.fn.sliceStringByLength = function (length, endString, closestSpace) {
    var $this = $(this);
    var stringAtEnd = endString || '...';
    var findSpace = closestSpace || true;
    $this.each(function () {
        var $this = $(this);
        var text = $this.text();

        if (text.length > length) {
            console.log(text.length);
            var index = findSpace ? text.indexOf(' ', length) : length;
            var slicedPart = text.substring(0, index);
            $this.text(slicedPart + ' ' + stringAtEnd);
        }
    });

    return $this;
};

/**
 * Проверяем разрешение экрана на то что оно меньше заданного размера
 * @param size
 * @param callback
 * @return {boolean}
 */
function maxWidth(size, callback) {
    let result = window.innerWidth < parseInt(size);
    if (callback) {
        if (result) {
            callback();
        }
    }
    return result;
}

/**
 * Проверяем разрешение экрана на то что оно больше заданного размера
 * @param size
 * @param callback
 * @return {boolean}
 */
function minWidth(size, callback) {
    let result = window.innerWidth > parseInt(size);
    if (callback) {
        if (result) {
            callback();
        }
    }
    return result;
}