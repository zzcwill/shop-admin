//修改表格统一配置参数
var tableConfig = {};
$.map(comn.table, function (v, k) {
    tableConfig[k] = v;
});
tableConfig['height'] = "350"
tableConfig['pagination'] = false;

var args = comn.getArgs();

var dataLoad_riskData = function (params) {
    var p = params.data;
    p['id'] = args['orderId'] 

	tableData(params, p, "sys/order/decisionData");
};

//首次加载
$("#table_riskData").bootstrapTable(tableConfig);