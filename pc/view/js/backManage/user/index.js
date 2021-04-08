var flag = false;
var handleType

menuCode = window.frameElement.getAttribute("name")
btnAuthData = []
console.log(comn.cache.menuCodeArr)
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
        url: "sys/user/list",
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

var sysRolesStr = function (value, row, index) {
    return value&&value.length&&value[0].roleCode || "--"
};
var tableEvent = {
    "click .btn_user_update": function (e, a, item, index) {
		$("#editUserTitle").text("修改用户") 
        $("input[name='pwd']").removeClass("required")
        $("input[name='Repwd']").removeClass("required")  
        $("#username").attr("readonly", true)
        handleType = "edit"  
        $("#editUser").modal("show")
        comn.ajax({
            url: "/sys/user/detail",
            data:{
                userName:item.username
            },
            success: function (res) {
                if(res.code == 10000){
                    console.log(res)
                    res.data.roleCode = res.data.sysRoles[0].roleCode
                    res.data.Repwd = res.data.pwd
                    res.data.userName = res.data.username
                    $("#addUserForm").values(res.data)
                    $("select[name=roleCode]").selectpicker("val", res.data.roleCode)
                    $("#enabled").selectpicker("val", Number(res.data.enabled).toString())
                    $("#authApps").selectpicker("val", res.data.authApps)
                }
            }
        });
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
	$("select[name='enabled']").selectpicker("refresh");
    $("#clearBtn").click(function(){
        $("select[name='enabled']").selectpicker("val", "");
    })
    $(document).on("click","#addUser",function(){
		$("#editUserTitle").text("新增用户")
		$("#editUser").modal("show") 
        handleType = "add"
        $("select[name=roleCode]").selectpicker("val", "")
        $("#enabled").selectpicker("val", "")
        $("#authApps").selectpicker("val", "")
        $("input[name='pwd']").addClass("required")
        $("input[name='Repwd']").addClass("required")
        $("#username").removeAttr("readonly")
	})
	

    $("#sureBtn").click(function(){
        var url = handleType=="add"? "sys/user/add":"sys/user/update"
        if($("input[name='pwd']").val() != $("input[name='Repwd']").val()){
            tip({
                content:"重复密码请与密码一致"
            })
            return
        }
        var data = $("#addUserForm").values()
        data.enabled = Number(data.enabled)
        $("#addUserForm").validate();
        if($("#addUserForm").valid()){
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
        url: "/sys/apiAccess/authAppList",
        success: function (res) {
            var html = ""
            if(res.data.length > 0){
                res.data.forEach(function(item){
                    html += "<option value='"+item.appId+"'>"+ item.appName +"</option>"
                });
            }
            $("select[name='authApps']").html(html)
            $("select[name='authApps']").selectpicker("refresh");
        }
    });

    comn.ajax({
        url: "/sys/role/list",
        data:{
            pageSize:10000,
        },
        success: function (res) {
            console.log("123",res)
            var html = "<option value=''>请选择</option>"
            if(res.data.length > 0){
                res.data.forEach(function(item){
                    html += "<option value='"+item.roleCode+"'>"+item.roleCode+"</option>"
                });
            }
            $("select[name='roleCode']").html(html)
            $("select[name='roleCode']").selectpicker("refresh");
        }
    });


    var initHtml = ""
    btnAuthData.forEach(function(btn){
        if(btn.resourceType == 2){
            initHtml += '<button class="btn btn-primary m-l-10" id="addUser">'+ btn.name +'</button>'
        }
    })
    $(".resource3").append(initHtml)
    
});
