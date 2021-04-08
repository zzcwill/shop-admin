var handleType 

menuCode = window.frameElement.getAttribute("name")
btnAuthData = []

comn.cache.menuCodeArr.forEach(function(item){
    if(menuCode.indexOf(item.resourceCode) != -1){
        btnAuthData = item.data || []
    }
})

//boostrap-table相关
var dataLoad_1 = function (params) {
    var p = params.data;
    var data = $("#searchForm").values()
    if(data.enabled !== ""){
        data.enabled = Number(data.enabled) 
    }
    comn.ajax({
        url: "sys/dict/list",
        data: $.extend(data, p),
        success: function (res) {
            params.success({
                'total': res.totalItem,
                rows: res.data || []
            });
            params.complete();
        }
    });
};
var enabledStr = function (value, row, index) {
    if(value){
        return "启用"
    }else{
        return "停用"
    }
};
var tableEvent = {
    "click .btn_dict_update": function (e, a, item, index) {
		$("#editDictTitle").text("修改字典")
        $("#editDict").modal("show")
        console.log(item)
        $("#addDicForm").values(item)
        $("#enabled").selectpicker("val", Number(item.enabled))
        handleType = "edit"
    },
};
var handle = function (value, row, index) {
    var html = ""

    btnAuthData.forEach(function(btn){
        if(btn.resourceType == 3){
            html += "<li><a class='"+ btn.resourceCode +"'>"+ btn.name +"</a></li>"
        }
    })
    return ["<div class='btn-group btn-group-xs'>", 
    "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>操作", 
    "<span class='caret'></span>", "<span class='sr-only'>下拉切换</span>", "</button>", 
    "<ul class='dropdown-menu' role='menu'>",  
    html,"</ul>", "</div>"].join("");

};

$(function () {
	$("select[name='enabled']").selectpicker("refresh");

    $(document).on("click","#addUser",function(){
		$("#editDictTitle").text("新增字典")
		$("#editDict").modal("show") 
        handleType = "add"
        $("#enabled").selectpicker("val", '')
	})

    $("#cancelBtn").click(function(){
        $("select[name='enabled']").selectpicker("val", "");
    })
    $("#sureBtn").click(function(){
        var url = "sys/dict/add"
        if(handleType == "edit"){
            url = "sys/dict/update"
        }
        var data = $("#addDicForm").values()
        data.enabled = Boolean(Number(data.enabled))
        comn.ajax({
            url: url,
            data: data,
            success: function (res) {
                if(res.code == 10000){
                    $("#editDict").modal("hide") 
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
        });
    })
    var initHtml = ""
    btnAuthData.forEach(function(btn){
        if(btn.resourceType == 2){
            initHtml += '<button class="btn btn-primary m-l-10" id="addUser">'+ btn.name +'</button>'
        }
    })
    $(".resource3").append(initHtml)
});
