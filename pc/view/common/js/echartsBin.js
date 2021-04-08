//图成功回调方法
function getObjValueByKey(arr, key, keyValue, returnKey) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i][key] == keyValue) {
            return arr[i][returnKey];
        }
    }
    return '';
}
function getTotal(chartsObj,seriesData,total){
    var newTotal = total
    var chartsObjSelected= chartsObj.getOption().legend[0].selected
    for(var key in chartsObjSelected){
        if(chartsObjSelected[key] == false){
            seriesData.forEach(function(item){
                if(item.name == key){
                    newTotal =newTotal - item.value
                }
            })
        }
    }
    return newTotal
}
function getTotal2(chartsObj,seriesData,total){
    var newTotal = total
    var chartsObjSelected= chartsObj.getOption().legend[0].selected
    for(var key in chartsObjSelected){
        if(chartsObjSelected[key] == false){
            seriesData.forEach(function(item){
                if(item.name == key){
                    newTotal =newTotal - item.value
                }
            })
        }
    }
    console.log(newTotal)
    return newTotal
}
function formatData(data){
    var newData = []
    data.forEach(function(item,index){
        newData[index] = {}
        newData[index].detailList = []
        var i = 0;
        for(var key in item){
            if(key == "bankPaymentNum"){
                newData[index].detailList[i] = {}
                newData[index].detailList[i].name = "放款成功"
                newData[index].detailList[i].amount = item[key]
                newData[index].detailList[i].AmtSum = item["bankPaymentAmtSum"]||0
                i++;
            }else if(key == "creditPassNum"){
                newData[index].detailList[i] = {}
                newData[index].detailList[i].name = "征信通过"
                newData[index].detailList[i].amount = item[key]
                newData[index].detailList[i].AmtSum = "--"
                i++;
            }else if(key == "creditSubmitNum"){
                newData[index].detailList[i] = {}
                newData[index].detailList[i].name = "征信申请"
                newData[index].detailList[i].amount = item[key]
                newData[index].detailList[i].AmtSum = "--"
                i++;
            }else if(key == "loanApplyNum"){
                newData[index].detailList[i] = {}
                newData[index].detailList[i].name = "贷款申请"
                newData[index].detailList[i].amount = item[key]
                newData[index].detailList[i].AmtSum = item["loanApplyAmtSum"]||0
                i++;
            }else if(key == "loanPassNum"){
                newData[index].detailList[i] = {}   
                newData[index].detailList[i].name = "审批通过"
                newData[index].detailList[i].amount = item[key]
                newData[index].detailList[i].AmtSum = item["loanPassAmtSum"]||0
                i++;
            }else if(key == "stateTime"){
                var date = item[key].split("-")
                newData[index].year = Number(date[0]).toString()
                newData[index].month = Number(date[1]).toString()
                newData[index].day = Number(date[2]).toString()
            }
        }
    })
    return newData
}
var G11success = function(res, chartsObj, panelId) {
    var data = res.data.detailList
    var numTotal = res.data.numTotal
    var legendData = [],
        seriesData = [];
    data.forEach(function(item) {
        legendData.push(item.name);
        seriesData.push({ name: item.name, value: item.businessNum, num: item.businessAmt })
    })
    res.data.numTotal = getTotal(chartsObj,seriesData,res.data.numTotal)
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return '<div class="borderRadius" style="padding: 5px ;margin: -5px;border: 2px solid ' + params.color + '; min-width: 120px;font-size: 12px;color: ' + params.color + ';">' + params.name + '：' + params.data.num + '万元<div style="border-top: 1px solid ' + params.color + ';margin: 3px -5px;"></div>' + params.value + '笔  <span class=" borderRadius" style="color: #fff;font-size:12px;padding:1px 3px;background-color:' + params.color + ' "> ' + params.percent + '% </span>' + '</div>';
            },
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderColor: '#37A2DA',
            borderWidth: 0,
            textStyle: {
                color: '#37A2DA'
            }
        },
        title: {
            text: Math.abs(res.data.numTotal),
            textStyle: {
                color: '#333',
                fontSize:"28"
            },
            subtext: '笔',
            subtextStyle: {
                color: '#999',
                fontSize: 14
            },
            top: '45%'
        },
        series: [{
            data: seriesData,
        }],
        legend: {
            data: legendData,
        }
    }
    chartsObj.setOption(option)
    chartsObj.off('click');
    chartsObj.off('legendselectchanged')
    chartsObj.on('legendselectchanged', function(obj) {
        var changeTotal = numTotal 
        for(var key in obj.selected){
            if(obj.selected[key] == false){
                seriesData.forEach(function(item){
                    if(item.name == key){
                        changeTotal = changeTotal - item.value
                    }
                })
            }
        }
        option.title.text = changeTotal
        chartsObj.setOption(option)
    });
}
var G11success2 = function(res, chartsObj, panelId) {
    var data = res.data.detailList
    var numTotal = res.data.total
    var legendData = [],
        seriesData = [];
    data.forEach(function(item) {
        legendData.push(item.name);
        seriesData.push({ name: item.name, value: item.businessAmt, num: item.businessNum })
    })
    res.data.total = getTotal(chartsObj,seriesData,res.data.total)
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return '<div class="borderRadius" style="padding: 5px ;margin: -5px;border: 2px solid ' + params.color + '; min-width: 120px;font-size: 12px;color: ' + params.color + ';">' + params.name + '：' + params.data.num + '笔<div style="border-top: 1px solid ' + params.color + ';margin: 3px -5px;"></div>' + params.value + '万元  <span class=" borderRadius" style="color: #fff;font-size:12px;padding:1px 3px;background-color:' + params.color + ' "> ' + params.percent + '% </span>' + '</div>';
            },
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderColor: '#37A2DA',
            borderWidth: 0,
            textStyle: {
                color: '#37A2DA'
            }
        },
        title: {
            text: Math.abs(res.data.total).toFixed(2),
            textStyle: {
                color: '#333',
                fontSize:"28"
            },
            subtext: '万',
            subtextStyle: {
                color: '#999',
                fontSize: 14
            },
            top: '45%'
        },
        series: [{
            data: seriesData

        }],
        legend: {
            data: legendData
        }
    }
    chartsObj.setOption(option)
    chartsObj.off('click');
    chartsObj.off('legendselectchanged')
    chartsObj.on('legendselectchanged', function(obj) {
        var changeTotal = numTotal 
        for(var key in obj.selected){
            if(obj.selected[key] == false){
                seriesData.forEach(function(item){
                    if(item.name == key){
                        changeTotal = changeTotal - item.value
                    }
                })
            }
        }
        option.title.text = Math.abs(changeTotal).toFixed(2)
        chartsObj.setOption(option)
    });
}
var G22success = function(res, chartsObj, panelId) {
    var numTotal = res.data.numTotal
    var data = res.data.detailList
    var legendData = [],
        seriesData = [];
    data.forEach(function(item) {
        legendData.push(item.name);
        seriesData.push({ name: item.name, value: item.businessNum, num: item.businessAmt })
    })
    res.data.numTotal = getTotal(chartsObj,seriesData,res.data.numTotal)
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return '<div class="borderRadius" style="padding: 5px ;margin: -5px;border: 2px solid ' + params.color + '; min-width: 120px;font-size: 12px;color: ' + params.color + ';">' + params.name + '：' + params.data.num + '万元<div style="border-top: 1px solid ' + params.color + ';margin: 3px -5px;"></div>' + params.value + '笔  <span class=" borderRadius" style="color: #fff;font-size:12px;padding:1px 3px;background-color:' + params.color + ' "> ' + params.percent + '% </span>' + '</div>';
            },
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderColor: '#37A2DA',
            borderWidth: 0,
            textStyle: {
                color: '#37A2DA'
            }
        },
        title: {
            text: Math.abs(res.data.numTotal),
            textStyle: {
                color: '#333',
                fontSize:"28"
            },
            subtext: '笔',
            subtextStyle: {
                color: '#999',
                fontSize: 14
            },
            top: '45%'
        },
        series: [{
            data: seriesData

        }],
        legend: {
            data: legendData
        }
    }
    chartsObj.setOption(option)
    chartsObj.off('click');
    chartsObj.off('legendselectchanged')
    chartsObj.on('legendselectchanged', function(obj) {
        var changeTotal = numTotal 
        for(var key in obj.selected){
            if(obj.selected[key] == false){
                seriesData.forEach(function(item){
                    if(item.name == key){
                        changeTotal = changeTotal - item.value
                    }
                })
            }
        }
        option.title.text = changeTotal
        chartsObj.setOption(option)
    });
}
var G22success2 = function(res, chartsObj, panelId) {
    var data = res.data.detailList
    var numTotal = res.data.total
    var legendData = [],
        seriesData = [];
    data.forEach(function(item) {
        legendData.push(item.name);
        seriesData.push({ name: item.name, value: item.businessAmt, num: item.businessNum })
    })
    res.data.total = getTotal(chartsObj,seriesData,res.data.total)
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return '<div class="borderRadius" style="padding: 5px ;margin: -5px;border: 2px solid ' + params.color + '; min-width: 120px;font-size: 12px;color: ' + params.color + ';">' + params.name + '：' + params.data.num + '笔<div style="border-top: 1px solid ' + params.color + ';margin: 3px -5px;"></div>' + params.value + '万元  <span class=" borderRadius" style="color: #fff;font-size:12px;padding:1px 3px;background-color:' + params.color + ' "> ' + params.percent + '% </span>' + '</div>';
            },
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderColor: '#37A2DA',
            borderWidth: 0,
            textStyle: {
                color: '#37A2DA'
            }
        },
        title: {
            text: Math.abs(res.data.total).toFixed(2),
            textStyle: {
                color: '#333',
                fontSize:"28"
            },
            subtext: '万',
            subtextStyle: {
                color: '#999',
                fontSize: 14
            },
            top: '45%'
        },
        series: [{
            data: seriesData

        }],
        legend: {
            data: legendData
        }
    }
    chartsObj.setOption(option)
    chartsObj.off('click');
    chartsObj.off('legendselectchanged')
    chartsObj.on('legendselectchanged', function(obj) {
        var changeTotal = numTotal 
        for(var key in obj.selected){
            if(obj.selected[key] == false){
                seriesData.forEach(function(item){
                    if(item.name == key){
                        changeTotal = changeTotal - item.value
                    }
                })
            }
        }
        option.title.text = Math.abs(changeTotal).toFixed(2)
        chartsObj.setOption(option)
    });
}
var G33success = function(res, chartsObj, panelId) {
    var data = formatData(res.data);
    var len = res.data.length;
    var legend = [];
    var valueArr = {};
    var numArr = {};
    var timeList = [];
    var seriesList = [];
    var reportTimePeriodType = $("#"+panelId).values().reportTimePeriodType
    var reportYear = $("#"+panelId).values().reportYear
    if (len > 0) {
        var detailList = data[len - 1].detailList;
        detailList.forEach(function(item) {
            legend.push(item.name);
            valueArr[item.name] = Array.apply(null, Array(data.length)).map(function(item, i) {
                return {}
            })

        })

    }
    for (var i = 0; i < data.length; i++) {
        var ref = data[i];
        if(reportTimePeriodType == 1 || reportTimePeriodType == 2){
            if(!reportYear){
               timeList.push(ref.year + "年" + ref.month + "月" + ref.day + "日");  
            }else{
               timeList.push(ref.month + "月" + ref.day + "日");    
            }
        }else if(reportTimePeriodType == 3){
            if(!reportYear){
                timeList.push(ref.year + "年" + ref.month + "月"); 
            }else{
                timeList.push(ref.month + "月"); 
            }
        }
        ref.detailList.forEach(function(item) {
            valueArr[item.name][i].value = item.amount;
            valueArr[item.name][i].sum = item.AmtSum;
            // valueArr[item.name][i].num = item.num;
        })
    }
    legend.forEach(function(item) {
        seriesList.push({
            smooth:true,
            name: item,
            type: 'line',
            data: valueArr[item]
        })
    })
    var dataZoomStart = 0
    var dataZoomEnd = len - 1
    if(len > 10 && (reportTimePeriodType == 1 || reportTimePeriodType == 2)){
        dataZoomStart = len - 10
    }
    chartsObj.setOption({
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return '<div class="background:white;borderRadius" style="padding: 5px ;margin: -5px;border: 2px solid ' + params.color + '; min-width: 120px;font-size: 12px;color: ' + params.color + ';">' + params.seriesName + '：' + params.data.sum + '万元<div style="border-top: 1px solid ' + params.color + ';margin: 3px -5px;"></div>' + params.value + '笔' + '</div>';
            },
            backgroundColor: 'rgba(255,255,255,0.9)',
        },
        xAxis: [{
                type: 'category',
                boundaryGap: false,
                min: 0,
                show: true,
                data: timeList,
                offset:20,
                axisLabel: {
                    color: "#666"
                }
            }

        ],
        series: seriesList,
        legend: {
            data: ["征信申请", "征信通过", "贷款申请", "审批通过", "放款成功"],
            padding: [5, 5, 5, 20],
            itemHeight: 8,
            itemWidth: 12
        },  
        dataZoom:[
            {
                type: 'inside',
                startValue: dataZoomStart,
                endValue: dataZoomEnd,
                filterMode: 'empty'
            },
        ]
    })
    chartsObj.off('click');
}
var G44success = function(res, chartsObj, panelId) {
    var data = res.data.detailList
    var numTotal = res.data.numTotal
    var legendData = [],
        seriesData = [];
    data.forEach(function(item) {
        legendData.push(item.name);
        seriesData.push({ name: item.name, value: item.businessNum, num: item.businessAmt })
    })
    res.data.numTotal = getTotal(chartsObj,seriesData,res.data.numTotal)
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return '<div class="borderRadius" style="padding: 5px ;margin: -5px;border: 2px solid ' + params.color + '; min-width: 120px;font-size: 12px;color: ' + params.color + ';">' + params.name + '：' + params.data.num + '万元<div style="border-top: 1px solid ' + params.color + ';margin: 3px -5px;"></div>' + params.value + '笔  <span class=" borderRadius" style="color: #fff;font-size:12px;padding:1px 3px;background-color:' + params.color + ' "> ' + params.percent + '% </span>' + '</div>';
            },
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderColor: '#37A2DA',
            borderWidth: 0,
            textStyle: {
                color: '#37A2DA'
            }
        },
        title: {
            text: Math.abs(res.data.numTotal),
            textStyle: {
                color: '#333',
                fontSize:"28"
            },
            subtext: '笔',
            subtextStyle: {
                color: '#999',
                fontSize: 14
            },
            top: '45%'
        },
        series: [{
            data: seriesData

        }],
        legend: {
            data: legendData
        }
    }
    chartsObj.setOption(option)
    chartsObj.off('click');
    chartsObj.off('legendselectchanged')
    chartsObj.on('legendselectchanged', function(obj) {
        var changeTotal = numTotal 
        for(var key in obj.selected){
            if(obj.selected[key] == false){
                seriesData.forEach(function(item){
                    if(item.name == key){
                        changeTotal = changeTotal - item.value
                    }
                })
            }
        }
        option.title.text = changeTotal
        chartsObj.setOption(option)
    });
}
var G44success2 = function(res, chartsObj, panelId) {
    var data = res.data.detailList
    var numTotal = res.data.total
    var legendData = [],
        seriesData = [];
    data.forEach(function(item) {
        legendData.push(item.name);
        seriesData.push({ name: item.name, value: item.businessAmt, num: item.businessNum })
    })
    res.data.total = getTotal(chartsObj,seriesData,res.data.total)
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return '<div class="borderRadius" style="padding: 5px ;margin: -5px;border: 2px solid ' + params.color + '; min-width: 120px;font-size: 12px;color: ' + params.color + ';">' + params.name + '：' + params.data.num + '笔<div style="border-top: 1px solid ' + params.color + ';margin: 3px -5px;"></div>' + params.value + '万元  <span class=" borderRadius" style="color: #fff;font-size:12px;padding:1px 3px;background-color:' + params.color + ' "> ' + params.percent + '% </span>' + '</div>';
            },
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderColor: '#37A2DA',
            borderWidth: 0,
            textStyle: {
                color: '#37A2DA'
            }
        },
        title: {
            text: Math.abs(res.data.total).toFixed(2),
            textStyle: {
                color: '#333',
                fontSize:"28"
            },
            subtext: '万',
            subtextStyle: {
                color: '#999',
                fontSize: 14
            },
            top: '45%'
        },
        series: [{
            data: seriesData

        }],
        legend: {
            data: legendData
        }
    }
    chartsObj.setOption(option)
    chartsObj.off('click');
    chartsObj.off('legendselectchanged')
    chartsObj.on('legendselectchanged', function(obj) {
        var changeTotal = numTotal 
        for(var key in obj.selected){
            if(obj.selected[key] == false){
                seriesData.forEach(function(item){
                    if(item.name == key){
                        changeTotal = changeTotal - item.value
                    }
                })
            }
        }
        option.title.text = Math.abs(changeTotal).toFixed(2)
        chartsObj.setOption(option)
    });
}
var G55success = function(res, chartsObj, panelId) {
    var data = res.data.statisticsList
    var numTotal = res.data.creditSubmitNumTotal
    var legendData = [],
        seriesData = [];
    data.forEach(function(item) {
        legendData.push(item.agencyShortName);
        seriesData.push({ name: item.agencyShortName, value: item.creditSubmitNum, num: "--" })
    })
    res.data.creditSubmitNumTotal = getTotal2(chartsObj,seriesData,res.data.creditSubmitNumTotal)
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return '<div class="borderRadius" style="padding: 5px ;margin: -5px;border: 2px solid ' + params.color + '; min-width: 120px;font-size: 12px;color: ' + params.color + ';">' + params.name + '：' + params.data.num + '万元<div style="border-top: 1px solid ' + params.color + ';margin: 3px -5px;"></div>' + params.value + '笔  <span class=" borderRadius" style="color: #fff;font-size:12px;padding:1px 3px;background-color:' + params.color + ' "> ' + params.percent + '% </span>' + '</div>';
            },
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderColor: '#37A2DA',
            borderWidth: 0,
            textStyle: {
                color: '#37A2DA'
            }
        },
        title: {
            text: Math.abs(res.data.creditSubmitNumTotal),
            textStyle: {
                color: '#333',
                fontSize:"28"
            },
            subtext: '笔',
            subtextStyle: {
                color: '#999',
                fontSize: 14
            },
            top: '45%'
        },
        series: [{
            data: seriesData,
        }],
        legend: {
            top:"center",
            type:"scroll",
            height: 200,
            formatter:function(name){
                if(name.length > 3){
                    return name.substr(0,3) + "..."
                }
                return name
            },
            tooltip:{
                show:true
            },
            data: legendData,
        }
    }
    chartsObj.setOption(option)
    chartsObj.off('click');
    chartsObj.off('legendselectchanged')
    chartsObj.on('legendselectchanged', function(obj) {
        var changeTotal = numTotal 
        for(var key in obj.selected){
            if(obj.selected[key] == false){
                seriesData.forEach(function(item){
                    if(item.name == key){
                        changeTotal = changeTotal - item.value
                    }
                })
            }
        }
        option.title.text = changeTotal
        chartsObj.setOption(option)
    });
}
var G55success2 = function(res, chartsObj, panelId) {
    var data = res.data.statisticsList
    var numTotal = res.data.loanApplyNumTotal
    var legendData = [],
        seriesData = [];
    data.forEach(function(item) {
        legendData.push(item.agencyShortName);
        seriesData.push({ name: item.agencyShortName, value: item.loanApplyNum, num: item.loanApplyAmt })
    })
    res.data.loanApplyNumTotal = getTotal2(chartsObj,seriesData,res.data.loanApplyNumTotal)
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return '<div class="borderRadius" style="padding: 5px ;margin: -5px;border: 2px solid ' + params.color + '; min-width: 120px;font-size: 12px;color: ' + params.color + ';">' + params.name + '：' + params.data.num + '万元<div style="border-top: 1px solid ' + params.color + ';margin: 3px -5px;"></div>' + params.value + '笔  <span class=" borderRadius" style="color: #fff;font-size:12px;padding:1px 3px;background-color:' + params.color + ' "> ' + params.percent + '% </span>' + '</div>';
            },
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderColor: '#37A2DA',
            borderWidth: 0,
            textStyle: {
                color: '#37A2DA'
            }
        },
        title: {
            text: Math.abs(res.data.loanApplyNumTotal),
            textStyle: {
                color: '#333',
                fontSize:"28"
            },
            subtext: '笔',
            subtextStyle: {
                color: '#999',
                fontSize: 14
            },
            top: '45%'
        },
        series: [{
            data: seriesData,
        }],
        legend: {
            top:"center",
            type:"scroll",
            height: 200,
            formatter:function(name){
                if(name.length > 3){
                    return name.substr(0,3) + "..."
                }
                return name
            },
            tooltip:{
                show:true
            },
            data: legendData,
        }
    }
    chartsObj.setOption(option)
    chartsObj.off('click');
    chartsObj.off('legendselectchanged')
    chartsObj.on('legendselectchanged', function(obj) {
        var changeTotal = numTotal 
        for(var key in obj.selected){
            if(obj.selected[key] == false){
                seriesData.forEach(function(item){
                    if(item.name == key){
                        changeTotal = changeTotal - item.value
                    }
                })
            }
        }
        option.title.text = changeTotal
        chartsObj.setOption(option)
    });
}
var G55success3 = function(res, chartsObj, panelId) {
    var data = res.data.statisticsList
    var numTotal = res.data.bankPaymentNumTotal
    var legendData = [],
        seriesData = [];
    data.forEach(function(item) {
        legendData.push(item.agencyShortName);
        seriesData.push({ name: item.agencyShortName, value: item.bankPaymentNum, num: item.bankPaymentAmt })
    })
    res.data.bankPaymentNumTotal = getTotal2(chartsObj,seriesData,res.data.bankPaymentNumTotal)
    var option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                return '<div class="borderRadius" style="padding: 5px ;margin: -5px;border: 2px solid ' + params.color + '; min-width: 120px;font-size: 12px;color: ' + params.color + ';">' + params.name + '：' + params.data.num + '万元<div style="border-top: 1px solid ' + params.color + ';margin: 3px -5px;"></div>' + params.value + '笔  <span class=" borderRadius" style="color: #fff;font-size:12px;padding:1px 3px;background-color:' + params.color + ' "> ' + params.percent + '% </span>' + '</div>';
            },
            backgroundColor: 'rgba(255,255,255,0.9)',
            borderColor: '#37A2DA',
            borderWidth: 0,
            textStyle: {
                color: '#37A2DA'
            }
        },
        title: {
            text: Math.abs(res.data.bankPaymentNumTotal),
            textStyle: {
                color: '#333',
                fontSize:"28"
            },
            subtext: '笔',
            subtextStyle: {
                color: '#999',
                fontSize: 14
            },
            top: '45%'
        },
        series: [{
            data: seriesData,
        }],
        legend: {
            top:"center",
            type:"scroll",
            height: 200,
            formatter:function(name){
                if(name.length > 3){
                    return name.substr(0,3) + "..."
                }
                return name
            },
            tooltip:{
                show:true
            },
            data: legendData,
        }
    }
    chartsObj.setOption(option)
    chartsObj.off('click');
    chartsObj.off('legendselectchanged')
    chartsObj.on('legendselectchanged', function(obj) {
        var changeTotal = numTotal 
        for(var key in obj.selected){
            if(obj.selected[key] == false){
                seriesData.forEach(function(item){
                    if(item.name == key){
                        changeTotal = changeTotal - item.value
                    }
                })
            }
        }
        option.title.text = changeTotal
        chartsObj.setOption(option)
    });
}

//所需颜色数组
var defaultColor = [
	'#5A8CFF','#FF9B43','#FF8E8E','#1ECEAA','#668ace','#61b2e7','#80c8fb','#a3cdeb','#32c3ad','#369984','#fc8279',
	'#fea281','#ffd297','#3fbbba','#68d8d7','#67bdbe','#19a0a2','#fdb658'	
]
var colorArr = [
	'#5A8CFF','#FF9B43','#FF8E8E','#1ECEAA','#668ace','#61b2e7','#80c8fb','#a3cdeb','#32c3ad','#369984','#fc8279',
	'#fea281','#ffd297','#3fbbba','#68d8d7','#67bdbe','#19a0a2','#fdb658'	
]

//参数container为图表盒子节点.charts为图表节点
//图表的自适应
function chartssize(container, charts) {
    function getStyle(el, name) {
        if (window.getComputedStyle) {
            return window.getComputedStyle(el, null);
        } else {
            return el.currentStyle;
        }
    }

    var wi = getStyle(container, 'width').width;
    var hi = getStyle(container, 'height').height;
    charts.style.width = wi;
    charts.style.height = hi;
}

window.onresize = function() {
    //自动化canvas的大小
    var chartBox = document.getElementsByClassName('chart-box');
    for (var i = 0, len = chartBox.length; i < len; i++) {
        var item = chartBox[i];
        var myChartsize = item.children[0].children[0];
        if(myChartsize){
            var canvas = item.children[0].children[0].children[0];
            chartssize(item, myChartsize);
            chartssize(item, canvas); 
        }
    }
}


//图表放大的方法
function enlarge(title, url, panelId, paramsObj) {
    var $form = $('#' + panelId).values();
    var search = $.extend($form, paramsObj);
    search.title = title;
    search.level = level;
    comn.addTab({
        title: title,
        href: url + '?' + comn.argString(search)
    })
}

//更新图表的方法
function updateCharts(chartsObj, $form, url, sliderG, panelId, success) {
    //参数1：echarts的图表对象 参数2：包裹上传参数的表单父元素 参数3：获取数据的接口地址 参数4：自定义创建的slider滑块
    if (!url) {
        return;
    }
    var search = $form.values();
    var $checkboxs = $form.find('[type="checkbox"]:checked');
    var checkboxsVal = {};
    if ($checkboxs.length > 0) {
        $checkboxs.each(function(index, item) {
            checkboxsVal[$(this).attr('name')] = checkboxsVal[$(this).attr('name')] ? checkboxsVal[$(this).attr('name')] + ',' + $(this).val() : $(this).val()
        })
    }
    for (var key in checkboxsVal) {
        search[key] = checkboxsVal[key];
    }
    comn.ajax({
        url: url,
        type: 'POST',
        data: search,
        success: function(res) {
            success(res, chartsObj, panelId);
        }
    })
}

//更新饼形图的表格
function updateTable(data, panelId, colorArr) {
    //只应用于饼形图
    var $table = $('#' + panelId).next();
    var trList = '';
    var total = 0;
    data.forEach(function(item) {
        total += item.value * 1;
    })
    for (var i = 0, len = data.length; i < len; i++) {
        var item = data[i];
        var name = '<div class="table-dot" style="background-color:' + colorArr[i] + '"></div>&emsp;' + item.name;
        var arr = [name, item.value];
        if (item.num) {
            arr.push(item.num);
        }
        arr.push((item.value * 100 / total).toFixed(2) + '%');
        trList += '<tr><td>' + arr.join('</td><td>') + '</td></tr>'
    }
    $table.children('tbody').html(trList);
}

//滑块自定义位置
function sliderInit(panelId, url, myChart, $form, successFunction, starTime, endTime,successFunction2) {
    var slider;
    var data = $form.values();
    var year = new Date().getFullYear();
    if (starTime && endTime) {
        slider = new MonthSlider('#' + panelId, starTime, endTime, url, myChart, successFunction,successFunction2);
        return slider;
    }
    if (year < data.year) {
        slider = new MonthSlider('#' + panelId, 1, 12, url, myChart, successFunction,successFunction2);
    } else {
        var month = new Date().getMonth() + 1;
        if (month === 1) {
            slider = new MonthSlider('#' + panelId, 1, 1, url, myChart, successFunction,successFunction2);
        } else {
            slider = new MonthSlider('#' + panelId, month, month, url, myChart, successFunction,successFunction2);
        }
    }
    return slider;

}

//myChart.clear();            //清空原来的图表

//生成图表的方法
function setChartBin(setting, myChartId, url, successFunction, successFunction2, successFunction3, startTime, endTime) {
    var dom = document.getElementById(myChartId);
    var myChart = echarts.init(dom);
    var optionBin = {
        color: defaultColor,
        textStyle: {
            fontFamily: 'SourceHanSansSC-Regular',
        },
        title: {
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c}笔 ({d}%)",
            backgroundColor: 'rgba(255,255,255,0.9)',
            //borderColor: '#37A2DA',
            borderWidth: 0,
            textStyle: {
                color: '#37A2DA'
            }
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 10,
            top: "35%",
            //bottom: 120,
            data: [],
            height: 257,
            textStyle: {
                color: "#666",
                fontSize: "14"
            }
        },
        series: [{
            name: '姓名',
            type: 'pie',
            radius: ['45%', '60%'],
            center: ['50%', '50%'],
            label: {
                normal: {
                    show: false
                }
            },
            data: [],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    if (setting) {
        var setting = $.extend({}, optionBin, setting);
    } else {
        var setting = $.extend({}, optionBin);
    }
    myChart.setOption(setting);
    myChart.on('click', function() {
        return;
    })
    var $form = $(dom).closest(".panel-body");
    var panelId = $(dom).closest(".panel").attr('id');
    //初始化滑块
    var slider = sliderInit(panelId, url, myChart, $form, successFunction, startTime, endTime, successFunction2);
    if(myChartId == "chartG55"){
        updateCharts(myChart, $form, url, slider, panelId, successFunction3)
    }else{
        updateCharts(myChart, $form, url, slider, panelId, successFunction)
    }
    $form.find(':input').change(function() {
        if($(this).attr("name") == "year"){
            var value = $(this).parents(".rt").siblings(".radioBox").find("input:checked").val()
            if(value == 0){
                updateCharts(myChart, $form, url, slider, panelId, successFunction)
            }else if(value == 1){
                updateCharts(myChart, $form, url, slider, panelId, successFunction2)
            }else if(value == 2){
                updateCharts(myChart, $form, url, slider, panelId, successFunction3)
            }
        }
        else if($(this).attr("name") == "test5"){
            if($(this).val() == 0){
                updateCharts(myChart, $form, url, slider, panelId, successFunction)
            }else if($(this).val() == 1){
                updateCharts(myChart, $form, url, slider, panelId, successFunction2)
            }else{
                updateCharts(myChart, $form, url, slider, panelId, successFunction3)
            }
        }
        else{
            if($(this).val() == 0){
                updateCharts(myChart, $form, url, slider, panelId, successFunction)
            }else{
                updateCharts(myChart, $form, url, slider, panelId, successFunction2)
            }
        }
    })
        //resize
    $(window).resize(function() {
        myChart.resize();
    })
    return myChart
}

function setChartLine(setting, myChartId, url, successFunction) {
    var dom = document.getElementById(myChartId);
    var myChart = echarts.init(dom);
    var optionLine = {
        color: defaultColor,
        textStyle: {
            fontFamily: 'SourceHanSansSC-Regular',
        },
        grid:{
            height:'250',
            width:"75%",
            borderWidth:"10"
        },
        title: {
            text: '笔数（笔）',
            textStyle: {
                fontWeight: 'normal',
                fontSize: 12,
                color: '#aaa'
            },
            left:45,
            top:20
        },
        tooltip: {
            trigger: 'item',
        },
        legend: {
            type: 'scroll',
            orient: 'vertical',
            right: 20,
            top: "35%",
            height: 257,
            data: [],
            textStyle: {
                color: "#666",
                fontSize: "14"
            }
        },
        dataZoom: [
            {
                type: 'inside',
                start: 0,
                end: 100,
            },
            {
                height:8,
                showDataShadow: false,
                backgroundColor: '#ECECEC',
                borderColor: 'transparent',
                start: 0,
                end: 100,
                bottom:10,
                handleIcon: 'M10.7,11.9H9.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4h1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z', // jshint ignore:line
                handleSize: '180%',
                handleStyle: {
                    color:"#C5CCD5",
                    shadowBlur: 4,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowColor: '#aaa'
                }
            }
        ],
        xAxis: [
            {
                type: 'category',
                boundaryGap: false,
                min: 0,
                show: true,
                axisLine: {
                    lineStyle: {
                        color: '#AAB1B8', // 颜色
                        width: 1 // 粗细
                    }
                },
                data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#AAB1B8', // 颜色
                        width: 1 // 粗细
                    }
                },
                splitLine:{
                    lineStyle: {
                        color: '#ECECEC', // 颜色
                        width: 1 // 粗细
                    }
                },
                axisLabel : {
                    formatter: '{value}',
                    textStyle: {
                        color: '#666'
                    }
                }
            }
        ],
        series: []
    };
    if (setting) {
        var setting = $.extend({}, optionLine, setting);
    } else {
        var setting = $.extend({}, optionLine);
    }
    var $form = $(dom).closest(".panel-body");
    var panelId = $(dom).closest(".panel").attr('id');
    myChart.setOption(setting);
    myChart.on('click', function() {
        return;
    })
    if (url) {
        updateCharts(myChart, $form, url, '', panelId, successFunction)
    }
    $form.find(':input').change(function() {
        updateCharts(myChart, $form, url, '', panelId, successFunction)
    })
    $(window).resize(function() {
        myChart.resize();
    })
    return myChart
}