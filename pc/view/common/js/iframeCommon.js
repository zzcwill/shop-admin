var queryParams, ref;

var comn = {};

var tip = null;
(function () {
	tip = function (o) {
		var base;
		return typeof (base = window.parent.comn).tip === "function" ? base.tip(o) : void 0;
	};
	return comn = {
		user: window.parent.user,
		cache: window.parent.cache,
		table: {
			"undefinedText": "-",
			"classes": "table-striped table-hover table",
			"pagination": true,
			"sidePagination": "server",
			"queryParams": "queryParams",
			"paginationFirstText": "第一页",
			"paginationPreText": "上一页",
			"paginationNextText": "下一页",
			"paginationLastText": "最后一页",
			"clickToSelect": true,
			"height": "500"
		},
		toUrl: function (o) {
			var base;
			if (o.url.indexOf(".html") > -1) {
				return typeof (base = window.parent).toUrl === "function" ? base.toUrl(o.url) : void 0;
			}
		},
		closeTab: function (url) {
			window.parent.closeTab(url);
		},
		addTab: function (o) {
			if (o.href) {
				return window.parent.menuItemClick.call(o);
			}
		},
		transformUrl: function (url) { //转译地址栏的非法字符
			url = url.replace(/{/g, '%7b');
			url = url.replace(/}/g, '%7d');
			url = url.replace(/"/g, '%22');
			return url;
		},
		argString: function (args) {
			var str = '';
			for (var key in args) {
				str += '&' + key + '=' + args[key]
			}
			return str.slice(1);
		},
		ajax: function (o) {
			var _this, mask;
			mask = layer.load();
			_this = this;
			if(o.data) {
				o.data = JSON.stringify(o.data)
			}
			if (o.url) {
				return $.ajax({
					url: interUrl.basic + o.url,
					type: o.type || "POST",
					dataType: "json",
					async: o.async === false ? false : true,
					data: o.data || {},
					headers: {
						Authorization: 'Bearer ' + getToken('token')
					},
					timeout: o.timeout || "5000",			
					contentType: o.contentType || "application/json",
					complete: function (jqXHR, textStatus) {
						return layer.close(mask);
					},
					success: function (data) {
						if (data.code === 20000) {
							return tip({
								content: data.message || "<code>" + o.url + "</code><br /> 接口异常！！！"
							});
						} else if (data.code === 20001) {
							location.reload();
							return window.parent.location.href = "../../../index.html";
						} 
						
						return typeof o.success === "function" ? o.success(data) : void 0;
					},
					error: function (jqXHR, textStatus, errorThrown) {
						return typeof o.error === "function" ? o.error(textStatus) : void 0;
					}
				});
			}
		},		
		getArgs: function () {
			var args, i, item, items, name, qs, value;
			qs = (location.search.length > 0 ? location.search.substring(1) : "");
			items = (qs.length ? qs.split("&") : []);
			args = {};
			i = 0;
			while (i < items.length) {
				item = items[i].split("=");
				name = decodeURIComponent(item[0]);
				value = decodeURIComponent(item[1]);
				if (name.length) {
					args[name] = value;
				}
				i++;
			}
			return args;
		},
		getMenuUrl: function (menuName) {
			var href = '';
			var menuData = window.parent.menuData
			for (var i = 0; i < menuData.length; i++) {

				if (menuData[i].menuName == menuName) {
					href = menuData[i].url;
					break;
				}
			}
			return href;
		},
		yearInt: function (arr, startTime) {
			var year = new Date().getFullYear();
			var html = '';
			arr.forEach(function (item, index) {
				if (index == 0) {
					html += '<option value="' + item + '" selected>' + item + '</option>';
				} else {
					html += '<option value="' + item + '">' + item + '</option>';
				}

			})
			if (!html) {
				for (var i = year; i >= startTime; i--) {
					if (i == year) {
						html += '<option value="' + i + '" selected>' + i + '</option>';
					} else {
						html += '<option value="' + i + '">' + i + '</option>';
					}

				}

			}
			return html;
		},
		getIndex: function (key, value, arr) {
			for (var i = 0; i < arr.length; i++) {
				if (arr[i][key] == value) {
					return i;
				}
			}
			return -1;
		},
		//对象数组升降序函数
		callbackKeysrt: function (key, desc) {
			return function (a, b) {
				if (!a[key]) {
					a[key] = 0;
				}
				if (!b[key]) {
					b[key] = 0;
				}
				return desc ? (a[key] - b[key]) : (b[key] - a[key]);
			}
		}
	};
})();
$.fn.extend({
	getLoad: function (callback) {
		if (!$(this).hasClass("loaded")) {
			$(this).load($(this).data("url") + ("?t=" + (new Date().getTime())), (function (_this) {
				return function () {
					if (typeof callback === "function") {
						callback();
					}
					return $(_this).addClass("loaded");
				};
			})(this));
		}
		return this;
	},	
	nameValues: function () {
		var arg;
		arg = arguments[0];
		return $(this).find("[data-name]").each(function (index, item) {
			var key, keySwitch, value;
			key = $(this).data("name");
			keySwitch = $(this).data("formatter");
			if (keySwitch) {
				value = window[keySwitch](arg[key]) || "";
			}
			if (key) {
				return $(item).html(value || arg[key] || "");
			}
		});
	},
	getRiskPro: function (value, fn, defaultOptionParams) {
		var defaultOption = defaultOptionParams || "全部"
		comn.ajax({
			url: "sys/product/all",
			data: {},
			success: (function (_this) {
				return function (res) {
					var o;
					$(_this).html("<option value=''>"+ defaultOption +"</option>" + ((function () {
						var j, len, ref, results;
						ref = res.data;
						results = [];
						for (j = 0, len = ref.length; j < len; j++) {
							o = ref[j];
							results.push("<option value='" + o.bizType + "'>" + o.name + "</option>");
						}
						return results;
					})()).join("")).val(value || "").change();
					if (fn) {
						fn()
					}
				};
			})(this)
		});
		return this;
	},
	getRiskObj: function (value, fn, defaultOptionParams) {
		var defaultOption = defaultOptionParams || "全部"
		comn.ajax({
			url: "sys/apiAccess/authAppList",
			// url: "sys/apiAccess/all",
			success: (function (_this) {
				return function (res) {
					var o;
					$(_this).html("<option value=''>"+ defaultOption +"</option>" + ((function () {
						var j, len, ref, results;
						ref = res.data;
						results = [];
						for (j = 0, len = ref.length; j < len; j++) {
							o = ref[j];
							results.push("<option value='" + o.appId + "'>" + o.appName + "</option>");
						}
						return results;
					})()).join("")).val(value || "").change();
					if (fn) {
						fn()
					}
				};
			})(this)
		});
		return this;
	},
	// 在线决策-产品类型
	getTypeRiskPro: function (riskProType , value, fn, defaultOptionParams) {
		var defaultOption = defaultOptionParams || "全部"
		comn.ajax({
			url: "sys/product/groups",
			data: {
				bizType: riskProType
			},
			success: (function (_this) {
				return function (res) {
					var o;
					$(_this).html("<option value=''>"+ defaultOption +"</option>" + ((function () {
						var j, len, ref, results;
						ref = res.data;
						results = [];
						for (j = 0, len = ref.length; j < len; j++) {
							o = ref[j];
							results.push("<option value='" + o.decisionGroup + "'>" + o.groupName + "</option>");
						}
						return results;
					})()).join("")).val(value || "").change();
					if (fn) {
						fn()
					}
				};
			})(this)
		});
		return this;
	},		
});

$(function () {
	$(window).resize(function () {
		var base;
		return typeof (base = $("table")).bootstrapTable === "function" ? base.bootstrapTable('resetView') : void 0;
	});
	$("body").on("click", "a", function (e) {
		var ref;
		if (((ref = $(this).href) != null ? ref.index(".html") : void 0) > -1) {
			e.preventDefault();
			return comn.toUrl({
				"url": $(this).href
			});
		}
	}).on("focus", ".date", function () {
		var base;
		return typeof (base = $(this)).datetimepicker === "function" ? base.datetimepicker({
			format: "yyyy-mm-dd",
			pickerPosition: "bottom-right",
			language: "zh-CN",
			minView: 2,
			todayHighlight: true,
			autoclose: true,
			todayBtn: true,
			show: true
		}).on('changeDate', function (e) { if (typeof (changeDateFun) == 'function') { changeDateFun(e) } }) : void 0;
	})
		.on("show.bs.tab", "[data-toggle='tab']", function (e) {
			return $($(this).attr("href")).find("[data-url]").each(function () { $(this).getLoad(); });
		}).on("click", ".btn[modal='reset']", function () {
			var ref;
			return (ref = $(this).parents("form")[0]) != null ? ref.reset() : void 0;
		}).on("keyup", ".number, .mobile", function () { });
	$(".modal").on("hide.bs.modal", function () {
		if ($(this).find("form").length) {
			$(this).find("form")[0].reset();
		}
		if ($(this).find('table').length) {
			$(this).find('table').each(function (index, item) {
				typeof ($(item).bootstrapTable) === "function" ? $(item).bootstrapTable('refresh') : void 0;
			})
		}
	});
	$("#btn-search").click(function () {
		$("#table").bootstrapTable('refresh', { url: "..." });
	});
});

if ((ref = $.validator) != null) {
	ref.setDefaults({
		highlight: function (e) {
			return $(e).closest(".input-tip").removeClass("has-success").addClass("has-error");
		},
		success: function (e, r) {
			return $(r).closest(".input-tip").removeClass("has-error").addClass("has-success");
		},
		errorPlacement: function (e, r) {
			if (r.parent('.input-group').length) {
				e.insertAfter(r.parent());
			} else {
				if (e.text()) {
					return e.appendTo((r.is(":radio") || r.is(":checkbox") ? r.parent().parent().parent() : r.parent()));
				}
			}
		}
	});
}

function tableData(params, data, url, callback) {
	var p = params.data;
	if (url) {
		comn.ajax({
			url: url,
			data: $.extend(data, p),
			success: function (res) {
				params.success({
					'total': res.totalItem,
					'rows': res.data
				});
				params.complete();
				typeof callback === "function" ? callback(res) : void 0;
			}
		});
	}
};

queryParams = function (params) {
	return {
		search: params.search,
		page: (params.limit + params.offset) / params.limit,
		pageSize: params.limit
	};
};

var rate = function (value, index, row) {
	if (!isNaN(Number(value))) {
		value = Number(value * 100).toFixed(2);
		return value + '%';
	} else {
		return '--'
	}
}