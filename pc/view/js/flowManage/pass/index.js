//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "350"
tableConfig['pagination'] = false;

//boostarp-table相关
var dataLoad_1 = function (params) {
	tableData(params, $("#searchForm").values(), "sys/product/nodeRate");
};

var creditStatusFilter = function (value, row, index) {
	return ['无效',"有效"][value] || '-';
};

var creditResultFilter = function (value, row, index) {
	return ['',"征信中","征信通过", "征信不通过", "已关闭"][value] || '-';
};

var signTypeFilter = function (value, row, index) {
	return ['',"电子签约","纸质"][value] || '-';
};
var signResultFilter = function (value, row) {
	if(row.signType === 2) {
		return '-'
	}

	return ['未签约',"已签约","—","签约失败"][value] || '-';
};
var outerSignTypeFilter = function (value, row, index) {
	return ['',"电子签约","纸质"][value] || '-';
};
var outerSignResultFilter = function (value, row) {
	if (row.outerSignType === 2) {
		return '-'
	}		
	return ['未签约',"已签约"][value] || '-';
};

//boostarp-table相关

$(function () {
	//dom绑定事件
  $("#importData").click(function () {
    var search = $("#searchForm").serialize();
		search = search + '&token=' + getToken('token')

    var downLink = interUrl.basic + 'sys/export/exportNodeRate' + "?" + search;
    window.open(downLink, "_blank");
  });	
	$("#btn-search2").click(function () {
		$("#table").bootstrapTable('refresh', { url: "..." });
	});
	$("#clearBtn").click(function () {
		$("#bizType").selectpicker('val', '');
		$('#appId').selectpicker('val', '');
	});	

	//首次加载
	$("#bizType").getRiskPro('', function () {
		$('#bizType').selectpicker('refresh');
	});
    $("#appId").getRiskObj('', function () {
		$('#appId').selectpicker('refresh');
	});
	$("#table").bootstrapTable(tableConfig);
})

