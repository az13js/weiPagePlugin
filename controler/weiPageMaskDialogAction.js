$(function(){
	
	var maskListForm;	 	
	//弹框组件
	var productListDialog = MaskTabDialog({
		title:"商品列表",
		type:"formList"
	});				
	var weipageListDialog = MaskTabDialog({
		title:"微页面列表",
		type:"formList"
	});		
	var classListDialog = MaskTabDialog({
		title:"分类列表",
		type:"formList"
	});		
	var quoteListDialog = MaskTabDialog({
		title:"引用页面列表",
		type:"formList"
	});	
	var moreProductListDialog = MaskTabDialog({
		title:"商品列表",
		type:"formListConfirm"
	});	
	var groupListDialog = MaskTabDialog({
		title:"分组列表",
		type:"formList"
	});	
	var moreGroupListDialog = MaskTabDialog({
		title:"分组列表",
		type:"formListConfirm"
	});
	
	var updatePlugInType = "";		//待修改的插件类型 默认是subPlugIn
	
	
	//打开商品列表对话框
	function openProductListDialog(){
			var tableFormListTemplate = template("mask_formList_head",{});
			productListDialog.build(tableFormListTemplate); 	
	        var tableOptions = {
		            tableId: "pageList", //表格ID
		            url: weiPageConfig.urlConfig.productList, //数据请求的地址
		            pageSize: 5, //单页数量
		            template: "mask_formList_product", //模板ID
		            searchFormId: "mask_tab_search_form", //搜索表单ID
		            requestData:{
	                		orderByName:'onlineTime'
		            }
		    }; 
	        maskListForm = pageTurning(tableOptions);	 	    			
	        productListDialog.open();
	}
	
	//打开微页面列表对话框
	function openWeipageListDialog(){
		var tableFormListTemplate = template("mask_formList_head",{});
		weipageListDialog.build(tableFormListTemplate); 	
        var tableOptions = {
	            tableId: "pageList", //表格ID
	            url: weiPageConfig.urlConfig.weiPageList, //数据请求的地址
	            pageSize: 5, //单页数量
	            template: "mask_formList_weipage", //模板ID
	            searchFormId: "mask_tab_search_form", //搜索表单ID
	            requestData:{
                		orderByName:'onlineTime'
	            }
	    }; 
        maskListForm = pageTurning(tableOptions);	 	    			
        weipageListDialog.open();
	}
	
	//打开分类列表对话框
	function openCategoryListDialog(){
		var tableFormListTemplate = template("mask_formList_head",{});
		classListDialog.build(tableFormListTemplate); 	
        var tableOptions = {
	            tableId: "pageList", //表格ID
	            url: weiPageConfig.urlConfig.categoryList, //数据请求的地址
	            pageSize: 5, //单页数量
	            template: "mask_formList_category", //模板ID
	            searchFormId: "mask_tab_search_form", //搜索表单ID
	            requestData:{
                		
	            }
	    }; 
        maskListForm = pageTurning(tableOptions);	 	    			
        classListDialog.open();
	}
	
	//打开引用页面对话框
	function openQuoteListDialog(){
		var tableFormListTemplate = template("mask_formList_head",{});
		quoteListDialog.build(tableFormListTemplate); 	
        var tableOptions = {
	            tableId: "pageList", //表格ID
	            url: weiPageConfig.urlConfig.weiPageList, //数据请求的地址
	            pageSize: 5, //单页数量
	            template: "mask_formList_quote", //模板ID
	            searchFormId: "mask_tab_search_form", //搜索表单ID
	            requestData:{
                		orderByName:'onlineTime'
	            }
	    }; 
        maskListForm = pageTurning(tableOptions);	 	    			
        quoteListDialog.open();
	}
	
	//打开多选商品列表对话框
	function openMoreProductListDialog(){
			var tableFormListTemplate = template("mask_formList_head",{});
			moreProductListDialog.build(tableFormListTemplate); 
			moreProductListDialog.setCloseDialogCallback(function(){
				selectSubPlugInList = [];
			});
	        var tableOptions = {
		            tableId: "pageList", //表格ID
		            url: weiPageConfig.urlConfig.productList, //数据请求的地址
		            pageSize: 5, //单页数量
		            template: "mask_formList_product_more", //模板ID
		            searchFormId: "mask_tab_search_form", //搜索表单ID
		            requestData:{
	                		orderByName:'onlineTime'
		            }
		    }; 
	        maskListForm = pageTurning(tableOptions);	 	    			
	        moreProductListDialog.open();
	}
	
	//打开分组商品列表对话框
	function openGroupListDialog(){
		var tableFormListTemplate = template("mask_formList_head",{});
		groupListDialog.build(tableFormListTemplate);
		var tableOptions = {
	            tableId: "pageList", //表格ID
	            url: weiPageConfig.urlConfig.groupList, //数据请求的地址
	            pageSize: 5, //单页数量
	            template: "mask_formList_group", //模板ID
	            searchFormId: "mask_tab_search_form", //搜索表单ID
	            requestData:{
                		
	            }
	    }; 
        maskListForm = pageTurning(tableOptions);	 	    			
        groupListDialog.open();
	}
	
	//打开多选分组商品列表对话框
	function openMoreGroupListDialog(){
		var tableFormListTemplate = template("mask_formList_head",{});
		moreGroupListDialog.build(tableFormListTemplate); 
		moreGroupListDialog.setCloseDialogCallback(function(){
			selectSubPlugInList = [];
		});
		var tableOptions = {
	            tableId: "pageList", //表格ID
	            url: weiPageConfig.urlConfig.groupList, //数据请求的地址
	            pageSize: 5, //单页数量
	            template: "mask_formList_group_more", //模板ID
	            searchFormId: "mask_tab_search_form", //搜索表单ID
	            requestData:{
                		
	            }
	    }; 
        maskListForm = pageTurning(tableOptions);	 	    			
        moreGroupListDialog.open();
	}
	
	//搜索
	 $("#mask_tab_wrap_content").on("click",".mask_tab_search_btn",function(){
		 maskListForm.search();
	 });	
	
	//列表确定选择
	$("#mask_tab_wrap_content").on("click",".select_button",function(){
		var type = $(this).attr("data-type");
		var tableTr = $(this).closest("tr");
		var selectId = $(tableTr).attr("data-id");
		var selectTitle = $(tableTr).attr("data-title");

		if(type == "quote"){
			weiPageAction.editSelectPlugIn("relatedWeiPageIdStr",selectId);
			weiPageAction.editSelectPlugIn("relatedWeiPageTitle",selectTitle);
			weiPageView.redrawSelect.plugInEdit();
			
			quoteListDialog.close();
		}else if(updatePlugInType == "plugIn"){
			weiPageAction.editSelectPlugIn("buizId",selectId);
			weiPageAction.editSelectPlugIn("buizName",selectTitle);
		}else{
			weiPageAction.editSelectSubPlugIn("buizId",selectId);
			weiPageAction.editSelectSubPlugIn("buizName",selectTitle);						
		}	
		
		if(type == "product_detail"){
			var picKey = $(tableTr).attr("data-picKey");
			var picUrl = $(tableTr).attr("data-picUrl");
			weiPageAction.editSelectSubPlugIn("picKey",picKey);
			weiPageAction.editSelectSubPlugIn("showPicUrl",picUrl);	
			
			productListDialog.close();
		}else if (type == "weiPage"){
			weipageListDialog.close();
		}else if (type == "product_category"){
			classListDialog.close();
		}else if(type == "product_group"){
			groupListDialog.close();
		}
		
		if(updatePlugInType == "plugIn"){
			weiPageView.redrawSelect.plugInEdit();
		}else{
			weiPageView.redrawSelect.subPlugInEdit();
		}
		
		
	});
	
	//商品批量选取
	var selectSubPlugInList = [];
	//多选商品选择
	$("#mask_tab_wrap_content").on("click",".product_checked_button",function(){
		$(this).css("display","none");
		var tableTr = $(this).closest("tr");
		$(tableTr).find(".cancel_button").css("display","inline-block");
		
		var productBean = JSON.parse(JSON.stringify(weiPageModel.SHOP.data.subPlugIn));
		productBean["productIdStr"] = $(tableTr).attr("data-id");
		productBean["title"] = $(tableTr).attr("data-title");
		productBean["showPicUrl"] = $(tableTr).attr("data-picUrl");
		productBean["price"] = $(tableTr).attr("data-price");
		productBean["originalPrice"] = $(tableTr).attr("data-originalPrice");
		
		selectSubPlugInList.push(productBean);
	});
	//多选商品取消选择
	$("#mask_tab_wrap_content").on("click",".product_cancel_button",function(){
		$(this).css("display","none");
		var tableTr = $(this).closest("tr");
		$(tableTr).find(".checked_button").css("display","inline-block");
		var productIdStr = $(tableTr).attr("data-id");
		for(var i = selectSubPlugInList.length-1; i >= 0; i++ ){
			if(selectSubPlugInList[i].productIdStr == productIdStr){
				selectSubPlugInList.splice(i,1);
				break;
			}
		}
	});
	//多选分组确定选择
	$("#mask_tab_wrap_content").on("click",".group_checked_button",function(){
		$(this).css("display","none");
		var tableTr = $(this).closest("tr");
		$(tableTr).find(".cancel_button").css("display","inline-block");
		
		var productBean = JSON.parse(JSON.stringify(weiPageModel.PRODUCT_GROUP.data.subPlugIn));
		productBean["name"] = $(tableTr).attr("data-title");
		productBean["buizId"] = $(tableTr).attr("data-id");
		productBean["buizName"] = $(tableTr).attr("data-title");
		
		selectSubPlugInList.push(productBean);
	});
	//多选分组取消选择
	$("#mask_tab_wrap_content").on("click",".group_cancel_button",function(){
		$(this).css("display","none");
		var tableTr = $(this).closest("tr");
		$(tableTr).find(".checked_button").css("display","inline-block");
		var buizId = $(tableTr).attr("data-id");
		for(var i = selectSubPlugInList.length-1; i >= 0; i++ ){
			if(selectSubPlugInList[i].buizId == buizId){
				selectSubPlugInList.splice(i,1);
				break;
			}
		}
	});	
	//最终统一确定
	$("#mask_tab_wrap_content").on("click",".mask_confirm_btn",function(){
		if(selectSubPlugInList.length > 0){
			var subPlugInList = weiPage.getSubPlugInList().val();
			for(var i = subPlugInList.length - 1; i >= 0;i-- ){
				var subPlugIn = subPlugInList[i];
				if(subPlugIn.productIdStr != undefined && !subPlugIn.productIdStr){
					weiPage.removeSubPlugIn({plugInUuid:subPlugIn.plugInUuid});
				}			
			}
			
			//批量新增
			for(var i = 0;i < selectSubPlugInList.length; i++){
				weiPage.createSubPlugIn(selectSubPlugInList[i]);
			}
			weiPage.unSelectSubPlugIn();
			weiPage.selectSubPlugIn(0);
			
			weiPageView.redrawSelect.plugIn();
			weiPageView.redrawSelect.plugInEdit();		
			weiPageView.redrawSelect.subPlugInEdit();
		}
		
		selectSubPlugInList = [];
		
		moreProductListDialog.close();
		moreGroupListDialog.close();
	});
	
	
	//启动弹框
	$("#plugIn_edit_page").on("click",".option_blue_btn",function(){
		var type = $(this).attr("data-type");
		
		openMaskListDialog(type);
		
		if($(this).attr("data-plugIn")){
			updatePlugInType = $(this).attr("data-plugIn");
		}else{
			updatePlugInType = "subPlugIn";
		}
	});
	
	//新增商品
	$("#plugIn_edit_page").on("click",".add_product",function(){
		openMoreProductListDialog();
	});
	
	//新增分组
	$("#plugIn_edit_page").on("click",".add_group",function(){
		openMoreGroupListDialog();
	});
	
	//打开弹框
	window.openMaskListDialog =  function(type){
		if(type == "product_detail"){
			openProductListDialog();
		}else if (type == "weipage"){
			openWeipageListDialog();
		}else if (type == "product_category"){
			openCategoryListDialog();
		}else if(type == "quote"){
			openQuoteListDialog();
		}else if(type == "product_group"){
			openGroupListDialog();
		}
		
		updatePlugInType = "subPlugIn";
	}	
	
});