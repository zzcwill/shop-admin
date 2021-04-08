var imgIds = [];
//iframe页面要用的参数的全局参数
var menuData = [];
var flag = true;
var cache = {};
var user = null;
var allImg = [];

var maincomn = {
	addTab: function (o) {
		if (o.href) {
			return window.parent.menuItemClick.call(o);
		}
	},
	getMenuUrl: function (menuName, menuData) {
		var href = '';
		var menuData2 = menuData
		for (var i = 0; i < menuData2.length; i++) {

			if (menuData2[i].name == menuName) {
				href = menuData2[i].resourceUrl;
				break;
			}
		}
		return href;
	},
};



function hasTypeModifyPWD() {
	var comn1 = {
		addTab: function (o) {
			if (o.href) {
				return window.parent.menuItemClick.call(o);
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
		}
	};
	var args1 = comn1.getArgs();
	if (args1["type"] == "modifyPWD") {
		comn1.addTab({
			title: '修改个人信息 ',
			href: './Modal/personalCenter/modifyPassword/modifyPassword.html?type=modifyPWD'
		})
	}
}

function cardType(v) {
	return ['', '身份证', '军官证', '侨胞证', '外籍人士'][v] || "";
};

$.fn.nameValues = function () {
	var arg = arguments[0];
	return $(this).find("[data-name]").each(function (index, item) {
		var value = '';
		var key = $(this).data("name");
		var keySwitch = $(this).data("formatter");
		if (keySwitch) {
			value = window[keySwitch](arg[key]) || "";
		}
		if (key) {
			return $(item).html(value || arg[key] || "");
		}
	});
};


//(iframe需要调用)
function toggleTopNav() {
	function toggle() {
		flag = !flag;
		return flag;
	}

	$("#topNav").toggleClass("hide");
	var o = {};
	if (toggle()) {
		o['height'] = "calc(100% - 110px)";
	} else {
		o['height'] = "calc(100% - 0px)";
	}
	$("#content-main").css(o);
}

//jquery.photo.gallery插件需要用
function curImg(index) {
	if (index) {
		$("#curImg").text(index)
	} else {
		return parseInt($("#curImg").text());
	}
}
//jquery.photo.gallery插件需要用
function totalImg(total) { 
	$("#totalImg").text(total);
}

function initMenu(data) {
	var ulNav = ['second', 'third'];

	function itemLi(o, level, k) {
		var ref = o.childResources;

		if(level === 1) {
			ref = []
		}
		
		if (!(ref != null ? ref.length : void 0) > 0) {
			return ["<li><a class='J_menuItem' href='" + o.resourceUrl + "' data-index='" + o.resourceCode + "'>"
				+ o.name
				+ "</a>"
				+ (o.name == '预警消息' ? '<i class="tip_num_in hide" id="tipNumElmIn"></i>' : '')
				+ (o.name == '消息中心' ? '<i class="tip_num_in hide" id="MesgCenter"></i>' : '')
			].join("");
		} else {
			return ["<li>"
				+ "<a>"
				// resourceIcon
				+ ("<i class='fa'><svg class='icon' aria-hidden='true'><use xlink:href='#" + o.resourceIcon + "'></use></svg></i>")
				+ ("<span class='nav-label'>" + o.name + "</span>")
				+ "<span class='fa arrow'></span>"
				+ (o.name == '消息通知' ? '<i class="tip_num hide" id="tipNumElm"></i>' : '')
				+ "</a>" + menu(o.childResources, level + 1) + "</li>"].join("");
		}
	};
	function menu(arr, level) {
		var a = [];

		if (level !== 0) {
			a.push("<ul class='nav nav-" + ulNav[level - 1] + "-level collapse'>");
		}
		if (arr.length > 0) {
			for (var i = 0; i < arr.length; i++) {
				var k = i
				var o = arr[k];
				a.push(itemLi(o, level, k));
			}
		}
		if (level !== 0) {
			a.push("</ul>");
		}
		return a.join("");
	};
	$("#side-menu").append(menu(data, 0));
	$("#side-menu").metisMenu();

	//菜单栏滚动条处理
	$(".sidebar-collapse").slimScroll({
		height: "100%",
		railOpacity: .9,
		alwaysVisible: !1
	});
};

function updateIsRead(id){
	$.ajax({
		url: interUrl.basic+ 'release/note/single/read',
		data:{ 
			releaseId:id
		},
		success:function(res){
		}
	})
}
function doLogin(){	
	if($.trim($('#account').text()) =='' ){
	   return;
	}
	/**登录成功后创建连接****/
	//  CIMPushManager.connection();
}
/***********************************推送配置开始**************************/
   
   /**  当socket连接成功回调 **/
// function onConnectionSuccessed(ACCOUNT){
// 	CIMPushManager.bindAccount(ACCOUNT + $('#account').text());
// }

/** 当收到请求回复时候回调  **/
// function onReplyReceived(reply)
// {
//   if(reply.key=='client_bind' && reply.code==200 )
//   {
// 	 console.log("请求恢复回调")
//   }
// }

/** 当收到消息时候回调  **/

// function onMessageReceived(message)
// { 
// 	//console.log("message",message);
// 	if(message.action == ACTION_999){
// 		return;
// 	}
// 	if(JSON.parse(message.extra) instanceof Object){
// 		var data = JSON.parse(message.extra);
// 		$(".messageRemainBox_body").text(message.content);
// 		// $("#notReadNum").text(JSON.parse(data.unReadItemCountMap).totalUnReadItemCount);
// 		$("#releaseId").text(data.releaseId);
// 		$("#bopInfoId").text(data.bopInfoId);
// 		$(".messageRemainBox_title_name").text(message.title);
// 		$(".publishTime").text(data.publishTime);

// 		if(data.noticeTypeCode == "EXCEPTION_NOTICE"){
// 			$(".footer_looklook").removeClass("hide")
// 			$(".footer_toHandle").addClass("hide")
// 		}
// 		var noticeKeyCodeArr = ['TASK_TO_DO','PROMPT_BUSINESS','APPROVE_REJECT','STAGE_REJECT','STAGE_SUPPLY'];
// 		if(noticeKeyCodeArr.indexOf(data.noticeKeyCode) !== -1){
// 			$(".footer_toHandle").removeClass("hide")
// 			$(".footer_toHandle").attr("notice_key_code",data.noticeKeyCode)
// 		} else {
// 			$(".footer_toHandle").addClass("hide")
// 		}
// 		var noticeTypeCodeArr = ['RELEASE_NOTICE','SYS_NOTICE','COMPANY_NOTICE']						
// 		if(noticeTypeCodeArr.indexOf(data.noticeTypeCode) !== -1){
// 			$(".footer_looklook").removeClass("hide")
// 			$(".footer_close").removeClass("hide").addClass("hide")
// 		} else {
// 			$(".footer_looklook").removeClass("hide").addClass("hide")
// 			$(".footer_close").removeClass("hide")
// 		}

// 		$(".messageRemainBox").removeClass("MessageAnimationOut").addClass("MessageAnimationIn")
// 	}
// }

function getHiddenProp(){
	var prefixes = ['webkit','moz','ms','o'];
	// 如果hidden 属性是原生支持的，我们就直接返回
	if ('hidden' in document) {
	  return 'hidden';
	}
	
	// 其他的情况就循环现有的浏览器前缀，拼接我们所需要的属性 
	for (var i = 0; i < prefixes.length; i++){
	  // 如果当前的拼接的前缀在 document对象中存在 返回即可
	  if ((prefixes[i] + 'Hidden') in document) {
		return prefixes[i] + 'Hidden';
	  }  
	}

	// 其他的情况 直接返回null
	return null;
}

function getVisibilityState() {
    var prefixes = ['webkit', 'moz', 'ms', 'o'];

    if ('visibilityState' in document) {
      return 'visibilityState';
    }

    for (var i = 0; i < prefixes.length; i++) {
        if ((prefixes[i] + 'VisibilityState') in document){
          return prefixes[i] + 'VisibilityState';
        }  
    }
    // 找不到返回 null
    return null;
}
/***********************************推送配置结束**************************/
$(function () {
	// console.log("src",$("#carLogo").attr("src"))
	// $.ajax({
	// 	url: "/api/get/logo/pic/url",
	// 	type:"post",
	// 	success: function (res) {
	// 		if(res.code === 10000){
	// 			if(res.data && res.data.logoPic){
	// 				$("#carLogo").attr("src", res.data.logoPic)	
	// 			}else{
	// 				$("#carLogo").attr("src", "images/index-cs/logo_chesheng.png")	
	// 			}
	// 			// $("#carLogo").attr("src", "images/index-cs/panzhihua_logo.png")	
	// 		}
	// 	}
	// })
	var visProp = getHiddenProp();
	if (visProp) {
		var evtname = visProp.replace(/[H|h]idden/, '') + 'visibilitychange';
		document.addEventListener(evtname, function () {
			if(document[getVisibilityState()] == 'hidden'){
				// CIMPushManager.stop()
			}
			else if(document[getVisibilityState()] == 'visible'){
				doLogin()
			}
		},false);
	}
	//dom绑定事件
	$("#imageSwitch").on("hide.bs.modal", function () {
		function recordDocQuery(ids) {
			var obj = {}, ids = ids.split(",");
			for(var i=0; i< allImg.length; i++){
				for(var j=0; j< ids.length; j++){
					if(allImg[i].id == ids[j]){
						if(!obj[allImg[i].dirId]){obj[allImg[i].dirId] = []};
						obj[allImg[i].dirId].push(ids[j]); 
					} 
				}
			}
			for(item in obj){
				$.ajax({
					url: interUrl.basic + "photoPreview/recordDocQueryHistory",
					type: "post",
					data: {
						loanApplyId: o.loanApplyId,
						dirId: item,
						fileNamespace: o.fileNamespace,
						releventFlow: o['releventFlow'],
						releventFlowNode: o['releventFlowNode'],
						docIds: obj[item].join(",")
					},
					success: function(res){ 
						if(res.code == 20000){return comn.tip({content: res.message || "<code>" + o.url + "</code><br /> 接口异常！！！"})};
						if(typeof(o.callback == "function")){ 
							imgIds = [];
							o.callback(ids.join(","));
						} 
					}
				});
			
			}

		}   

		if (imgIds && imgIds.length > 0) {
			recordDocQuery(imgIds.join(","));
		}
	});
	$(".J_tabExit").click(function () {
		$("#logOut").modal("show");
		$('#selectPopup').toggleClass('hide');
	});	
	$("#exitSure").click(function () {
		$.ajax({
			url: interUrl.basic + "logout",
			type: "POST",
			dataType: "json",
			headers: {
				Authorization: 'Bearer ' + getToken('token')
			},			
			success: function (data, textStatus, jqXHR) {
				if (data.code == 10000 || data.code == 30000) {
					location.href = "./index.html";
				}
			}
		});
	});
	$('body').on('click','.nav-close',function(){
		if($(this).parent().hasClass('close')){
				$(this).parent().removeClass('close');
				$('.navbar-default.navbar-static-side').css({width:'260px',overflowX:'hidden'});
				$('#page-wrapper').css({marginLeft:'260px'});
		}else{
				$(this).parent().addClass('close');
				$('.navbar-default.navbar-static-side').css({width:0,overflowX:'hidden'});
				$('#page-wrapper').css({marginLeft:'45px'});
		}
	})	

	// $(".footer_readNum").click(function(){
	// 	maincomn.addTab({
	// 		title: "消息中心",
	// 		href: maincomn.getMenuUrl("消息中心", menuData)
	// 	});
	// 	$(".messageRemainBox").removeClass("MessageAnimationIn").addClass("MessageAnimationOut")
	// })
	$(".footer_close").click(function(){
		var id = $("#releaseId").text()
		updateIsRead(id)
		$(".messageRemainBox").removeClass("MessageAnimationIn").addClass("MessageAnimationOut")
	})
	$(".footer_looklook").click(function(){
		$(".messageRemainBox").removeClass("MessageAnimationIn").addClass("MessageAnimationOut")
		var id = $("#releaseId").text()
		updateIsRead(id)

		maincomn.addTab({
			title: "查看详情",
			href: "/view/Modal/releaseNote/preSee.html?releaseId="+id
		});
	})
	$(".footer_toHandle").click(function(){
		$.ajax({
			url: '/api/release/note/bopInfo/get',
			type: "POST",
			data:{ 
				bopInfoId:$("#bopInfoId").text()
			},
			success:function(res){
				if(res.code == 10000){
					if(res.data && res.data.isProcessed == 0){
						res.data.currentNodeKey = res.data.nodeKey
						res.data.businessTypeCode = res.data.businessType
						res.data.currentNodeName = res.data.nodeName
						res.data.businessId = res.data.businessObjectId
						flowJump(res.data, res.data.nodeKey, maincomn)
					}else{
						comn.tip({content:res.message||"任务已处理"})
					}
				}else{
					comn.tip({content:res.message||"接口调用失败"})
				}
			}
		})
		var id = $("#releaseId").text()
		updateIsRead(id)
		$(".messageRemainBox").removeClass("MessageAnimationIn").addClass("MessageAnimationOut")
	})
	//下拉菜单选择
	$('#carNavSystemTabSelect,#carNavSystemTabSelect2').click(function(){
		$('#selectPopup').toggleClass('hide');
	});
	//修改个人信息
	$('#changeInfo').click(function(){
		menuItemClick.call({title:'修改个人信息', href:'./Modal/personalCenter/modifyPassword/modifyPassword.html'});		
		$('#selectPopup').toggleClass('hide');
	});
	//跳到消息中心
	$('#toMessage').click(function(){
		menuItemClick.call({title:'消息中心', href:'./Modal/releaseNote/index.html'});	
	});	

	//首次加载
	$.ajax({
		url: interUrl.basic + "sys/user/loginUser",
		type: "POST",
		dataType: "json",
		headers: {
			Authorization: 'Bearer ' + getToken('token')
		},		
		success: function (res) {
			if (res.code === 20000) {
				$("#dialogTip").nameValues({
					content: data.message
				});
				$("#dialogTip").modal("show");
				return;
			} 

			if (res.code === 20001) {
				location.href = "./index.html";
				return;					
			} 

			user = res.data;
			$("#userName").text(res.data.showName)
			$("#account").text(res.data.userName)
			doLogin()
		}
	});
	$.ajax({
		url: interUrl.basic + "sys/resource/authorized",
		type: "POST",
		dataType: "json",
		headers: {
			Authorization: 'Bearer ' + getToken('token')
		},		
		success: function (data, textStatus, jqXHR) {
			if (data.code === 20000) {
				$("#dialogTip").nameValues({
					content: data.message
				});
				$("#dialogTip").modal("show");
				return;
			} 

			if (data.code === 20001) {
				location.href = "./index.html";
				return;					
			} 			

			data.data.forEach(function (item, index) {
				if (item.childResources) {
					menuData = menuData.concat(item.childResources)
				}
			})
			
			// 菜单模拟
			var demo = [
				{
					"resourceCode": "menu_sys_manger",
					"name": "业务管理",
					"parentCode": null,
					"resourceType": 1,
					"resourceIcon": "xc4",
					"childResources": [	
						{
							"resourceCode": "btn_user_add",
							"name": "订单查询",
							"parentCode": "menu_user_list",
							"resourceType": 1,
							"resourceIcon": null,
							"resourceUrl": './Modal/orderManage/order/index.html',
							"childResources": null,
						},
						{
							"resourceCode": "btn_user_add",
							"name": "节点通过率",
							"parentCode": "menu_user_list",
							"resourceType": 1,
							"resourceIcon": null,
							"resourceUrl": './Modal/flowManage/pass/index.html',
							"childResources": null,
						},
						{
							"resourceCode": "btn_user_add",
							"name": "在线决策",
							"parentCode": "menu_user_list",
							"resourceType": 1,
							"resourceIcon": null,
							"resourceUrl": './Modal/onlineManage/online/index.html',
							"childResources": null,
						},
						{
							"resourceCode": "btn_user_add",
							"name": "费用统计",
							"parentCode": "menu_user_list",
							"resourceType": 1,
							"resourceIcon": null,
							"resourceUrl": './Modal/costStatistics/index/index.html',
							"childResources": null,
						},						
					]
				},
				{
					"resourceCode": "menu_sys_manger",
					"name": "API管理",
					"parentCode": null,
					"resourceType": 1,
					"resourceIcon": "xc8",
					"childResources": [
						{
							"resourceCode": "btn_user_add",
							"name": "API文档",
							"parentCode": "menu_user_list",
							"resourceType": 1,
							"resourceIcon": null,
							"resourceUrl": './Modal/apiDocument/api/index.html',
							"childResources": null,
						},						
					]
				},				
				{
					"resourceCode": "menu_sys_manger",
					"name": "后台管理",
					"parentCode": null,
					"resourceType": 1,
					"resourceIcon": "xc3",
					"childResources": [	
						{
							"resourceCode": "btn_user_add",
							"name": "用户管理",
							"parentCode": "menu_user_list",
							"resourceType": 1,
							"resourceIcon": null,
							"resourceUrl": './Modal/backManage/user/index.html',
							"childResources": null,
						},
						{
							"resourceCode": "btn_user_add",
							"name": "角色管理",
							"parentCode": "menu_user_list",
							"resourceType": 1,
							"resourceIcon": null,
							"resourceUrl": './Modal/backManage/role/index.html',
							"childResources": null,
						},
						{
							"resourceCode": "btn_user_add",
							"name": "产品配置",
							"parentCode": "menu_user_list",
							"resourceType": 1,
							"resourceIcon": null,
							"resourceUrl": './Modal/backManage/product/index.html',
							"childResources": null,
						},
						{
							"resourceCode": "btn_user_add",
							"name": "字典管理",
							"parentCode": "menu_user_list",
							"resourceType": 1,
							"resourceIcon": null,
							"resourceUrl": './Modal/backManage/dictionary/index.html',
							"childResources": null,
						},
						{
							"resourceCode": "btn_user_add",
							"name": "黑名单管理",
							"parentCode": "menu_user_list",
							"resourceType": 1,
							"resourceIcon": null,
							"resourceUrl": './Modal/backManage/black/index.html',
							"childResources": null,
						},																																		
					]
				}				
			]		
			// data.data.unshift(demo)	
			// data.data = demo			
			function getMenuCodeArr(data) {
				var codeArr = [];
				var index = 0;
				for( var i = 0 ; i < data.length; i++) {
					var arr2 = data[i].childResources;
					for(var j = 0 ; j < arr2.length; j++) {
						codeArr[index] = {
							resourceCode: arr2[j].resourceCode,
							name: arr2[j].name,
							resourceType: arr2[j].resourceType,
							data: []
						}
						index = index + 1;
						var arr3 = arr2[j].childResources;
						for(var key = 0 ; key < arr3.length; key++) {
							if(arr3[key].parentCode === arr2[j].resourceCode){
							  var newItem = codeArr[index-1]
								newItem.data.push({
									parentCode: arr3[key].parentCode,
									resourceCode: arr3[key].resourceCode,
									name: arr3[key].name,
									resourceType: arr3[key].resourceType									
								})
								codeArr[index-1] = newItem;
							}	
						}				
					}
				} 
				return codeArr;
			}


      cache.menuCodeArr = getMenuCodeArr(data.data);
			setTimeout(function(){
				initMenu(data.data);
			},1000);

			// $(".messageRemainBox").addClass("MessageAnimationIn")
			// $.ajax({
			// 	url: interUrl.basic + 'release/note/popup/get',
			// 	type: "POST",
			// 	dataType: "json",
			// 	success: function (res, textStatus, jqXHR) {
			// 		console.log("推送",res)
			// 		if(res.code == 10000){
			// 			if(res.data.totalUnReadItemCount == 0){
			// 				return
			// 			} else {
			// 				var lastData = res.data.latestUnReadNotice
			// 				var notes = lastData.message||""
			// 				$(".messageRemainBox_body").text(notes)
			// 				$("#notReadNum").text(res.data.totalUnReadItemCount)
			// 				$("#releaseId").text(lastData.id)
			// 				$("#bopInfoId").text(lastData.bopInfoId)
			// 				$(".messageRemainBox_title_name").text(lastData.title)
			// 				$(".publishTime").text(lastData.publishTime)

			// 				var noticeKeyCodeArr = ['TASK_TO_DO','PROMPT_BUSINESS','APPROVE_REJECT','STAGE_REJECT','STAGE_SUPPLY'];
			// 				if(noticeKeyCodeArr.indexOf(lastData.noticeKeyCode) !== -1){
			// 					$(".footer_toHandle").removeClass("hide")
			// 					$(".footer_toHandle").attr("notice_key_code", lastData.noticeKeyCode)
			// 				}
			// 				var noticeTypeCodeArr = ['RELEASE_NOTICE','SYS_NOTICE','COMPANY_NOTICE']						
			// 				if(noticeTypeCodeArr.indexOf(lastData.noticeTypeCode) !== -1){
			// 					$(".messageRemainBox_body").text("请点击【去查看】阅读详情")
			// 					$(".footer_looklook").removeClass("hide")
			// 					$(".footer_close").addClass("hide")
			// 				}
			// 				$(".messageRemainBox").addClass("MessageAnimationIn")
			// 			}
			// 		}
			// 	}
			// });

		}
	}); 
			
	
	// hasTypeModifyPWD();
});

