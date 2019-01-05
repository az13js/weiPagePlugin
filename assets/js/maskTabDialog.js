(function(){
/*
 *  初始化参数
 *  title 对话框标题
 *  type 对话框类型 （normal/formList/notFoot）默认为normal
 *  btnTrueText 确定按钮文字（可选参数）
 *  successCallback 点击确定回调		【等同于使用setSuccessCallback()方法】
 *  closeDialogCallback 点击关闭弹窗回调			【等同于使用setCloseDialogCallback()方法】
 *  donnotClearInput 为true时关闭对话框不清除数据（可选参数）
 *  
 *  使用方法
 *  build（tempHtmlStr）创建对话框，参数为对话框内容的html字符串
 *  open（）打开对话框
 *  close（）关闭对话框
 *  praiseData() 初始化数据，用于编辑的时候 参数为key-value格式的object
 *  setSuccessCallback() 设置确认回调
 *  setCloseDialogCallback() 设置关闭窗口的回调
 *  getPraiseData() 获取表单数据 返回key-value格式对象
 *  setSuccessAjaxCallback() setSuccessCallback的简便方法
 * */		
		
	
		var maskTabDialog = function(options){
			this.option = options;
			
			this.wrapPage = undefined;
			this.outerPage = undefined;
			
			this.successCallback=undefined;
			this.closeDialogCallback=undefined;
			this.resultClearInput = true;
			
			this.enqueueData = {};	//存储在队列中的数据
		}
		
		maskTabDialog.prototype.init = function(){
			this.wrapPage = $(".mask_tab_wrap");
			this.outerPage = $(this.wrapPage).find(".tab_outer_page");
			
			if(this.option.successCallback){
				this.successCallback = this.option.successCallback;
			}
			if(this.option.closeDialogCallback){
				this.closeDialogCallback = this.option.closeDialogCallback;
			}
			if(this.option.donnotClearInput){
				this.resultClearInput = false;
			}
			if(this.option.type){
				this.dialogType = this.option.type;
			}else{
				this.dialogType = "normal";
			}
			
			this.bindEvent();
		};
		
		maskTabDialog.prototype.build = function(tempHtmlStr){
			var maskCommonId = "";
			switch(this.dialogType){
				case 'normal':maskCommonId = "mask_common_normal";break;
				case 'formList':maskCommonId = "mask_common_formList";break;
				case 'formListConfirm':maskCommonId = "mask_common_formList_confirm";break;
				case 'notFoot':maskCommonId = "mask_common_notFoot";break;
				default:maskCommonId = "mask_common_normal";
			}
			
			var commonHtml = template(maskCommonId,this.option);
			var dialogHtml = commonHtml + tempHtmlStr;
			this.inner(dialogHtml);
			return this;
		};
		
		maskTabDialog.prototype.inner = function(tempHtml){
			$(this.outerPage).find(".tab_content").html(tempHtml);
		};
		
		maskTabDialog.prototype.open = function(){
			$(this.wrapPage).css("display","block");
		};
		
		maskTabDialog.prototype.close = function(){
			$(this.wrapPage).css("display","none");
			if(this.resultClearInput){
				this.clearInput();
			}
		};
		
		maskTabDialog.prototype.bindEvent = function(tempThis){
			var that = tempThis || this;
			$(this.outerPage).on("click",".tab_true_btn",function(){
				if(that.successCallback){
					that.successCallback();
				}
			});
			$(this.outerPage).on("click",".close_tab",function(){
				if(that.closeDialogCallback){
					that.closeDialogCallback();
				}
				that.close();
			});
		};
		
		maskTabDialog.prototype.praiseData = function(optionObj){
			for(var key in optionObj){
				if(optionObj.hasOwnProperty(key)){
					this.praiseDomData(key,optionObj[key]);
				}			
			}
		};	
		
		maskTabDialog.prototype.praiseDomData = function(name,value){		
			if(name){
				var selectDom = $(this.outerPage).find("[name='"+name+"']");
				var nodeName = "";
				if(selectDom){
					nodeName = selectDom[0]["nodeName"];
				}				
				if(nodeName == "INPUT" || nodeName == "TEXTAREA" || nodeName == "SELECT"){
					$(selectDom).val(value);
				}else if(nodeName != ""){
					$(selectDom).html(value);
				}			
			}
		};	
		
		maskTabDialog.prototype.setSuccessCallback = function(callBackFun){
			this.successCallback = callBackFun;
			return this;
		};
		
		maskTabDialog.prototype.setCloseDialogCallback = function(callBackFun){
			this.closeDialogCallback = callBackFun;
			return this;
		};
		
		maskTabDialog.prototype.setSuccessAjaxCallback = function(url, dataObj, callBackFun){
			var that = this;
			this.resultCloseDialog = false;
			
			this.setSuccessCallback(function(){
				var queryData = this.getPraiseData();
				for(var key in dataObj){
					if(dataObj.hasOwnProperty(key)){
						queryData[key] = dataObj[key];
					}
				}
	   			
	   			$.ajax({
	   				url:url,
	   				type:"post",
	   				dataType:"json",
	   				data:queryData,
	   				success:function(res){   					
	   					if(res){
	   						if(res.result == 1 || res.result == "SUCCESS" || res.success){
	   							callBackFun(res);
	   							that.close();
	   						}
	   						basic.alert(res.msg);
	   					}	   					   					
	   				}
	   			});
			});
			return this;
		};
		
		maskTabDialog.prototype.clearInput = function(){
			$("input[type='text']",this.outerPage).val("");
			$("input[type='number']",this.outerPage).val("");
			$("input[type='hidden']",this.outerPage).val("");
			$("textarea",this.outerPage).val("");
			$("input[type='radio'][value='true']",this.outerPage).prop("checked",true);
		};
		
		//获得所有标签的数据
		maskTabDialog.prototype.getPraiseData = function(){
			var inputText = $("input[type='text']",this.outerPage);
			var inputNumber = $("input[type='number']",this.outerPage);
			var inputHidden = $("input[type='hidden']",this.outerPage);
			var inputRadio =  $("input[type='radio']",this.outerPage);
			var inputCheckbox =  $("input[type='checkbox']",this.outerPage);
			var select = $("select",this.outerPage);
			var textArea = $("textarea",this.outerPage);			
			
			var inputTextData = this.getPraiseOneType(inputText);
			this.praiseDataEnqueue(inputTextData);
			
			var inputNumberData = this.getPraiseOneType(inputNumber);
			this.praiseDataEnqueue(inputNumberData);
			
			var inputHiddenData = this.getPraiseOneType(inputHidden);
			this.praiseDataEnqueue(inputHiddenData);
			
			var inputRadioData = this.getPraiseOneType(inputRadio);
			this.praiseDataEnqueue(inputRadioData);
			
			var inputCheckboxData = this.getPraiseOneType(inputCheckbox);
			this.praiseDataEnqueue(inputCheckboxData);
			
			var selectData = this.getPraiseOneType(select);
			this.praiseDataEnqueue(selectData);
			
			var textAreaData = this.getPraiseOneType(textArea);
			this.praiseDataEnqueue(textAreaData);
				
			return this.praiseDataDequeue();
		};
		
		maskTabDialog.prototype.praiseDataEnqueue = function(selectDomData){
			for(var key in selectDomData){
				if(selectDomData.hasOwnProperty(key)){
					this.enqueueData[key] = selectDomData[key];
				}	
			}	
		};
		
		maskTabDialog.prototype.praiseDataDequeue = function(){		
			return this.enqueueData;
		};
		
		//获得一种标签的数据
		maskTabDialog.prototype.getPraiseOneType = function(selectDom){		
			var result = {};		
			if(!selectDom || selectDom.length < 1){
				return result;
			}
			for(var i = 0;i < selectDom.length;i++){
				var name = $(selectDom).eq(i).attr("name");
				var value = $(selectDom).eq(i).val();
				var type = $(selectDom).eq(i).attr("type");
				//如果是是radio返回选中的
				if(type == "radio"){
					if(!$(selectDom).eq(i).is(":checked")){
						continue;
					}
				}
				//没有命名name的标签将过滤掉
				if(name){
					result[name] = value;
				}			
			}
			return result;
		};
		
		window.MaskTabDialog = function(options){
			var tempPlugIn = new maskTabDialog(options);
			tempPlugIn.init();
			return tempPlugIn;
		};
		
})();