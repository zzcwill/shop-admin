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
        url: "/sys/role/list",
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
    "click .btn_role_updae": function (e, a, item, index) {
		$("#editUserTitle").text("修改角色")
        $("#roleCode").attr("readonly", true)
        handleType = "edit"
        $("#editRole").modal("show")
        $("#addRoleForm").values(item)
        $("#enabled").selectpicker("val", Number(item.enabled))
        comn.ajax({
            url: "sys/role/detail",
            data:{
                roleCode:item.roleCode,
            },
            success: function(res){
                if(res.code == 10000){
                    console.log(res)
                    initMenu(res.data.authResources || [])
                }
            }
        })
    },
};

function initMenu(arr){
    arr.forEach(function(item){
        $("#menu").find("input[value='"+ item.resourceCode +"']")[0].checked = true
    });
}
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
	$("select[name='enabled']").selectpicker("refresh");

    $(document).on("click","#addRole",function(){
		$("#editUserTitle").text("新增角色")
        $("#editRole").modal("show") 
        $("#roleCode").attr("readonly", false)
        handleType = "add"
        $("#enabled").selectpicker("val", "")
    })
    
    comn.ajax({
		url: 'sys/resource/authorized',
		success: function(res){
            if(res.code == 10000 && res.data && res.data.length > 1){
                var html = '<ul class="menuList">'
                var firstData = res.data
                firstData.forEach(function(item){
                    html += '<dl><dd><input class="m-l-4 ff" type="checkbox" valueName="'+item.name+'" value="'+ item.resourceCode +'">'+
                    '<span class="m-l-4 m-r-4 iconfont xc12"></span>' + item.name
                    if(item.childResources.length > 0){
                        item.childResources.forEach(function(item2){
                                html += '<div div class="m-l-20">' + 
                                        '<input class="m-l-4 meun-p" type="checkbox" valueName="'+item2.name+'" value="'+ item2.resourceCode +'">' +
                                    '<span class="m-l-4 m-r-4 iconfont xc12"></span>' + item2.name 
                                    
                                if(item2.childResources.length > 0){
                                    item2.childResources.forEach(function(item3){
                                        html += '<div div class="m-l-20">' + 
                                        '<input class="m-l-4 meun-p" type="checkbox" valueName="'+item3.name+'" value="'+ item3.resourceCode +'">' +
                                    '<span class="m-l-4 m-r-4 iconfont xc12"></span>' + item3.name + '</div>'
                                    })
                                }

                                html += '</div>' 
                        })
                    }
                    html+="</dd></dl>"
                });
                html += '</ul>'
                $("#menu").html(html)
            }
        }
    })

    $("#sureBtn").click(function(){
        var url = handleType == "add" ? "/sys/role/add" : "/sys/role/update" 
        var arr = []
        $("#menu input:checked").each(function(index, item){
            arr.push({
                resourceCode:$(item).attr("value"),
                name:$(item).attr("valueName")
            })
        })
        var data = $("#addRoleForm").values()
        data.enabled = Number(data.enabled)
        if(arr.length < 1){
            tip({
                content:"请选择权限"
            })
            return
        }
        $("#addRoleForm").validate();
        if($("#addRoleForm").valid()){
            comn.ajax({
                url: url,
                data:{
                    role:data,
                    authResources:arr
                },
                success: function(res){
                   
                    if(res.code == 10000){
                        $("#editRole").modal("hide")
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
        }
    })
    $(document).on("click","input.meun-p",function(){
        if($(this)[0].checked){
            $(this).parents("dd").find("input.ff")[0].checked = true
        }
    })
    $(document).on("click","input.ff",function(){
        if($(this)[0].checked){
            $(this).parents("dd").find("input.meun-p").each(function(index, item){
                $(item)[0].checked = true
            })
        }else{
            $(this).parents("dd").find("input.meun-p").each(function(index, item){
                $(item)[0].checked = false
            })
        }
    })

    var initHtml = ""
    btnAuthData.forEach(function(btn){
        if(btn.resourceType == 2){
            initHtml += '<button class="btn btn-primary m-l-10" id="addRole">'+ btn.name +'</button>'
        }
    })
    $(".resource3").append(initHtml)
});
