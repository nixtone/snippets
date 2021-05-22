$(document).ready(function() {

	// Фильтр
	$(".filter_fields .field.checkbox").click(function(event) {
		$("li.product").hide().each(function(index, el) {
			var $this = $(this);
			$(".filter_fields .field.checkbox").each(function(index, el) {
				if($(this).prop('checked') == true && $this.data($(this).attr('name')) == $(this).val()) {
					$this.show();
					//return false;
				}
			});
		});
	});

});