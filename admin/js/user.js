$(function () {
	$.ajax({
		type: "get",
		url: BigNews.user_detail,
		dataType: "json",
		success: function (response) {
			let $divs = $(".col-sm-4");
			let $userPic = $(".col-sm-10>img");
			let $user_pic = $(".col-sm-10>input");

			for (const key in response.data) {
				if (key != "userPic") {
					$divs.find(`[name="${key}"]`).val(response.data[key]);
					// console.log($divs.find(`[name="${key}"]`));
				}
			}
			$userPic.prop("src", response.data.userPic);
			//1.给file表单元素注册onchange事件
			$user_pic.change(function () {
				//1.2 获取用户选择的图片
				let file = this.files[0];
				//1.3 将文件转为src路径
				let url = URL.createObjectURL(file);
				//1.4 将url路径赋值给img标签的src
				$(".col-sm-10>label>img").attr("src", url);
			});

			$("#form").on("click", ".submit", function (e) {
				//禁用表单默认提交事件
				e.preventDefault();
				//创建FormData对象：参数是表单dom对象
				let fd = new FormData($("#form")[0]);
				$.ajax({
					url: BigNews.user_edit,
					type: "post",
					dataType: "json",
					data: fd,
					contentType: false,
					processData: false,
					success: function (response) {
						console.log(response);
						if (response.code === 200) {
							$("#myModal").off();
							$("#myModal").on("hidden.bs.modal", function () {
								window.parent.location.reload();
							});
							mod_message("温馨提示", response.msg, "确定");
						} else {
							mod_message("温馨提示", response.msg, "确定");
						}
					},
				});
			});
		},
	});
});
