var args = comn.getArgs();
var isFirst = true;

$(function(){
	//dom操作
	//流程意见保存和流程提交
	$("#btn-save").click(function () {
		var apiData = $("#onlineForm").values()
		console.info(apiData)
		if(apiData.bizType === '') {
			tip({
				content: '风控产品不能为空'
			})
			return
		}	
		if(apiData.decisionGroup === '') {
			tip({
				content: '产品类型不能为空'
			})
			return
		}
		if(apiData.appId === '') {
			tip({
				content: '使用对象不能为空'
			})
			return
		}	
		
		var paramData = $("#paramBox").values()
		var toData = {
			bizType: apiData.bizType,
			decisionGroup: apiData.decisionGroup,
			appId: apiData.appId,
			orderNo: apiData.orderNo,
			body: JSON.stringify(paramData)
		}
		console.info(toData)

		oppSureModal("是否确认提交?");
		$("#sureOption").unbind("click").click(function () {
			comn.ajax({
				url: 'sys/order/onlineDecision',
				type: "POST",
				dataType: "json",
				data: toData,
				success: function (res) {
					$("#sureModal").modal("hide");
					tip({ content: '提交成功' });
					comn.closeTab();				
				}
			});			
		})			

	});
	//取消
	$("#btn-cancel").click(function () {
		comn.closeTab();
	});	

	$(document).on("change", "#bizType", function () {
		if(isFirst) {
			isFirst = false
			return
		}
		var bizTypeValue = $(this).find("option:selected").val();
		$("#decisionGroup").getTypeRiskPro(bizTypeValue, '', function () {
			$('#decisionGroup').selectpicker('refresh');
			$('#orderNo').val('');
		}, '请选择');

		getProParam(bizTypeValue)
	});
	$(document).on("change", "#appId", function () {
		getRiskOrder()
	});
	$(document).on("change", "#decisionGroup", function () {
		getRiskOrder()
	});		

	//首次加载
	$("#bizType").getRiskPro('', function () {
		$('#bizType').selectpicker('refresh');
	},'请选择');
  $("#appId").getRiskObj('', function () {
		$('#appId').selectpicker('refresh');
	}, '请选择');

	// comn.ajax({
	// 	url: 'settlement/get',
	// 	data: {
	// 		id: args['settlementId']
	// 	},
	// 	success: function (res) {
	// 		$('#onlineForm').values(res.data);				
	// 	}
	// });
});

// 根据风控产品-获取业务参数
function getProParam(bizTypeValue) {
	if(!bizTypeValue) {
		$('#paramBusiness').html('')
		return
	}
	comn.ajax({
		url: 'sys/product/getParameters',
		data: {
			bizType: bizTypeValue
		},
		success: function (res) {
			var arrData = res.data
			var paramhtml = '';

			for (var key = 0; key < arrData.length; key++) {
				paramhtml = paramhtml + [
					'<tr>',
						'<td>' + arrData[key].parameterName + '</td>',
						'<td>',
							'<div class="input-tip">',
								'<div class="col-xs-24 col-sm-24 col-md-24">',
									'<input type="type" name="' + arrData[key].parameterCode + '" class="form-control">',
								'</div>',
							'</div>',																	
						'</td>',
					'</tr>',
				].join('');																	
			}			

			$('#paramBusiness').html(paramhtml);				
		}
	});
}

// 获取业务单号
function getRiskOrder() {
	function getTime() {
		var date = new Date()
		var y = date.getFullYear()
		var m = date.getMonth() + 1
		var d = date.getDate()
		var h = date.getHours() >12 ? date.getHours() - 12:date.getHours()
			h = h < 10 ? '0' + h : '' + h
		var mi = date.getMinutes()
			mi = mi < 10 ? '0' + mi : '' + mi
		var s = date.getSeconds()
			s = s < 10 ? '0' + s : '' + s
		var str = y + '' + m + '' + d + '' + h + '' + mi + '' + s
			return str
	}

	function strRandomNumber() {
		var str = Math.round(Math.random()*999) + ''
		if(str.length === 1) {
			str = '00' + str
		}
		if(str.length === 2) {
			str = '0' + str
		}		

		return str
	}


	var orderValue = ''
	var dataBizType = $('#bizType').val()
	var dataAppId = $('#appId').val()
	var dataDecisionGroup = $('#decisionGroup').val()
	var time = getTime();
	if(dataBizType) {
		if(dataAppId) {
			if(dataDecisionGroup) {
				orderValue = dataAppId + dataBizType + dataDecisionGroup + time + strRandomNumber()
				orderValue = orderValue.toUpperCase()
			}
		}
	}

	$('#orderNo').val(orderValue)
}