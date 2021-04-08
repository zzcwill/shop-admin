var flag = false;
var init = false
var typeArr = []
var appidArr = []
var detailId
//boostrap-table相关
function getToday(){
    var date = new Date()
    var year = date.getFullYear()
    var month = date.getMonth()+1
    if(month < 10){
        month = "0" + month
    }
    var day = date.getDate()
    if(day < 10){
        day = "0" + day
    }
    return year+"-"+month+"-"+day
}
var dataLoad_1 = function (params) {
    var p = params.data;
    if(!init){
        $("input[name=startDate]").val(getToday())
        $("input[name=endDate]").val(getToday())
        init = true
    }
    comn.ajax({
        url: "sys/order/costStatistics",
        data: $.extend($("#searchForm").values(), p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data || []
            });
            params.complete();
        }
    });
};
var dataLoad_2 

var feeCodeStr = function (value, row, index) {
    return ["计费","不计费"][value] || "--"
};
var dataSourceStr = function (value, row, index) {
    return ["外部接口","本地缓存"][value] || "--"
};

var bizTypeStr = function (value, row, index) {
    return typeArr[value] || "--"
};

var tableEvent = {
    "click .detail": function (e, a, item, index) {
		$("#editUserTitle").text("费用明细")
        $("#editUser").modal("show")
        detailId = item.id
        if(!dataLoad_2){
            dataLoad_2 = function (params) {
                var p = params.data;
                comn.ajax({
                    url: "/sys/order/costDetail",
                    data: {
                        id:detailId
                    },
                    success: function (res) {
                        params.success({
                            'total': res.totalItem,
                            rows: res.data || []
                        });
                        params.complete();
                    }
                });
            };
        }
        $("#table2").bootstrapTable("refresh")
    },
};
var handle = function (value, row, index) {
    return "<button type='button' class='btn-xs btn-primary detail'>费用明细</button>" 
};
$(function () {
	$("#addUser").click(function(){
		$("#editUserTitle").text("新增用户")
		$("#editUser").modal("show") 
    })
    comn.ajax({
        url: "/sys/product/all",
        success: function (res) {
            var html = "<option value=''>请选择</option>"
            if(res.data.length > 0){
                res.data.forEach(function(item){
                    typeArr.push(item.name)
                    html += "<option value='"+item.bizType+"'>"+item.name+"</option>"
                });
            }
            $("select[name='bizType']").html(html)
            $("select[name='bizType']").selectpicker("refresh");
        }
    });
    $("#clearBtn").click(function(){
        setTimeout(function(){
            $("input[name=startDate]").val(getToday())
            $("input[name=endDate]").val(getToday())
        },0)
    })

    comn.ajax({
        url: "/sys/resource/authorized",
        success: function (res) {
            var html = "<option value=''>请选择</option>"
            if(res.data.length > 0){
                res.data.forEach(function(item){
                    appidArr[item.id] = item.name
                    html += "<option value='"+item.id+"'>"+item.name+"</option>"
                });
            }
            $("select[name='appId']").html(html)
            $("select[name='appId']").selectpicker("refresh");
        }
    });

    $("#export1").click(function(){
        var search = $("#searchForm").serialize();
        search = search + '&token=' + getToken('token')
        var downLink = interUrl.basic + 'sys/export/costExport' + "?" + search;
        window.open(downLink, "_blank");
    })
    $("#export2").click(function(){
        var search = $("#searchForm").serialize();
        search = search + '&token=' + getToken('token')
        var downLink = interUrl.basic + 'sys/export/costDetailExport' + "?" + search;
        window.open(downLink, "_blank");
    })
});
