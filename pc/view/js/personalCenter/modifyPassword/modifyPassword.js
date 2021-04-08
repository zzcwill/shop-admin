$(function () {
	//dom绑定事件
	$("#submit").click(function () {

		if ($("#modifyPWD").valid() == true) {
			var formData = $('#modifyPWD').values();

			//6-16位数字和字母密码
			function isTruePassword(str) {
				var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;
				return reg.test(str)				
			}
			if(!isTruePassword(formData.password)) {
				tip({
					content: '请输入6-16位数字与字母组合的新密码！'
				});
				return;				
			}
			
			if(formData.password !== formData.password_again) {
				tip({
					content: '新密码与确认密码不一致，请重新输入！'
				});
				return;				
			}			

			var data = $("#modifyPWD").values();
			data.oriPassword = md5(data.oriPassword);
			data.password = md5(data.password);
			data.password_again = md5(data.password_again);

			comn.ajax({
				url: "updPassWord",
				data: data,
				success: function (res) {

					if(res.code === 20001) {
						tip({
							content: res.message
						});
						return
					}					
					if(res.code === 10000) {
						tip({
							content: '密码修改成功'
						});
						
						window.parent.location.href = "../../../index.html";					
					}
				}
			});
		}
	})

	//首次加载
	$.ajax({
		url: interUrl.basic + "user/session/get",
		type: "POST",
		dataType: "json",
		success: function (data, textStatus, jqXHR) {
			$("input[name=uid]").val(comn.user.uid);
		}
	});
})