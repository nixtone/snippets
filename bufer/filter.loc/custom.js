$(document).ready(function() {

	// Фильтр
	$(".filter_fields .field.checkbox").click(function(event) {
		var checkboxNames = [];
		$(".filter_fields .field.checkbox").each(function(index, el) {
			if($(this).prop('checked') == true) {
				// $(this).attr('name')
				// $(this).val()
				// checkboxNames[$(this).attr('name')].push($(this).val()); // логика такая, но синтаксис не верен
			}
		});
		$("li.product").hide().each(function(index, el) {
			if(checkboxNames.length == 0) {
				$(this).show();
			}
			else {
				var propMatch = [];
				checkboxNames.forEach((val, prop) => {
					if($(this).data(prop) == val) {
						propMatch[prop] = true; //
						return false;
					}
					else {
						propMatch[prop] = false; //
					}
				});
				propMatch.forEach((logic, i) => {
					if(logic == false) {
						$(this).hide();
						return false;
					}
					else {
						$(this).show();
					}
				});
			}
		});
	});
		





//console.log(Array.from(new Set((checkboxNames)))); // уникальные значения
/*
		$(".item").hide().each(function(index, el) {
			// if($(".filter_fields .field.checkbox").prop('checked', true).length == 0) {
			// 	$(this).show();
			// }
			// else {
				var $this = $(this);
				$(".filter_fields .field.checkbox").each(function(index, el) {
					// console.log($(this).prop('checked'));
					if($(this).prop('checked') == true) {
						i++;
						if($this.data($(this).attr('name')) == $(this).val()) {
							$this.show();
						}
						console.log($(this).attr('name'));
						//else {
						//	return false;
						//}
					}
				});
				if(i == 0) $(this).show();
			//}
		});
		*/
	});


	/*
	// Фильтр
	$(".filter_fields .field.checkbox").click(function(event) {
		$(".item").hide().each(function(index, el) {
			// if($(".filter_fields .field.checkbox").prop('checked', true).length == 0) {
			// 	$(this).show();
			// }
			// else {
				var $this = $(this), i = 0;
				$(".filter_fields .field.checkbox").each(function(index, el) {
					// console.log($(this).prop('checked'));
					if($(this).prop('checked') == true) {
						i++;
						if($this.data($(this).attr('name')) == $(this).val()) {
							$this.show();
						}
						console.log($(this).attr('name'));
						//else {
						//	return false;
						//}
					}
				});
				if(i == 0) $(this).show();
			//}
		});
	});
	*/

});