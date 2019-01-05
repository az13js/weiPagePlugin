var basic = {
        //顶层窗口提示框
        alert: function(tempInput) {
            var topWindow = window.top,
                thisWindow = window;
            if (thisWindow == topWindow) {
                basic.message.topMessage(tempInput);
            } else {
                window.top.basic.message.topMessage(tempInput);
            }
        },
        //检测页码
        checkPageIndex: function(tempInput) {
            var tempOutput = 1;
            try {
                var tempNumber = parseInt(tempInput);
                tempOutput = tempNumber;
            } catch (e) {
                console.warn("PARSE NUMBER ERROR.");
            } finally {
                return tempOutput;
            }
        },     
        message: {
            "status": {
                "topMessage": {
                    wrapDom: undefined,
                    dom: undefined,
                    show: false
                }
            },
            "topMessage": function(tempMsg) {
                var tempData = this.status.topMessage,
                    tempWrapDom, tempDom;
                if (!!tempData.wrapDom) {
                    tempWrapDom = tempData.wrapDom;
                    tempDom = tempData.dom;
                } else {
                    var tempWrapDom = $("<div></div>"),
                        tempMessageDom = $("<p></p>");
                    tempWrapDom.css({
                        "position": "fixed",
                        "width": "99%",
                        "top": "-100px",
                        "display": "block",
                        "z-index": "9999999999999"
                    });
                    tempMessageDom.css({
                        "text-align": "center",
                        "width": "500px",
                        "height": "60px",
                        "line-height": "60px",
                        "margin": "auto",
                        "background-color": "#ffecce"
                    });
                    tempDom = tempMessageDom;
                    tempWrapDom = tempWrapDom;
                    tempWrapDom.append(tempDom);
                    $("body").append(tempWrapDom);
                    this.status.topMessage.wrapDom = tempWrapDom;
                    this.status.topMessage.dom = tempDom;
                }
                tempDom.text(tempMsg);
                tempWrapDom.animate({"top":"0"},200).delay(2500).animate({"top":"-100px"},200);
            }
        },
        //显示loading蒙板
        showLoadingMask: function(tempText) {
            var tempWindow = window,
                tempTopWindow = window.top;            
            if(!tempText){
            	tempText="数据加载中";
            }
            if (tempWindow == tempTopWindow) {
                var tempMaskDom = $(".mask_wrap"),
                    tempTextDom = tempMaskDom.find(".loading_text");
                tempTextDom.text(tempText);
                tempMaskDom.fadeIn(300);
            } else {
                window.top.basic.showLoadingMask(tempText);
            }
        },
        //隐藏蒙板
        hideMask: function() {
            var tempWindow = window,
                tempTopWindow = window.top;
            if (tempWindow == tempTopWindow) {
                var tempMaskDom = $(".mask_wrap");
                tempMaskDom.fadeOut(300);
            } else {
                window.top.basic.hideMask();
            }
        },
        //回调工厂方法
        callbackFactory: function(tempCallBack, tempThis, tempFinalFunction) {
            var tempFunction = function(tempData) {
                if (!!tempFinalFunction) {
                    tempFinalFunction(tempData);
                };
                var tempResult = tempData.result,
                    tempMessage = tempData.msg;              
                if (tempData.success || tempResult == 1 || tempResult=="SUCCESS") {
                    if (!!tempThis) {
                        tempThis[tempCallBack](tempData);
                    } else {
                        tempCallBack(tempData);
                    }
                } else {
                    if(tempMessage){
                    	basic.alert(tempMessage);
                    }else{
                    	basic.alert(tempData.errMsg);
                    }              	
                }
            };
            return tempFunction;
        },
        //网络错误
        netError: function() {
            basic.alert("网络似乎出现了一些问题，稍后重试下？");
        },
        //页面跳转
        skip: function(tempUrl, tempTime) {
            window.setTimeout(function() {
                location.href = tempUrl;
            }, tempTime);
        },
        //重构ajax
        getAjax:function(url,data,recordFun){
        		var ajaxOption=basic.customAjax(url,data,recordFun);
        		ajaxOption.type="get";
        		basic.concat(ajaxOption);
        },
        postAjax:function(url,data,recordFun){
	        	var ajaxOption=basic.customAjax(url,data,recordFun);
	    		ajaxOption.type="post";
	    		basic.concat(ajaxOption);
        },
        customAjax:function(url,data,recordFun){
        		var ajaxOption={
    				url:url,
    				dataType:"json",
    				data:data,
    				success:function(recordData){
    					if(recordData){
	    	    				if(recordData.result==1 || recordData.result=='SUCCESS'){
	    	    					recordFun(recordData);
	    	    				}else{
	    	    					basic.alert(recordData.msg);
	    	    					recordFun(recordData);
	    	    				}
	    	    			}
    				}
        		}
        		return ajaxOption;
        },
        //请求方法
        concat: function(ajaxOption) {
            $.ajax(ajaxOption);
        },
        //克隆json和数组对象
        cloneJson: function(tempInput) {
            var tempOutput = false;
            try {
                var tempString = JSON.stringify(tempInput),
                    tempJson = JSON.parse(tempString);
                tempOutput = tempJson;
            } catch (e) {
                console.warn("CLONE JSON ERROR.");
            } finally {
                return tempOutput;
            }
        },
        //上传文件({url,data,successCallBack})
        uploadFile: function(tempInput) {
            var tempData = tempInput.data,
                tempUrl = tempInput.url,
                tempFunction = tempInput.successCallBack;
            tempOption = {
                url: tempUrl,
                data: tempData,
                type: "POST",
                dataType: "JSON",
                contentType: false,
                processData: false,
                success: tempFunction,
                error: basic.netError
            };
            basic.concat(tempOption);
        },
        //显示表单提示
        showTips: function(tempId) {
            var tempId = "#" + tempId,
                tempDom = $(tempId),
                tempForm = tempDom.parents(".form_wrap"),
                tempTips = tempForm.find(".input_tips");
            tempTips.addClass("show");
        },
        hiddenTips: function(tempId) {
            var tempId = "#" + tempId,
            tempDom = $(tempId),
            tempForm = tempDom.parents(".form_wrap"),
            tempTips = tempForm.find(".input_tips");
            if($(tempTips).hasClass("show")){
            	$(tempTips).removeClass("show");
            }
    },
        //创建二维码Base64
        createQRcodeBase64: function(tempText, tempWidth, tempHeight) {
            var qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
            qrcode.addData(tempText);
            qrcode.make();
            var canvas = document.createElement('canvas');
            canvas.width = tempWidth;
            canvas.height = tempHeight;
            var ctx = canvas.getContext('2d');
            var tileW = tempWidth / qrcode.getModuleCount();
            var tileH = tempHeight / qrcode.getModuleCount();
            for (var row = 0; row < qrcode.getModuleCount(); row++) {
                for (var col = 0; col < qrcode.getModuleCount(); col++) {
                    ctx.fillStyle = qrcode.isDark(row, col) ? "#000000" : "#ffffff";
                    var w = (Math.ceil((col + 1) * tileW) - Math.floor(col * tileW));
                    var h = (Math.ceil((row + 1) * tileW) - Math.floor(row * tileW));
                    ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h);
                }
            }
            var tempUrl = canvas.toDataURL("image/png");
            return tempUrl;
        },
        //消息提示框
        message: {
            "status": {
                "topMessage": {
                    wrapDom: undefined,
                    dom: undefined,
                    show: false
                }
            },
            "topMessage": function(tempMsg) {
                var tempData = this.status.topMessage,
                    tempWrapDom, tempDom;
                if (!!tempData.wrapDom) {
                    tempWrapDom = tempData.wrapDom;
                    tempDom = tempData.dom;
                } else {
                    var tempWrapDom = $("<div></div>"),
                        tempMessageDom = $("<p></p>");
                    tempWrapDom.css({
                        "position": "fixed",
                        "width": "99%",
                        "top": "-100px",
                        "display": "block",
                        "z-index": "9999999999999"
                    });
                    tempMessageDom.css({
                        "text-align": "center",
                        "width": "500px",
                        "height": "60px",
                        "line-height": "60px",
                        "margin": "auto",
                        "background-color": "#ffecce"
                    });
                    tempDom = tempMessageDom;
                    tempWrapDom = tempWrapDom;
                    tempWrapDom.append(tempDom);
                    $("body").append(tempWrapDom);
                    this.status.topMessage.wrapDom = tempWrapDom;
                    this.status.topMessage.dom = tempDom;
                }
                tempDom.text(tempMsg);
                tempWrapDom.animate({"top":"0"},200).delay(2500).animate({"top":"-100px"},200);
            }
        },
      //获取url参数
        getQueryString:function(name){
		     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
		     var r = window.location.search.substr(1).match(reg);
		     if(r!=null)return  unescape(r[2]); return null;
		},
    };
			
