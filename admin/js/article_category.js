$(function () {
	$.ajax({
		type: "get",
		url: BigNews.category_list,
		dataType: "json",
		success: function (response) {
			console.log(response);
		},
	});
});
