//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "350"
tableConfig['pagination'] = false;

var args = comn.getArgs();

var dataLoad_moneyInfo = function (params) {
    var p = params.data;
    p['id'] = args['orderId'] 

	tableData(params, p, "sys/order/costDetail");
};

var feeCodeFilter = function (value, row, index) {
	return ['计费',"不计费"][value] || '-';
};

var cacheCodeFilter = function (value, row, index) {
	return ['外部接口',"本地缓存"][value] || '-';
};

//首次加载
$("#table_moneyInfo").bootstrapTable(tableConfig);