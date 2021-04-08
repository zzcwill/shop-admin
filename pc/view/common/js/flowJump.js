function flowJump(item, a, currentComn){
    var space = "";
    var flowComn = currentComn || comn
    var flowTip = currentComn ? comn.tip : tip
    switch (item.businessTypeCode) {
        case 'LOAN_APPLY_FLOW':
            space = "LOAN";
            break;
        case 'ESTIMATE_FLOW':
                space = "ESTIMATE";
                break;            
        default:
            space = ""
    }
    //releventFlowInfo=0不是查看流程详情
    space = "&space=" + space + "&releventFlowNode=" + item.currentNodeKey + "&releventFlow=" + item.businessTypeCode + '&releventFlowInfo=0' +'&businessObjectProcessInfoId=' + item.businessObjectProcessInfoId + '&currentNodeName=' + item.currentNodeName
    switch (a) {
        // 征信流程start
        case "CREDIT_START":
            flowTip({ content: '仅APP端操作' })
            break;
        case "CREDIT_AUTHORIZATION_1":
            flowTip({ content: '系统暂时不能查看' })
            break;
        case "CREDIT_AUTHORIZATION_2":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/loanManage/creditManage/creditFlow.html?creditId=" + item.businessId + space
            });				
            break;						
        case "CREDIT_ENTER":
            flowComn.addTab({
            	title: item.currentNodeName,
            	href: "./Modal/loanManage/creditManage/creditFlow.html?creditId=" + item.businessId + space
            });
            break;
        case "CREDIT_DECISION":
            flowTip({ content: '系统暂时不能查看' })
            break;
        case "CREDIT_FINISH":
            flowTip({ content: '系统暂时不能查看' })
            break;
        // 征信流程end


        //业务审批流程start
        case "LOAN_LAUNCH":
            flowTip({ content: '仅APP端操作' });
            break;
        case "LOAN_INTELLIGENT_APPROVAL":
            flowTip({ content: '系统暂时不能查看' });
            break;
        case "LOAN_APPLY_FIRST_APPROVE":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/loanManage/businessManage/businessFlow.html?projectId=" + item.businessId + space
            });
            break;
        case "LOAN_APPLY_FINAL_APPROVE":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/loanManage/businessManage/businessFlow.html?projectId=" + item.businessId + space
            });
            break;
        case "LOAN_CUSTOMER_SIGN":
            flowTip({ content: '系统暂时不能查看' });
            break;
        case "LOAN_PAYMENT_APPLY_APPROVE":
            // flowComn.addTab({
            //     title: item.currentNodeName,
            //     href: "./Modal/loanManage/businessManage/businessFlow.html?projectId=" + item.businessId + space
            // });
            flowTip({ content: '仅APP端操作' });
            break;        
        case "LOAN_FACE_SIGN_EAPPROVE":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/loanManage/businessManage/businessFlowFaceSign.html?projectId=" + item.businessId + space
            });
            break;
        case "LOAN_PAYMENT_FIRST_APPROVE":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/loanManage/businessManage/businessFlow.html?projectId=" + item.businessId + space
            });
            break;
        case "LOAN_PAYMENT_FINAL_APPROVE":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/loanManage/businessManage/businessFlow.html?projectId=" + item.businessId + space
            });
            break;
        case "LOAN_SYSTEM_APPROVE":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/loanManage/businessManage/businessFlow.html?projectId=" + item.businessId + space
            });
            break;
        case "LOAN_DATA_REVIEW":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/loanManage/businessManage/businessFlow.html?projectId=" + item.businessId + space
            });
            break;
        case "LOAN_FINISH":
            flowTip({ content: '系统暂时不能查看' });
            break;																														
        //业务审批流程end

        //诉讼申请流程start
        case "LAUNCH_LAWSUIT":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/loanManage/litigationManage/litigationFlow.html?projectId=" + space + '&lawsuitId='+  item.businessId
            });
            break;
        case "LAWSUIT_APPROVAL":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/loanManage/litigationManage/litigationFlow.html?projectId=" + space + '&lawsuitId=' + item.businessId
            });
            break; 
        case "LAWSUIT_APPROVAL_HEAD":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/loanManage/litigationManage/litigationFlow.html?projectId=" + space + '&lawsuitId='+  item.businessId
            });
            break;                       
        case "LAWSUIT_FINISH":
            flowTip({ content: '系统暂时不能查看' });
            break;            																													
        //诉讼申请流程end     
        
        //准入合作单位管理审批流程start
        case "AGENCY_LAUNCH":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/cooperationUnitManage/cooperationUnit/cooperationUnit.html?cooperationId=" + item.businessId + "&type=2&LIU=1&projectId=" + item.businessId + space
            });
            break; 
        case "AGENCY_FIRST_APPROVE":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/cooperationUnitManage/cooperationUnit/cooperationUnit.html?cooperationId=" + item.businessId + "&type=3&LIU=1&projectId=" + item.businessId + space
            });
            break; 
        case "AGENCY_FINAL_APPROVE":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/cooperationUnitManage/cooperationUnit/cooperationUnit.html?cooperationId=" + item.businessId + "&type=3&LIU=1&projectId=" + item.businessId + space
            });
            break; 
        case "AGENCY_RISK_APPROVE":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/cooperationUnitManage/cooperationUnit/cooperationUnit.html?cooperationId=" + item.businessId + "&type=3&LIU=1&projectId=" + item.businessId + space
            });
            break;
        case "AGENCY_FINANCE_APPROVE":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/cooperationUnitManage/cooperationUnit/cooperationUnit.html?cooperationId=" + item.businessId + "&type=3&LIU=1&projectId=" + item.businessId + space
            });
            break;
        case "AGENCY_FINISH":
            flowComn.addTab({
                title: item.currentNodeName,
                href: "./Modal/cooperationUnitManage/cooperationUnit/cooperationUnit.html?cooperationId=" + item.businessId + "&type=3&LIU=1&projectId=" + item.businessId + space
            });
            break;
        //准入合作单位管理审批流程end

        //押品评估start
        case "ESTIMATE_LAUNCH":
            flowTip({ content: '仅APP端操作' });
            break;            
        case "ORG_SELF_ESTIMATE":
            comn.addTab({
                title: item.currentNodeName,
                href: "./Modal/loanManage/collateralManage/collateralFlow.html?estimateId=" + item.businessId + space
            });
            break;
        case "ESTIMATE_COMPLETE":
            flowTip({ content: '系统暂时不能查看' });
            break;            
        //押品评估end        
    }
}

