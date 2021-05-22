window.addEventListener("load", function () {

    /**
     * Проходит по элементам массива и ищет элементы с соответствующим id
     * @param array
     * @param id
     */
    const getItemById = function(array, id) {
        if (array.filter) {
            return array.filter(item => `${item.ID}` === `${id}`)[0]
        } else {
            return null;
        }
    };

    $.fn.replaceClass = function(pFromClass, pToClass) {
        return this.removeClass(pFromClass).addClass(pToClass);
    };

    $.fn.customSelect = function(data, inputName, opt) {
        var $this = $(this);

        var params = opt || {};

        params.multiple     = params.multiple || $this.data('multiple') || false;
        params.initial      = params.initial || $this.data('initial') || 'Нажмите, чтобы выбрать';
        params.initialValue = params.initialValue || $this.data('initial-value') || null;
        params.required     = params.required || $this.data('required') || false;

        /* Создание скрытого поля */
        var input  = document.createElement('input');
        input.type = 'hidden';
        input.name = inputName;
        if (params.required) {
            input.setAttribute('required', 'required');
        }
        $this.append(input);

        /* Элемент с выбранным значением */
        var itemsSelected = document.createElement('div');
        itemsSelected.classList.add('custom-select__selected');
        $this.append(itemsSelected);
        var $itemSelectedElement = $this.find('.custom-select__selected');

        /* Скрытый элемент с вариантами */
        var itemsBody = document.createElement('div');
        itemsBody.classList.add('custom-select__body');
        $this.append(itemsBody);
        var $itemList  = $this.find('.custom-select__body');
        var $container = $itemList.parent();

        data.forEach(function(item) {
            $itemList.append('<div data-id="' + item.ID + '" class="custom-select__option">' + item.NAME + '</div>');
        });
        var options              = $itemList.find('.custom-select__option');
        var arrSelectedItems     = [];
        var arrSelectedItemsName = [];

        $itemSelectedElement.text(params.initial);

        /* Установка начального значения */
        if (params.initialValue) {
            var initialItem = getItemById(data, 1);
            if (initialItem) {
                $itemSelectedElement.text(initialItem.NAME);
                $this.find('[data-id=' + initialItem.ID + ']')
                    .addClass('selected')
            }
        }

        if (params.multiple) {
            /* При клике добавляем или убираем выбранный квест из массива */
            options.on('click', function(e) {
                e.stopPropagation();
                var $this = $(this);
                $this.trigger('selected');

                var thisId   = $this.data('id');
                var thisText = $this.text();

                if (!$this.hasClass('selected')) {
                    arrSelectedItems.push(thisId);
                    arrSelectedItemsName.push(thisText);
                } else {
                    var indexOfValue = arrSelectedItems.indexOf(thisId);
                    if (indexOfValue !== -1) {
                        arrSelectedItems.splice(indexOfValue, 1);
                        arrSelectedItemsName.splice(indexOfValue, 1);
                    }
                }
                $this.toggleClass('selected');

                input.value = arrSelectedItems.join(';');

                var countSelected = arrSelectedItems.length;

                $itemSelectedElement.text(arrSelectedItemsName.join(', '));

                $container.addClass('selected');

                if (!countSelected) {
                    $itemSelectedElement.text(params.initial);
                    $container.removeClass('selected');
                }
            });
        } else {
            options.on('click', function(e) {
                e.stopPropagation();
                var $this = $(this);
                $this.trigger('selected');

                var thisId   = $this.data('id');
                var thisText = $this.text();
                $itemSelectedElement.text(thisText);
                input.value = thisId;
                $itemList.removeClass('active');
                $container.removeClass('active')
                    .addClass('selected');
                $this.siblings('.selected').removeClass('selected');
                $this.addClass('selected');
            })
        }

        $itemSelectedElement.on('click', function(e) {
            e.stopPropagation();
            $container.toggleClass('active');
            $itemList.toggleClass('active');
            if (!$itemList.hasClass('active')) {
                $this.trigger('close');
            } else {
                $this.trigger('open');
            }
        });
        $this.parents('form, body').click(function() {
            $container.removeClass('active');
            $itemList.removeClass('active');
        })
    };

    let data = [
        {ID: 1, NAME: 'Седан'},
        {ID: 2, NAME: 'Хэтчбек'},
        {ID: 2, NAME: 'Универсал'},
        {ID: 2, NAME: 'Лифтбэк'},
        {ID: 2, NAME: 'Купе'},
        {ID: 2, NAME: 'Микроавтобус'},
        {ID: 2, NAME: 'Пикап'}

    ];

    $('.js-year-mask').mask('9999').on('blur', function () {
        var $this = $(this);
        var value = $this.val();
        console.log(value);
        var nowDate = new Date(Date.now()).getFullYear();
        if (+value > +nowDate) {
            $this.val(nowDate);
        }
    });
    
    $('.custom-select').customSelect(data, 'corpus', {initial: 'Тип кузова', required: true});


    $('.js-fake-require').on('focus', function() {
        $(this).addClass('valued');
    }).on('blur', function() {
        if ($(this).val()) return;
        $(this).removeClass('valued');
    });

    let formTradeIn = $('#form-trade-in');

    formTradeIn.on('submit', function(e) {
        e.preventDefault();

        var fields = {
            MODEL:  $('#model').val(),
            AMOUNT: $('#amount').val(),
            YEAR:   $('#year').val(),
            CORPUS: $('.custom-select__selected').text(),
            ENGINE: $('#engine').val(),
            COST:   $('#cost').val(),
            NAME:   $('#userName').val(),
            PHONE:  $('#phone').val(),
            INFO:   $('#info').val()

        };
        console.log(fields);
        $.ajax({
            type:     'POST',
            dataType: 'json',
            url:      '/api/send/traidinvote/',
            data:     fields
        }).done(function(data) {
            if (data.send === 'ok') {
                formTradeIn.replaceClass('form', 'success');
            } else {
                alert(data.errors);
            }
        }).fail(function(data) {
            console.log(data);
            alert('Не отправлено');
        });
    });

});
