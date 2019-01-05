/*
 * 表单校验插件
 * 参数：option{
 * 		checkForm  待校验表单
 * }
 * doCheck（）对checkForm执行遍历校验
 * doCheckOne(form) 校验单个表单，form待校验的表单标签
 * doCheckList(formList) 校验多个表单，formList为表单标签列表
 * */

(function(window,$){
	
	var formCheck = function(option){
		this.option = option;
		
		//待检测的表单
		this.checkForm = undefined;
		//待执行校验的表单列表
		this.formArray = new Array();
		//检测结果
		this.checkResult = true;
	};
	
	formCheck.prototype.init = function(){
		if(this.option){
			if(this.option.checkForm){
				this.checkForm = $(this.option.checkForm);
			}
		}
	};
	
	formCheck.prototype.parseCheckForm = function(){
		var inputForm = $(this.checkForm).find("input");
		this.parseCheckDom(inputForm);
		
		var selectForm = $(this.checkForm).find("select");
		this.parseCheckDom(selectForm);
		
		var textAreaForm = $(this.checkForm).find("textarea");
		this.parseCheckDom(textAreaForm);
	};
	
	formCheck.prototype.parseCheckDom = function(form){
		for(var i = 0;i < form.length;i++){
			var dataCheck = $(form).eq(i).attr("data-check");
			if(dataCheck){				
				this.formArray.push({
					check:dataCheck,
					form:$(form).eq(i)
				});
			}
		}
	}
	
	
	formCheck.prototype.doCheck = function(){
		this.parseCheckForm();
		this.initForm();
		for(var i = 0;i < this.formArray.length;i++){
			var formOne = this.formArray[i];
			this.checkOne(formOne);
		}
		return this.checkResult;
	};
	
	formCheck.prototype.doCheckOne = function(form){
		this.initForm();
		var dataCheck = $(form).attr("data-check");
		if(dataCheck){				
			var formOne = {
				check:dataCheck,
				form:$(form)
			};
			this.checkOne(formOne);
		}
		return this.checkResult;
	};
	
	formCheck.prototype.doCheckList = function(formList){
		this.initForm();
		for(var i = 0;i < formList.length;i++){
			var dataCheck = $(formList[i]).attr("data-check");
			if(dataCheck){				
				var formOne = {
					check:dataCheck,
					form:$(formList[i])
				};
				this.checkOne(formOne);
			}
		}
		return this.checkResult;
	};
	
	formCheck.prototype.showNotThroughForm = function(form,check){				
		var formPage = $(form).parents(".form_one");
		$(formPage).addClass("checkNotThrough");
		$(".input_tips[data-check='"+check+"']",formPage).addClass("show");
	};
	
	formCheck.prototype.initForm = function(){
		this.checkResult = true;
		$(this.checkForm).find(".form_one").removeClass("checkNotThrough");
		$(this.checkForm).find(".input_tips").removeClass("show");
	};
	
	formCheck.prototype.checkOne = function(formOne){
		var checkList = formOne["check"].split(",");
		var result;
		for(var i = 0;i < checkList.length;i++){
			switch(checkList[i]){
				case 'notEmpty' : result = this.checkNotEmpty(formOne["form"]);break;
				case 'textLength' : result = this.checkTextLength(formOne["form"]);break;
				case 'numberSize' : result = this.checkNumberSize(formOne["form"]);break;
				case 'mobileReg' : result = this.checkMobileReg(formOne["form"]);break;
				case 'emailReg' : result = this.checkEmailReg(formOne["form"]);break;
				case 'idcardReg' : result = this.checkIdcardReg(formOne["form"]);break;
				case 'compareNumber' : result = this.checkCompareNumber(formOne["form"]);break;
			}
			if(!result){
				this.checkResult = false;
				break;
			}
		}		
	};
	
	//非空校验
	formCheck.prototype.checkNotEmpty = function(form){
		var result = true;
		var val = $(form).val();
		if(!val){				
			result = false;
			this.showNotThroughForm(form,"notEmpty");
		}
		return result;
	};
	
	//文本长度校验
	formCheck.prototype.checkTextLength = function(form){
		var result = true;
		var len = $(form).val().length;
		var min = Number($(form).attr("data-check-minlen"));
		var max = Number($(form).attr("data-check-maxlen"));
		if(len < min || (max > 0 && len > max)){
			result = false;
			this.showNotThroughForm(form,"textLength");
		}	
		return result;
	};
	
	//数值范围
	formCheck.prototype.checkNumberSize = function(form){
		var result = true;
		var val = Number($(form).val());
		var min = 0;
		var max = 0;
		var minEx = 0;
		var maxEx = 0;
		var minSize = $(form).attr("data-check-minsize");
		var maxSize = $(form).attr("data-check-maxsize");
		var minSizeEx = $(form).attr("data-check-minsizeex");
		var maxSizeEx = $(form).attr("data-check-maxsizeex");
		min = Number(minSize);
		max = Number(maxSize);
		minEx = Number(minSizeEx);
		maxEx = Number(maxSizeEx);
		if((val < min && minSize != "") || (val > max && maxSize != "") || (val <= minEx && minSizeEx != "") || (val >= maxEx && maxSizeEx != "")){
			result = false;
			this.showNotThroughForm(form,"numberSize");
		}
		return result;
	};
	
	//手机号码校验
	formCheck.prototype.checkMobileReg = function(form){
		var result = true;
		var val = Number($(form).val());
		var mobileReg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/; 
		if(!mobileReg.test(val)){
			result = false;
			this.showNotThroughForm(form,"mobileReg");
		}
		return result;
	};
	
	//邮箱校验
	formCheck.prototype.checkEmailReg = function(form){
		var result = true;
		var val = $(form).val();
		var emailReg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
		if(!emailReg.test(val)){
			result = false;
			this.showNotThroughForm(form,"emailReg");
		}
		return result;
	};
	
	//身份证校验
	formCheck.prototype.checkIdcardReg = function(form){
		var result = true;
		var val = $(form).val();
		var idcardReg = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
		if(!idcardReg.test(val)){
			result = false;
			this.showNotThroughForm(form,"idcardReg");
		}	
		return result;
	};
	
	//不同表单的数值大小比较
	formCheck.prototype.checkCompareNumber = function(form){
		var result = true;
		var val = Number($(form).val());
		var compareName = $(form).attr("data-check-comparename");
		var compareType = $(form).attr("data-check-comparetype");
		var compareForm = $("[name='"+compareName+"']",this.checkForm);
		if(compareForm){
			var compareValue = Number($(compareForm).val());
			if(compareType == "big"){
				if(val <  compareValue){
					result = false;
					this.showNotThroughForm(form,"compareNumber");
				}
			}else if (compareType == "bigex"){
				if(val <=  compareValue){
					result = false;
					this.showNotThroughForm(form,"compareNumber");
				}
			}else if(compareType == "small"){
				if(val > compareValue){
					result = false;
					this.showNotThroughForm(form,"compareNumber");
				}
			}else if(compareType == "smallex"){
				if(val >= compareValue){
					result = false;
					this.showNotThroughForm(form,"compareNumber");
				}
			}
		}		
		return result;
	};
	
	window.FormCheck = function(option){
		var tempPlugin = new formCheck(option);
		tempPlugin.init();
		return tempPlugin;
	}
	
})(window,jQuery);

