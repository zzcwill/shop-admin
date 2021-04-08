var system = ['report/'],
    interUrl = {
        basic: "/api/"
    };


//历史遗留添加，后期要优化，删除
//当前月，年
var date = new Date();
var year = date.getFullYear();
var month = date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
var nowMonth = year + "-" + month;

// 日期格式化插件
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(), //day
        "h+": this.getHours(), //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
        "S": this.getMilliseconds() //millisecond
    };
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1,
                RegExp.$1.length == 1 ? o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};

//确认提交或退回模态框
var sureModal = '<div class="modal fade" id="sureModal">' +
    '<div class="modal-dialog modal-dialog2">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
    '<h4 class="modal-title">提示信息</h4>' +
    '</div>' +
    '<div class="modal-body">' +
    '<p class="tipText"></p>' +
    '</div>' +
    '<div class="modal-footer">' +
    '<button type="button" class="btn btn-primary" id="sureOption">确定</button>' +
    '<button type="button" class="btn btn-default" data-dismiss="modal">取消</button>' +
    '</div></div></div></div>';

function oppSureModal(text) {
    if ($("#sureModal").length > 0) {
        $("#sureModal").modal("show");
        $("#sureModal").find(".tipText").text(text);
    } else {
        $("body").append(sureModal);
        $("#sureModal").find(".tipText").text(text);
        $("#sureModal").modal("show");
    }

    // var autoMargin = ($('#sureModal').height()-$('.modal-dialog2').height()) / 2;
    // autoMargin = autoMargin - 50;
    // $('.modal-dialog2').css('margin-top', autoMargin + 'px');    
}
var sureModal2 = '<div class="modal fade" id="sureModal2">' +
    '<div class="modal-dialog modal-dialog2">' +
    '<div class="modal-content">' +
    '<div class="modal-header">' +
    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
    '<h4 class="modal-title">提示信息</h4>' +
    '</div>' +
    '<div class="modal-body">' +
    '<p class="tipText"></p>' +
    '</div>' +
    '<div class="modal-footer">' +
    '<button type="button" class="btn btn-primary" id="sureOption2">确定</button>' +
    '</div></div></div></div>';

function oppSureModal2(text) {
    if ($("#sureModal2").length > 0) {
        $("#sureModal2").modal("show");
        $("#sureModal2").find(".tipText").text(text);
    } else {
        $("body").append(sureModal2);
        $("#sureModal2").find(".tipText").text(text);
        $("#sureModal2").modal("show");
    }

    // var autoMargin = ($('#sureModal').height()-$('.modal-dialog2').height()) / 2;
    // autoMargin = autoMargin - 50;
    // $('.modal-dialog2').css('margin-top', autoMargin + 'px');     
}

function score(a) {    //评分展示
    var this_ = $(".score");
    if (type == 1 || type == 2 || type == 3) {
        this_.children('.scoreNum').html(a);
        if (a >= 101) {
            this_.attr("fors", "03").show();
        } else if (a >= 81 && a <= 100) {
            this_.attr("fors", "02").show();
        } else if (a < 81) {
            this_.attr("fors", "01").show();
        }
    }

}

//校验规则新增
if (jQuery.validator) {
    jQuery.validator.addMethod("isMoney", function (value, element) {
        var money = /^(([1-9]\d*)|0)(\.\d{1,2})?$/;
        return this.optional(element) || (money.test(value));
    }, "请填写正确的金额");
    jQuery.validator.addMethod("rate", function (value, element) {
        if (Number(value) == 100) {
            return true;
        }
        var money = /^(([1-9]\d?)|0)(\.\d{1,2})?$/;
        return this.optional(element) || (money.test(value));
    }, "格式错误");
    jQuery.validator.addMethod("isMoney8", function (value, element) {
        var money = /^(([1-9]\d{0,7})|0)(\.\d{1,2})?$/;
        return this.optional(element) || (money.test(value));
    }, "请填写正确的金额");
    jQuery.validator.addMethod("monthLoan", function (value, element) {
        var money = /^(([1-9]\d{0,5})|0)(\.\d{1,2})?$/;
        return this.optional(element) || (money.test(value) || /^0$/.test(value));
    }, "请输入格式正确的月负债");
    jQuery.validator.addMethod("bankCount", function (value, element) {
        var count = /^[0-9]+$/;
        return this.optional(element) || (count.test(value));
    }, "请填写正确的账号");
    jQuery.validator.addMethod("baseRate", function (value, element) {
        var count = /^[0-9]+(\.\d{1,4})?$/;
        return this.optional(element) || (count.test(value));
    }, "请输入正确的数字，且最大四位小数");
    jQuery.validator.addMethod("contractAmount", function (value, element) {
        var count = /^[0-9]+(\.\d{1,2})?$/;
        return this.optional(element) || (count.test(value));
    }, "请输入正确的数字，且最大两位小数");
    jQuery.validator.addMethod("adrLimit", function (value, element) {
        var adrInput = $(element).parents('.form-group').prev().find('input');
        adrInput.each(function () {
            value += $(this).val()
        })
        var len = value.replace(/[^\x00-\xff]/g, "**").length;
        return this.optional(element) || (len <= 100);
    }, "长度不能超过 50 个字符");
    jQuery.validator.addMethod("singleLimit", function (value, element) {
        var len = value.replace(/[^\x00-\xff]/g, "**").length;
        return this.optional(element) || (len <= 100);
    }, "长度不能超过 50 个字符");
    jQuery.validator.addMethod("length400", function (value, element) {
        var len = String(value).length;
        return this.optional(element) || (len <= 2000);
    }, "总长度不能超过2000个字");
    jQuery.validator.addMethod("monthLoanInDebt", function (value, element) {
        var money = /^\d+(\.\d{1,2})?$/;
        return this.optional(element) || (money.test(value));
    }, "请输入两位小数的月负债");
}
$('[name$="AddressDetail"]').addClass('adrLimit').attr('placeholder', '街道、小区门牌号');
$('[name="spouseCompanyAddress"]').addClass('adrLimit').attr('placeholder', '街道、小区门牌号');
$('[name="spousePermantAddress"]').addClass('singleLimit');


//判断值是否改变,用法:在input上增加data-check="_字段名;提示信息",在获取旧值的接口里保存window[_字段名]的值,同一window内字段名不重复
$(document).on('blur', "[data-check]", function () {
    var check = $(this).data("check"),
        _key = check.split(";", 2)[0],
        _tip = check.split(";", 2)[1];
    var newValue = $(this).val();
    if (newValue !== "" && newValue !== window[_key]) {
        tip({
            content: _tip
        })
    }
});

//cookie相关
function getToken(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1)
                c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
function setToken(name, value, seconds) {
    seconds = seconds || 24 * 60 * 60;   //seconds有值就直接赋值，没有为0，这个根php不一样。
    var expires = "";
    if (seconds != 0) {      //设置cookie生存时间
        var date = new Date();
        date.setTime(date.getTime() + (seconds * 1000));
        expires = "; expires=" + date.toGMTString();
    }
    document.cookie = name + "=" + escape(value) + expires + "; path=/";   //转码并赋值
}
function clearToken(name) {
    setToken(name, "", -1);
}