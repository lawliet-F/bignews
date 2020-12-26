$(function () {
	let $iframe = $(".main iframe");

	$.ajax({
		type: "get",
		url: BigNews.user_info,
		dataType: "json",
		success: function (response) {
			console.log(response);
			$(".user_info img").attr("src", response.data.userPic);
			$(".user_center_link img").attr("src", response.data.userPic);
			$(".user_info span").text("欢迎  " + response.data.nickname);
		},
	});
	// 登出按钮设置
	$(".header_bar .logout").click(function () {
		$("#myModal").off();
		$("#myModal").on("hidden.bs.modal", function (e) {
			window.location.href = "./login.html";
			localStorage.removeItem("token");
		});
		mod_message("温馨提示", "退出账号成功", "确定");
	});
	// 排他显示背景
	$(".level01").click(function (e) {
		e.preventDefault();
		$(this).addClass("active").siblings().removeClass("active");
	});

	console.log($('user_center_link>a[target="main_frame"]'));
	// 个人中心跳转给iframe
	$('.level01:last-child>a, .user_center_link>a[target="main_frame"]').click(function (e) {
		e.preventDefault();
		$iframe.prop("src", $(this).prop("href"));
	});
	// 给隐藏的ul列表切换显示
	$(".level01:nth-child(2)").click(function () {
		$(".level02").slideToggle();
	});
	// 文章管理跳转
	$(".level02>li").click(function (e) {
		e.preventDefault();
		// 点击显示效果排他
		$(this).addClass("active").siblings().removeClass("active");
		$iframe.prop("src", $(this).find("a").prop("href"));
	});
	// 评论管理跳转
	$(".level01:nth-child(4)").click(function () {
		$iframe.prop("src", $(this).find("a").prop("href"));
	});
});
