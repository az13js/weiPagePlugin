//删除的id列表
var plugInDelIdList = [];

//微页面响应事件
var weiPageAction = {
		//初始化
		initWeipage:function(initData){
			if(initData){
				initData = weiPageAction.initDataParseFactory(initData);
			}
			weiPage.initWeipage(initData);
			
			weiPage.selectFirstSubPlugIn();
				
			weiPageAction.selectWeipage();
			if(initData && initData.title){
				$(".yui_mobile_head h1").html(initData.title);
			}
			
			initFunctionList();
		},		
		//选中微页面
		selectWeipage:function(){
			if(!plugInFormCheck.doCheck() || !subPlugInFormCheck.doCheck()){
				return;
			}
			
			var weiPageData = weiPage.getWeipage();
			
			weiPage.unSelectPlugIn();
			weiPageView.redrawView();						
			weiPageView.redrawPlugInEdit(weiPageData);
			weiPageView.redrawSubPlugInEdit();
			$("#edit_RTE_wrap").css("display","none");
		},
		//编辑微页面
		editWeipage:function(name,value){
			var obj = {};
			obj[name] = value;
			weiPage.editWeipage(obj);
			if(name == "title"){
				$(".yui_mobile_head h1").html(value);
			}
			var weiPageData = weiPage.getWeipage();
			weiPageView.redrawPlugInEdit(weiPageData);
		},
		//选中插件
		selectPlugIn:function(plugInUuid){		
			weiPage.unSelectPlugIn();
			weiPage.selectPlugIn({plugInUuid:plugInUuid});
					
			weiPageView.redrawView();
			weiPageView.redrawSelect.plugInEdit();
			if(weiPage.selectHasSubPlugIn()){
				weiPageView.redrawSelect.subPlugInEdit();
			}else{
				weiPageView.redrawSubPlugInEdit();
			}			
			
			//富文本打开富文本编辑器
			if(weiPage.getSelectPlugIn().attr("plugIntype") == "RICHTEXT" ){
				$("#edit_RTE_wrap").css("display","block");
			}else{
				$("#edit_RTE_wrap").css("display","none");
			}
		},
		//选中子插件
		selectSubPlugIn:function(param){	
			weiPage.unSelectSubPlugIn();
			weiPage.selectSubPlugIn(param);
			
			weiPageView.redrawSelect.plugIn();		
			weiPageView.redrawSelect.subPlugInEdit();
		},
		//编辑选中插件
		editSelectPlugIn:function(name,value,isdeep){
			var param = {};
			param[name] = value;
			weiPage.editSelectPlugIn(param,isdeep);
			
			weiPageView.redrawSelect.plugIn();	
		},		
		//编辑选中子插件
		editSelectSubPlugIn:function(name,value){
			var param = {};
			param[name] = value;
			weiPage.editSelectSubPlugIn(param);			
			
			weiPageView.redrawSelect.subPlugIn();	
		},
		//删除子插件
		removeSubPlugIn:function(plugInUuid){							
			weiPage.removeSubPlugIn({plugInUuid:plugInUuid});
			
			var subPlugInList = weiPage.getSubPlugInList().val();
			var subPlugInLength = subPlugInList.length;
			if(subPlugInLength > 0){
				var lastPlugInUuid = subPlugInList[subPlugInLength - 1]["plugInUuid"];
				weiPageAction.selectSubPlugIn({plugInUuid:lastPlugInUuid});				
			}else{
				var parentUuid = weiPage.getSelectPlugIn().attr("plugInUuid");
				weiPageAction.selectPlugIn(parentUuid);
			}
		},
		//数据初始化工厂
		initDataParseFactory:function(initData){
			if (!initData){
				return;
			}
			var plugInList = initData.plugInList;
			for(var i = 0; i < plugInList.length;i++){
				if(plugInList[i].plugIntype == "TEXTNAVI" ){
					for(var j = 0; j < plugInList[i].subPlugInList.length;j ++){
						plugInList[i].subPlugInList[j]["btnColor"] = plugInList[i].btnColor;
						plugInList[i].subPlugInList[j]["btnSelectedColor"] = plugInList[i].btnSelectedColor;
					}
				}
			}
			return initData;
		},
};

//微页面事件
var weiPageEvent = {		
		//创建插件
		createPlugIn:function(e){
			if(!plugInFormCheck.doCheck() || !subPlugInFormCheck.doCheck()){
				return;
			}
			
			//获取当前选中插件id
			var nowSelectPlugIn = weiPage.getSelectPlugIn();	
			
			var plugIntype = $(this).attr("data-plugIntype");
			var plugInData = weiPage.createPlugIn(plugIntype);
			var plugInId = plugInData.attr("plugInUuid");
			var plugInIndex = plugInData.index();
			weiPageAction.selectPlugIn(plugInId);
			
			var plugInInitData = weiPageModel[plugIntype].initData;	
			//判断是否需要初始化生成固定量的子插件
			if(plugInInitData["subPlugInNum"]){
				for(var i = 0; i < plugInInitData.subPlugInNum;i++){
					weiPage.createSubPlugIn();
				}
				weiPageAction.selectSubPlugIn(0);		//选中第一个子插件							
			}else{
				weiPageView.redrawSelect.subPlugInEdit();
			}
			
			//将创建的插件排到当前选中插件的前面
			if(nowSelectPlugIn.val()){
				var nowSelectPlugInIndex = nowSelectPlugIn.index();
				nowSelectPlugInIndex ++;
				if(plugInIndex != nowSelectPlugInIndex){
					weiPage.changeSort(weiPage.getPlugInList().attr(),plugInIndex,nowSelectPlugInIndex);
				}			
			}				
			
			weiPageView.redrawView();
			weiPageView.redrawSelect.plugInEdit();
			
			e.stopPropagation();
		},
		//选中插件
		selectPlugIn:function(e){						
			var plugInUuid = $(this).attr("data-plugInUuid");
			weiPageAction.selectPlugIn(plugInUuid);
			
			e.stopPropagation();
		},
		//删除插件
		removePlugIn:function(e){
			var plugInUuid = $(this).attr("data-plugInUuid");
			
			var plugInIdStr = weiPage.getPlugInList().find({plugInUuid:plugInUuid}).attr("plugInIdStr");
			if(plugInIdStr){
				plugInDelIdList.push(plugInIdStr);
			}
			
			weiPage.removePlugIn({plugInUuid:plugInUuid});
			
			var plugInList = weiPage.getPlugInList().val();
			var plugInLength = plugInList.length;
			if(plugInLength > 0){
				var lastPlugInUuid = plugInList[plugInLength - 1]["plugInUuid"];		
				weiPageAction.selectPlugIn(lastPlugInUuid);
			}else{
				weiPageAction.selectWeipage();	
			}	
			
			e.stopPropagation();
		},
		//创建子插件
		createSubPlugIn:function(e){
			if(!plugInFormCheck.doCheck() || !subPlugInFormCheck.doCheck()){
				return;
			}
			
			var plugInData = weiPage.createSubPlugIn();
			weiPageAction.selectSubPlugIn({plugInUuid:plugInData.attr("plugInUuid")});	
			weiPageView.redrawSelect.plugInEdit();
			
			e.stopPropagation();
		},
		//选中子插件
		selectSubPlugIn:function(e){			
			var plugIn = $(this).closest(".plugIn_wrap");
			if(plugIn && plugIn.hasClass("current")){
				var plugInUuid = $(this).attr("data-plugInUuid");
				weiPageAction.selectSubPlugIn({plugInUuid:plugInUuid});	
				
				e.stopPropagation();
			}				
		},
		//删除子插件
		removeSubPlugIn:function(e){			
			var plugInUuid = $(this).attr("data-plugInUuid");			
			
			var plugInIdStr = $(this).attr("data-subPlugInId");
			if(plugInIdStr){
				plugInDelIdList.push(plugInIdStr);
			}
			
			weiPageAction.removeSubPlugIn(plugInUuid);
			
			weiPageView.redrawSelect.plugInEdit();
			
			e.stopPropagation();
		}		
};

//初始化下拉选项列表
function initFunctionList(){
	$.ajax({
		url : weiPageConfig.urlConfig.functionList,
		type : "get",
		data : "",
		dataType : "json",
		success : function(data){
			if(data && data.result){
				//往配置文件里注入functionList
				var plugInConfig = weiPageModel;
				for(var key in plugInConfig){
					if(plugInConfig[key].data.subPlugIn){
						plugInConfig[key].data.subPlugIn["functionList"] = data.list;
					}								
				}													
				weiPage.editAllSubPlugIn({functionList:data.list});
			}
		}
	})
}

$(function(){	
	//选中微页面
	$(".yui_mobile_head").click(weiPageAction.selectWeipage);
	//创建插件
	$(".weipage_nav_list li").click(weiPageEvent.createPlugIn);
	//创建子插件
	$("#subPlugIn_option_form").on("click",".addPlugIn",weiPageEvent.createSubPlugIn);
	//选中插件
	$("#mobilePage").on("click",".plugIn_wrap",weiPageEvent.selectPlugIn);
	//选中子插件
	$("#mobilePage").on("click",".subPlugIn_wrap",weiPageEvent.selectSubPlugIn);
	//删除插件
	$("#plugIn_option_form").on("click",".removePlugIn",weiPageEvent.removePlugIn);		
	//删除子插件
	$("#subPlugIn_option_form").on("click",".removePlugIn",weiPageEvent.removeSubPlugIn);	
	//编辑插件
	$("#plugIn_option_form").on("change","input,select,textarea",function(){
		var value = $(this).val();
		var name = $(this).attr("name");
		
		if($(this).attr("type") == "file"){
			var tempThis = this;
			uploadImageFactory(tempThis,function(res){
				if(weiPage.getSelectPlugIn().data){				
					weiPageAction.editSelectPlugIn(name,res.picKey);
					weiPageAction.editSelectPlugIn("showPicUrl",res.picUrl);
				}else{
					weiPageAction.editWeipage(name,res.picUrl);
				}
			});
		}else{
			//判断是编辑插件还是变成微页面数据
			if(weiPage.getSelectPlugIn().data){		
				
				var plugIntype = weiPage.getSelectPlugIn().attr("plugIntype");
				//当编辑showType判断是否需要修改子插件的数量
				if(name == "showType"){
					var thisPlugInConfig = weiPageModel[plugIntype];
					if(thisPlugInConfig["showTypeControSubPlugInNum"]){
						var subPlugInLength = weiPage.getSelectPlugInChildLength();
						var showTypeSubPlugInLength = thisPlugInConfig.showTypeControSubPlugInNum[value];
						if(subPlugInLength > showTypeSubPlugInLength){
							for(var i = subPlugInLength;i > showTypeSubPlugInLength;i-- ){
								weiPage.unSelectSubPlugIn();
								var deleteData = weiPage.removeSubPlugIn(i-1);
								weiPageAction.selectSubPlugIn(0);
								
								if(deleteData && deleteData["plugInCommonIdStr"]){
									plugInDelIdList.push(deleteData["plugInCommonIdStr"]);
								}
								
							}
						}else if(subPlugInLength < showTypeSubPlugInLength){
							for(var i = subPlugInLength; i < showTypeSubPlugInLength;i++){
								var plugInData = weiPage.createSubPlugIn();
								weiPageAction.selectSubPlugIn({plugInUuid:plugInData.attr("plugInUuid")});	
							}
						}
					}
				}
				
				//判断是否需要深度操作
				var deep;
				if($(this).attr("data-deep-operate")){
					deep = true;
				}
				weiPageAction.editSelectPlugIn(name,value,deep);												
				
			}else{
				weiPageAction.editWeipage(name,value);
			}
			
			//是否需要重绘编辑块
			if($(this).attr("data-redraw-form")){
				weiPageView.redrawSelect.plugInEdit();
				weiPageView.redrawSelect.subPlugInEdit();
			}
		}	
	});
	//编辑子插件
	$("#subPlugIn_option_form").on("change","input,select,textarea",function(){
		var value = $(this).val();
		var name = $(this).attr("name");
		var tempThis = this;
		if($(this).attr("type") == "file"){
			uploadImageFactory(this,function(res){
				weiPageAction.editSelectSubPlugIn(name,res.picKey);
				weiPageAction.editSelectSubPlugIn("showPicUrl",res.picUrl);
				weiPageView.redrawSelect.plugInEdit();
				weiPageView.redrawSelect.subPlugInEdit();
			});
		}else{
			weiPageAction.editSelectSubPlugIn(name,value);
			
			//当为链接functionCode需要连续编辑2个属性
			if(name == "functionCode"){
				var linkType = $(this).find("[value='"+value+"']").attr("data-link");
				weiPageAction.editSelectSubPlugIn("linkType",linkType);
			}
			
			//是否需要重绘编辑块
			if($(this).attr("data-redraw-form")){
				weiPageView.redrawSelect.plugInEdit();
				weiPageView.redrawSelect.subPlugInEdit();
			}
		}	
		
		//打开弹框
		if(name == "functionCode" && (value == "weipage" || value == "product_detail" || value == "product_category" || value == "product_group")){
			openMaskListDialog(value);
		}
		
	});
	//切换子插件
	$("#plugIn_option_form").on("click",".subPlugIn_wrap",function(){
		var plugInUuid = $(this).attr("data-plugInUuid");
		weiPageAction.selectSubPlugIn({plugInUuid:plugInUuid});
		weiPageView.redrawSelect.plugInEdit();
	});
	//在插件操作框中删除子插件
	$("#plugIn_option_form").on("click",".subPlugIn_remove",function(e){
		var plugInUuid = $(this).attr("data-plugInUuid");			
		weiPageAction.removeSubPlugIn(plugInUuid);		
		weiPageView.redrawSelect.plugInEdit();
		
		var plugInIdStr = $(this).attr("data-subPlugInId");
		if(plugInIdStr){
			plugInDelIdList.push(plugInIdStr);
		}
		
		e.stopPropagation();
	});
	
	/*		
	 * 以下是一些特殊事件
	 */
	//重设颜色
	$("#plugIn_option_form").on("click",".resetBtn",function(){
		var form = $(this).closest(".form_one");
		var value = $(this).attr("data-value");
		$(form).find("[type='color']").val(value);
		var name = $(form).find("[type='color']").attr("name");
		if(weiPage.getSelectPlugIn().data){			
			weiPageAction.editSelectPlugIn(name,value);
		}else{
			weiPageAction.editWeipage(name,value);
		}
	});	
	
	//图片上传配置
    $("#plugIn_edit_page").on("click",".upload_image",function(){
	    var file = 	$(this).find(".input_image")[0];
	    file.click();
    });
    //上传图片工厂
    function uploadImageFactory(file,callBackFun){
    		var formData = new FormData();
    		formData.append("image", file["files"][0]);
    		$.ajax({
    			url: weiPageConfig.urlConfig.uploadImage,
    			type: "post",
    			data: formData,
    			dataType: "JSON",
    			contentType: false,
            	processData: false,
            	success: function(res){
    				if(res && res.result){
    					callBackFun(res);
    				}  				
    			}
    		})
    }
    
});