var flag = false;
var delId 

menuCode = window.frameElement.getAttribute("name")
btnAuthData = []

comn.cache.menuCodeArr.forEach(function(item){
    if(menuCode.indexOf(item.resourceCode) != -1){
        btnAuthData = item.data || []
    }
})

var cacheCodeFilter = function (value, row, index) {
	return ['外部接口',"本地缓存"][value] || '-';
};

//boostrap-table相关
var dataLoad_1 = function (params) {
    var p = params.data;
    comn.ajax({
        url: "sys/blacklist/list",
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
var deleteStatusStr = function (value, row, index) {
    return ["未删除","已删除"][value] || "--"
};
var tableEvent = {
    "click .detail": function (e, a, item, index) {
		$("#blackDetailTitle").text("黑名单详情")
        $("#blackDetail").modal("show")
        delId = item.id
        if(!dataLoad_2){
            dataLoad_2 = function (params) {
                var p = params.data;
                comn.ajax({
                    url: "/sys/blacklist/detail",
                    data: $.extend({
                        id: delId
                    },p),
                    success: function (res) {
                        params.success({
                            'total': res.data.length,
                            rows: res.data || []
                        });
                        params.complete();
                    }
                });
            };
        }
        $("#table2").bootstrapTable('refresh', { url: "..." });
    },
};
var tableEvent_2 = {
    "click .btn_blacklist_delDetail": function (e, a, item, index) {
        $("#sureModal").modal("show");
        $("#tipText").text("确定删除？");
        $("#del_sureBtn").unbind("click").click(function () {
            comn.ajax({
                url: "/sys/blacklist/delDetail",
                data: {
                    id: item.id
                },
                success: function (res) {
                    if(res.code == 10000){
                        if(res.code == 10000){
                            $("#sureModal").modal("hide");
                            tip({content:res.message || "成功"})
                            $("#table2").bootstrapTable("refresh", { url: "..." });
                        }
                        else{
                            tip({content:res.message || "失败"})
                        }
                    }
                }
            })
        })
    },
};
var handle = function (value, row, index) {
    return ["<div class='btn-group btn-group-xs'>", 
    "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", 
    "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", 
    "<ul class='dropdown-menu' role='menu'>",  
        "<li><a class='detail'>详情</a></li>", "</ul>", "</div>"].join("");

};
var handle_2 = function (value, row, index) {
    var html = ""

    btnAuthData.forEach(function(btn){
        if(btn.resourceType == 3){
            html += "<a class='"+ btn.resourceCode +"'>"+ btn.name +"</a>"
        }
    })
    return html;

};

$(function () {
    $("#blackDetail").on("hide.bs.modal", function () {
		$("#table").bootstrapTable("refresh", { url: "..." });
	});
	$("select[name='deleteStatus']").selectpicker("refresh");
    
    $(document).on("click","#addUser",function(){
		$("#editBlackTitle").text("新增黑名单")
		$("#editBlack").modal("show") 
        $("select[name='deleteStatus']").selectpicker("val","");
	})
	
    $("#sureBtn").click(function(){
        var data = $("#addBlackForm").values()
        comn.ajax({
            url: "sys/blacklist/addDetail",
            data:data,
            success: function (res) {
                if(res.code == 10000){
                    $("#editBlack").modal("hide")
                    tip({
                        content:res.message || "保存成功"
                    })
                    $("#table").bootstrapTable('refresh', { url: "..." });
                }else{
                    tip({
                        content:res.message || "保存失败"
                    })
                }
            }
        })
    })

    comn.ajax({
        url: "sys/blacklist/parentTypeList",
        success: function (res) {
            console.log(res)
            var html = "<option value=''>请选择</option>"
            if(res.data.length > 0){
                res.data.forEach(function(item){
                    html += "<option value='"+item.parentType+"'>"+item.name+"</option>"
                });
            }
            $("select[name='blacklistParentType']").html(html)
            $("select[name='blacklistParentType']").selectpicker("refresh");
        }
    })

    $("select[name='blacklistParentType']").change(function(){
        comn.ajax({
            url: "sys/blacklist/parentTypeList",
            data:{
                parentType:$("select[name='blacklistParentType']").val()
            },
            success: function (res) {
                console.log(res)
                var html = "<option value=''>请选择</option>"
                if(res.data.length > 0){
                    res.data.forEach(function(item){
                        html += "<option value='"+item.type+"'>"+item.name+"</option>"
                    });
                }
                $("select[name='type']").html(html)
                $("select[name='type']").selectpicker("refresh");
            }
        })
    })
    var initHtml = ""
    btnAuthData.forEach(function(btn){
        if(btn.resourceType == 2){
            initHtml += '<button class="btn btn-primary m-l-10" id="addUser">'+ btn.name +'</button>'
        }
    })
    $(".resource3").append(initHtml)
});
