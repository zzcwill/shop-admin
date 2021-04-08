//boostarp-table相关
$('#startDate').val(msToTime2())
$('#endDate').val(msToTime2())
var dataLoad_1 = function (params) {
	tableData(params, $("#searchForm").values(), "sys/order/list");
};

var tableEvent = {
	"click .lookReport": function (e, a, item, index) {
		comn.ajax({
			url: 'sys/order/report',
			data: { id: item.id },
			success: function (res) {
				comn.addTab({ 
					title: '风控报告', 
					href: res.data
				});
			}
		});
	},
	"click .centerData": function (e, a, item, index) {
		var space = '&orderType=centerData';
		comn.addTab({ 
			title: '中间数据', 
			href: './Modal/orderManage/order/orderInfo.html?orderId=' + item.id + space
		});
	},
	"click .riskData": function (e, a, item, index) {
		var space = '&orderType=riskData';
		comn.addTab({ 
			title: '决策结果', 
			href: './Modal/orderManage/order/orderInfo.html?orderId=' + item.id + space
		});
	},
	"click .moneyInfo": function (e, a, item, index) {
		var space = '&orderType=moneyInfo';
		comn.addTab({ 
			title: '计费信息', 
			href: './Modal/orderManage/order/orderInfo.html?orderId=' + item.id + space
		});
	},				
	"click .resetEnd": function (e, a, item, index) {
		oppSureModal("是否确认重推");
		$("#sureOption").unbind("click").click(function () {
			$("#sureModal").modal("hide");
			comn.ajax({
				url: 'sys/order/pushResult',
				data: { id: item.id },
				success: function (res) {
					tip({ content: '重推成功' });
					$('#btn-search2').trigger('click');
				}
			});
		});
	}	
};

var handle = function (value, row, index) {
	var menuItem = ''
	var menuItem2 = ''
	var menuItem3 = ''
	var menuItem4 = ''
	var menuItem5 = ''

	var roleArr = []
	for( var key = 0 ;  key < comn.cache.menuCodeArr.length ; key++) {
		var itemData = comn.cache.menuCodeArr[key];
		if(itemData.resourceCode === 'menu_order_manage') {
			roleArr = itemData.data
		}			
	}

	for( var item = 0 ; item < roleArr.length ; item++) {
		var resourceCode = roleArr[item].resourceCode;
		if(resourceCode === "btn_order_report") {
			menuItem = "<li><a class='lookReport' href='javascript:;'>风控报告</a></li>";
		}
		if(resourceCode === "btn_order_midData") {
			menuItem2 = "<li><a class='centerData' href='javascript:;'>中间数据</a></li>";
		}
		if(resourceCode === "btn_order_decisionData") {
			menuItem3 = "<li><a class='riskData' href='javascript:;'>决策结果</a></li>";
		}
		if(resourceCode === "btn_order_costDetail") {
			menuItem4 = "<li><a class='moneyInfo' href='javascript:;'>计费信息</a></li>";
		}
		if(resourceCode === "btn_order_pushResult") {
			menuItem5 = 	"<li><a class='resetEnd' href='javascript:;'>重推结果</a></li>";
		}								
	}	


	return ["<div class='btn-group btn-group-xs'>", 
	"<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>操作", 
	"<span class='caret'></span>", 
	"<span class='sr-only'>下拉切换</span>", 
	"</button>", 
	"<ul class='dropdown-menu' role='menu'>",
		menuItem,
		menuItem2,
		menuItem3,
		menuItem4,
		menuItem5,
	"</ul>", 
	"</div>"].join("");
};

// var creditStatusFilter = function (value, row, index) {
// 	return ['无效',"有效"][value] || '-';
// };

//boostarp-table相关

$(function () {
	//dom绑定事件
  $("#importData").click(function () {
    var search = $("#searchForm").serialize();
    var downLink = interUrl.basic + 'sys/order/costExport' + "?" + search;
    window.open(downLink, "_blank");
  });
	$("#btn-search2").click(function () {
		$("#table").bootstrapTable('refresh', { url: "..." });
	});
	$("#clearBtn").click(function () {
		$("#bizType").selectpicker('val', '');
		$('#appId').selectpicker('val', '');

		$('#runStatus').selectpicker('val', '');
		$('#pushStatus').selectpicker('val', '');

	});	

	//首次加载
	$("#bizType").getRiskPro('', function () {
		$('#bizType').selectpicker('refresh');
	});
    $("#appId").getRiskObj('', function () {
		$('#appId').selectpicker('refresh');
	});
	$('#runStatus').selectpicker('refresh'); 
	$('#pushStatus').selectpicker('refresh'); 
	console.info(comn.cache.menuCodeArr)
})


function msToTime2() {
	var t = new Date()
	var y = t.getFullYear()
	var m = t.getMonth() + 1
	m = m < 10 ? '0' + m : m
	var d = t.getDate()
	d = d < 10 ? '0' + d : d
	var str = y + '-' + m + '-' + d
	return str
}

