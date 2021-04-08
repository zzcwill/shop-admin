//获取当前月-月初
function getNowMonthFirstDay() {
    var t = new Date()
    var year = t.getFullYear()
    var month = t.getMonth() + 1

	if (month < 10) {
		month = '0' + month;
	}
	var time = year + '-' + month + '-' + '01';
	return time;
}

//获取当前月-月末
function getTimeYMD() {
	var t = new Date()
	var y = t.getFullYear()
	var m = t.getMonth() + 1
	var d = t.getDate()
	m = m < 10 ? '0' + m : m
	d = d < 10 ? '0' + d : d
	var str = y + '-' + m + '-' + d
	return str
}


$(function () {
    //dom绑定事件
    //点击待办事件跳转
    $('.functionItem').click(function () {
        var arrFlow = [
            {
                title: '订单查询',
                url: './Modal/orderManage/order/index.html',
            },
            {
                title: '在线决策',
                url: './Modal/onlineManage/online/index.html',
            },
            {
                title: '费用统计',
                url: './Modal/costStatistics/index/index.html',
            },
            {
                title: '黑名单管理',
                url: './Modal/backManage/black/index.html',
            }
        ]
        
        var index = $('.functionItem').index(this);

        var toDoJump = arrFlow[index]
        comn.addTab({
            title: toDoJump.title,
            href: toDoJump.url
        });
    }) 
	$("#bizType").on("change", function () {
        getPieData()
	});
	$("#appId").on("change", function () {
        getPieData()
	});
	$("#startDate").on("change", function () {
        getPieData()
	});
	$("#endDate").on("change", function () {
        getPieData()
	});                

    //首次加载
    $('#startDate').val(getNowMonthFirstDay())
    $('#endDate').val(getTimeYMD())
    $("#bizType").getRiskPro('', function () {
		$('#bizType').selectpicker('refresh');
	});
    $("#appId").getRiskObj('', function () {
		$('#appId').selectpicker('refresh');
	}); 
})

function getPieChart(arrData) {
    var chartDom = document.getElementById('pieChartOne');
    var myChart = echarts.init(chartDom);
    var colorPieArr = ['#28D3C1' ,'#FF8989' ,'#FFBD3E' ,'#AEA8F0']

    for(var key = 0  ; key < arrData.length ; key++) {
        arrData[key] = {
            value: arrData[key].value, 
            name:  arrData[key].name,
            itemStyle: {
                color: colorPieArr[key]
            }
        }
    }  

    var option = {
        legend: {
            top: 'bottom'
        },
        tooltip: {
            axisPointer: {
              lineStyle: {
                color: '#FFF'
              }
            },
            trigger: 'item',
            formatter: '{c} ({d}%)'          
          },
          legend: {
            orient: 'vertical',
            top: 150,
            right: 0,
            icon: 'circle',
            itemWidth: 10,
            itemHeight: 10,
            itemGap: 13,
            textStyle: {
              fontSize: 14,
              color: '#333'
            }
          },        
        series: [
            {
                name: '决策流统计',
                type: 'pie',
                radius: '80%',
                labelLine: {
                    show: false
                },
                label: {
                    show: false,
                },                               
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },                
                data: arrData
            }
        ]
    }; 
    
    myChart.setOption(option);
}
function getPieData() {
    var apiData = $("#searchForm").values()

    comn.ajax({
        url: "sys/product/statistics",
        data: apiData,
        success: function (res) {
            var arrData = [
                {value: res.data.passCount, name: '通过'},
                {value: res.data.rejectCount, name: '拒绝'},
                {value: res.data.exceptionCount, name: '异常'},
                {value: res.data.otherCount, name: '未收到结论'},
            ]

            getPieChart(arrData)
        }
    });    
}