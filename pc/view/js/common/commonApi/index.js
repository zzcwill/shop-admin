jQuery.browser = {};
var args = comn.getArgs();

//多媒体目录-对象
var treeObj = null
var cureentDir = null;
var apiDocObj = {}
var treeApiArr = []

//方法start
//点击树菜单
function zTreeOnClick(event, treeId, treeNod) {
  cureentDir = treeNod;
  console.info(cureentDir)

  // 接口类型表格遍历
  var apiTableHtml = '';
  for (key in cureentDir) {
    var paramData = ['path', 'type', 'summary', 'description', 'consumes', 'produces']
    if(paramData.indexOf(key) !== -1) {
      apiTableHtml = apiTableHtml + [
        '<tr>',
          '<td>' + key + '</td>',
          '<td>' + cureentDir[key] + '</td>',      
        '</tr>',
      ].join('');	      
    }																
  }
  $('#apiTable').html(apiTableHtml);	 
  
  // 接口类型参数表格遍历
  var paramTableHtml = '';
  for (var keyItem = 0; keyItem < cureentDir.parameters.length; keyItem++) {  
    var itemDataObj = cureentDir.parameters[keyItem];
    var descriptionData = itemDataObj.description ? itemDataObj.description : '';
    var requiredData = itemDataObj.required ? 'yes' : 'no';

    paramTableHtml = paramTableHtml + [
      '<tr>',
        '<td>' + itemDataObj.name + '</td>', 
        '<td>' + descriptionData + '</td>', 
        '<td>' + itemDataObj.in + '</td>', 
        '<td>' + itemDataObj.type + '</td>', 
        '<td>' + requiredData + '</td>',                        
      '</tr>',
    ].join('');	      														
  }
  $('#paramTable').html(paramTableHtml);  
}
function loadTree(fnCallback) {
  $.fn.zTree.destroy();  

  comn.ajax({
    url: "v2/api-docs",
    type: 'get',
    success: function (res) {
      // console.info(res)
      apiDocObj = res;
      treeApiArr = getTreeApiArr()
      treeObj = $.fn.zTree.init($("#tree"), {
        check: {
          enable: false,
          chkDisabledInherit: true,
          chkStyle: "checkbox",
        },
        data: {
          key: {
            checked: 'canTick'
          },
        },
        showLine: true,
        expand: true,
        callback: {
          onClick: zTreeOnClick
        }
      }, treeApiArr);
      treeObj.expandAll(true);
      if(fnCallback) {
        fnCallback()
      }
    }
  });
}
function getTreeApiArr() {
  var oneData = apiDocObj.tags;
  var twoData = apiDocObj.paths;
  var getArr = [];

  for (var key = 0; key < oneData.length; key++) {  
    var keyData = oneData[key]
    keyData.children = []
    getArr[key] = keyData   
  }  

  for (var key2 = 0; key2 < getArr.length; key2++) {  
    for (item in twoData) {  
      if(twoData[item].get) {
        var itemTag = twoData[item].get.tags.join('')
        if(getArr[key2].name === itemTag) {
          var key2Data = getArr[key2]
  
          key2Data.children.push({
            path: item,
            name: twoData[item].get.summary,
            type: 'get',
            summary: twoData[item].get.summary,
            description: twoData[item].get.description,
            consumes: twoData[item].get.consumes.join(''),
            produces: twoData[item].get.produces.join(''),
            parameters: twoData[item].get.parameters ? twoData[item].get.parameters : [],
          })        
          getArr[key2] = key2Data      
        }         
      }

      if(twoData[item].post) {
        var itemTag = twoData[item].post.tags.join('')
        if(getArr[key2].name === itemTag) {
          var key2Data = getArr[key2]
          key2Data.children.push({
            path: item,
            name: twoData[item].post.summary,
            type: 'post',
            summary: twoData[item].post.summary,
            description: twoData[item].post.description,
            consumes: twoData[item].post.consumes.join(''),
            produces: twoData[item].post.produces.join(','),
            parameters: twoData[item].post.parameters ? twoData[item].post.parameters : [],
          })        
          getArr[key2] = key2Data      
        }          
      }
    }
  }

  return getArr
}
//方法end

$(function () {
  //dom操作事件
  
  //首次加载
  //加载左侧目录树
  loadTree(function(){
    $('#tree_2_span').trigger('click');   
  });
});