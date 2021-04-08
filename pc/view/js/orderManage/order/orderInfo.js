
$(function(){
	var args = comn.getArgs();

	//dom操作

	//首次加载
	// $('#loadReport').getLoad();
	if(args.orderType === 'centerData') {
		$('.nav-tabs li').eq(0).removeClass('hide');
		$('.nav-tabs li a').eq(0).trigger("click");
	}
	if(args.orderType === 'riskData') {
		$('.nav-tabs li').eq(1).removeClass('hide');
		$('.nav-tabs li a').eq(1).trigger("click");		
	}
	if(args.orderType === 'moneyInfo') {
		$('.nav-tabs li').eq(2).removeClass('hide');
		$('.nav-tabs li a').eq(2).trigger("click");		
	}
});