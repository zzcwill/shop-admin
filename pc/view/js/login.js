$(function () {
	function loginEnter() {
		clearToken('token')
		var data = $("#loginForm").values();
		data.password = md5(data.password);
		$.ajax({
			url: interUrl.basic + "login",
			type: "POST",
			data: data,
			success: function (res) {
				if (res.code === 10000) {
					setToken('token',res.data)					
					location.href = "main.html";
					return;
				}

				if (res.code === 20001) {
					clearToken('token')					
					location.href = "index.html";
					return;
				}				

				if (res['code'] === 20000) {
					$('#errInfo').html(res['message']);
					$("#loginError").modal("show");
				}
			}
		});

	};

	//界面高度自适应

	//dom事件绑定
  //页面宽度变化监听事件	
	//回车监听事件，enter登陆
	$(document).on('keyup', function (e) {
		if (e.keyCode == 13) {
			loginEnter();
		}
	});
	$("#loginBtn").click(function () {
		loginEnter();
	});

	//首次加载
});
