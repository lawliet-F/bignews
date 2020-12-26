$(function () {
	$.ajax({
		type: "get",
		url: BigNews.category_list,
		dataType: "json",
		success: function (response) {
			let $tbody = $(".category_table tbody");
			let $add = $(".category_table tfoot .btn-success");
			let $modal = $("#exampleModal");
			let $modal_inputs = $(".modal-body input");
			// 渲染数据
			$tbody.html(template("category_list", response));
			// 删除按钮
			$tbody.on("click", "a.btn-danger", function (e) {
				e.preventDefault();
				let id = +$(this).parents("tr").attr("data-id");
				console.log(id);
				$.ajax({
					type: "post",
					url: BigNews.category_delete,
					data: {
						id: id,
					},
					dataType: "json",
					success: function (response) {
						console.log(response);
						$("#myModal").off();
						$("#myModal").on("hidden.bs.modal", function (e) {
							window.location.reload();
						});
						mod_message("温馨提示", response.msg, "确定");
					},
				});
			});
			// 编辑按钮
			$tbody.on("click", "a.btn-info", function (e) {
				e.preventDefault();
				mod_category.call(this);
				$modal.find(".modal-footer>.btn-primary").attr("data-id", $(this).parents("tr").attr("data-id"));
				for (let i = 0; i <= 1; i++) {
					$modal_inputs.eq(i).val(
						$tbody
							.find(`tr[data-id="${$(this).parents("tr").attr("data-id")}"]>td`)
							.eq(i)
							.text()
					);
				}
			});
			// 新增分类按钮
			$add.click(function (e) {
				e.preventDefault();
				$(".modal-body p").css("display", "none");
				mod_category.call(this);
			});
			$modal.find(".modal-footer>.btn-primary").click(function () {
				let name = $modal_inputs.eq(0).val().trim();
				let slug = $modal_inputs.eq(1).val().trim();
				let id = +$(this).attr("data-id");
				if (!name || !slug) {
					return;
				}
				if ($(this).text() == "新增") {
					$.ajax({
						type: "post",
						url: BigNews.category_add,
						data: {
							name: name,
							slug: slug,
						},
						dataType: "json",
						success: function (response) {
							$("#exampleModal").off();
							$("#exampleModal").on("hidden.bs.modal", function (e) {
								window.location.reload();
							});
							$("#exampleModal").modal("hide");
						},
						error: function (xhr) {
							$(".modal-body p").css("display", "block").text(xhr.responseJSON.msg);
						},
					});
				} else {
					$.ajax({
						type: "post",
						url: BigNews.category_edit,
						data: {
							id: id,
							name: name,
							slug: slug,
						},
						dataType: "json",
						success: function (response) {
							$("#myModal").off();
							$("#myModal").on("hidden.bs.modal", function (e) {
								$("#exampleModal").off();
								$("#exampleModal").on("hidden.bs.modal", function (e) {
									window.location.reload();
								});
								if (response.code == 200) {
									$("#exampleModal").modal("hide");
								}
							});
							mod_message("温馨提示", response.msg, "确定");
						},
					});
				}
			});
		},
	});
});
