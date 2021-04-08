var handleType 
var typeArr = [null]


menuCode = window.frameElement.getAttribute("name")
btnAuthData = []

comn.cache.menuCodeArr.forEach(function(item){
    if(menuCode.indexOf(item.resourceCode) != -1){
        btnAuthData = item.data || []
    }
})
//boostrap-table相关
var dataLoad_1
//[null, "资信筛查", "信审评分", "车商评估", "贷后监控"]
var bizTypeStr = function (value, row, index) {
    return typeArr[value] || "--"
};
var tableEvent = {
    "click .btn_product_update": function (e, a, item, index) {
		$("#editUserTitle").text("修改产品")
        $("#editUser").modal("show")
        handleType = "edit"
        $("#addProductForm").values(item)
        $("#addBizType").selectpicker("val", item.bizType)
        $("#decisionGroup").attr("readonly",true)
        $("#groupName").attr("readonly",true)
        $("#addBizType").attr("disabled",true)
        var html = '<div class="productList_title"><div class="productList_item" >决策流名称</div><div class="productList_item" >决策流编号</div></div>'
        html += '<div class="productList_title"><div class="productList_item note" >' + item.note + 
                '</div><div class="productList_item strategyName hide" >'+item.strategyName+'</div>'+
                '<div class="productList_item callbackBean hide" >'+item.callbackBean+'</div>'+
                '<div class="productList_item id hide" >'+item.id+'</div>'+
                '<div class="productList_item strategyId" ><input type="text" value="'+ (item.strategyId || "")+'" class="form-control" /></div>'+
                '</div>'  
        $(".productList").html(html)
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
    html, "</ul>", "</div>"].join("");

};

$(function () {
	$("#test1").selectpicker("refresh");
	$("select[name='status']").selectpicker("refresh");
    
    $(document).on("click","#addProduct",function(){
		$("#editUserTitle").text("新增产品")
		$("#editUser").modal("show") 
        handleType = "add"
        $("#addBizType").selectpicker("val", "")
	})

    $("#sureBtn").click(function(){
        var url = handleType == "add" ? "/sys/product/add" : "/sys/product/update"
        var data = $("#addProductForm").values()
        data.detailList = []
        var validStrategyId = true
        $(".productList_title").each(function(i, item){
            if(i == 0) return;
            if(!$(item).find(".strategyId input").val()){
                validStrategyId = false
            }
            var pushData = {
                strategyId:$(item).find(".strategyId input").val(),
                strategyName:$(item).find(".strategyName").text(),
                note:$(item).find(".note").text(),
                callbackBean:$(item).find(".callbackBean").text(),
            }
            if(handleType == "edit"){
                pushData.id = $(item).find(".id").text()
            }
            data.detailList.push(pushData)
        })
        if(!validStrategyId){
            tip({
                content:"决策流编号不能为空"
            })
            return
        }
        $("#addProductForm").validate();
        if($("#addProductForm").valid()){
            comn.ajax({
                url: url,
                data: data,
                success: function (res) {
                    if(res.code == 10000){
                        $("#editUser").modal("hide")
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
        }
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

            dataLoad_1 = function (params) {
                var p = params.data;
                comn.ajax({
                    url: "sys/product/list",
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
            $("#table").bootstrapTable('refresh', { url: "..." });
        }
    });

    $("#addBizType").change(function(){
        comn.ajax({
            url: "sys/product/getStrategyConfig",
            data:{
                bizType:$("#addBizType").val()
            },
            success: function (res) {
                if(res.code == 10000){
                    var html = '<div class="productList_title"><div class="productList_item" >决策流名称</div><div class="productList_item" >决策流编号</div></div>'
                    if(res.data && res.data.length > 0){
                        res.data.forEach(function(item){
                            html += '<div class="productList_title"><div class="productList_item note" >' + item.note + 
                            '</div><div class="productList_item strategyName hide" >'+item.strategyName+'</div>'+
                            '<div class="productList_item callbackBean hide" >'+item.callbackBean+'</div>'+
                            '<div class="productList_item strategyId" ><input type="text" value="'+ (item.strategyId || "")+'" class="form-control" /></div>'+
                            '</div>'  
                        })
                    } 
                    $(".productList").html(html)
                }
            }
        });
    })

    var initHtml = ""
    btnAuthData.forEach(function(btn){
        if(btn.resourceType == 2){
            initHtml += '<button class="btn btn-primary m-l-10" id="addProduct">'+ btn.name +'</button>'
        }
    })
    $(".resource3").append(initHtml)
});
