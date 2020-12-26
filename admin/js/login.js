$(function () {
	let $sub = $(".input_sub");
	let $txt = $(".input_txt");
	let $pass = $(".input_pass");
	$sub.click(function (e) {
		e.preventDefault();
		let username = $txt.val().trim();
		let password = $pass.val().trim();
		if (!username || !password) {
			mod_message("温馨提示", "账号与密码不能为空", "关闭");
			return;
		}
		// console.log(BigNews.URL_base + BigNews.user_login);
		$.ajax({
			type: "post",
			url: BigNews.user_login,

			data: {
				username: username,
				password: password,
			},
			dataType: "json",

			success: function (response, status, xhr) {
				console.log(response);
				localStorage.setItem("token", response.token);

				if (response.code === 200) {
					$("#myModal").off();
					$("#myModal").on("hidden.bs.modal", function (e) {
						window.location.href = "./index.html";
					});
					mod_message("温馨提示", response.msg, "确定");
				} else {
					mod_message("温馨提示", response.msg, "确定");
				}
			},
		});
	});
});
