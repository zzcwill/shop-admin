var postDatas = comn.getArgs();

//bootstrap-table相关
var dataLoad_print = function (params) {
	var formData = $('#searchForm').values()
	formData["projectId"] = postDatas.projectId;

	tableData(params, formData, "loanTemplateManage/loanTemplateList");
};
var handle_print = function (value, row, index) {
	return ["<div class='btn-group btn-group-xs'>",
		"<button type='button' class='btn btn-primary printBtn'>打印预览",
		"</button>", "</div>"].join("");
};
var tableEvent_print = {
	//打印预览操作

	"click .printBtn": function (e, a, item, index) {
		var _data = {};
		_data["projectId"] = postDatas.projectId;
		_data["templateId"] = item.id;

		comn.ajax({
			url: "loanTemplateManage/loanTemplateContentList",
			data: _data,
			success: function (res) {

				var template = res.data.loanTemplateContentList;
				var dataSource = res.data.loanTemplateMetaData;
				(function () {
					LODOP = getLodop();
					LODOP.PRINT_INIT("");

					if (item.templateName == "汇盈-送达地址确认书（担保人）20181224") {

						for (var i = 0; i < dataSource.guarantorNameList.length; i += 1) {
							dataSource.guarantorName = dataSource.guarantorNameList[i];
							dataSource.guarantorHomeDetailAddr = dataSource.guarantorHomeDetailAddrList[i];
							dataSource.guarantorMobilePhone = dataSource.guarantorMobilePhoneList[i];
							dataSource.guarantorCardNo = dataSource.guarantorCardNoList[i];
							var temporary = template[0].templateContent;
							temporary = temporary.replace(/{([\w ]+)}/g, function ($1, $2) {
								return convert(dataSource, $2) || dataSource[$2] || "";
							})

							temporary = temporary.replace(/LODOP\.PRINT_INIT\(""\);?/, "");
							temporary = temporary.replace(/LODOP\.PRINT_INIT\(.+""\);?/, "");
							temporary = temporary.replace(/LODOP\.PRINT_INITA\(""\);?/, "");
							temporary = temporary.replace(/LODOP\.PRINT_INITA\(.+""\);?/, "");
							temporary = temporary.replace(/LODOP\.SET_PRINT_PAGESIZE\(.+"A4"\);?/, "");
							CreateOnePage(temporary);
						};
					} else {
						for (var i = 0; i < template.length; i += 1) {
							var temporary = template[i].templateContent;
							temporary = temporary.replace(/{([\w ]+)}/g, function ($1, $2) {
								return convert(dataSource, $2) || dataSource[$2] || "";
							})
							temporary = temporary.replace(/LODOP\.PRINT_INIT\(""\);?/, "");
							temporary = temporary.replace(/LODOP\.PRINT_INIT\(.+""\);?/, "");
							temporary = temporary.replace(/LODOP\.PRINT_INITA\(""\);?/, "");
							temporary = temporary.replace(/LODOP\.PRINT_INITA\(.+""\);?/, "");
							temporary = temporary.replace(/LODOP\.SET_PRINT_PAGESIZE\(.+"A4"\);?/, "");
							CreateOnePage(temporary);
						};
					}
					LODOP.PREVIEW();
				})();
			}
		});
	}
}
//bootstrap-table相关

//文档传递流程
function convert(data, key) {
	for (k in data) {
		if (data[k] && data[k].toString().toLowerCase() === key) { return "√"; }
	}
	return "";
}

//添加新打印页
function CreateOnePage(str) {
	LODOP.NewPage();
	eval(str);
};

$(function(){
	//dom绑定事件
	$("#printBtn").click(function () {
		$('#templateName').val('')
		$('#prefix').selectpicker('val', '');

		$("#printTable").modal();
		$("#table_print").bootstrapTable(comn.table);
	})
	$('#btnSearch').click(function () {
		$("#table_print").bootstrapTable("refresh", { url: "..." });
	})
	//前缀删选模板
	$("#prefix").on("change", function () {
		$("#table_print").bootstrapTable("refresh", { url: "..." });
	});	

	// 首次加载
	if(postDatas.typeContractPrint == 1) {
		$('#flowTitle').text('合同套打')
		$('#printBtn').removeClass('hide')

		$('#prefix').selectpicker('refresh');	
	}	
})

