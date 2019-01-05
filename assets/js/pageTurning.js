/**
 * 表格对象
 * 配置参数:
 * tableId: "", //表格ID
 * url: "", //数据请求的地址
 * pageSize: 20, //单页数量
 * template: "", //渲染模板ID
 * requestData:{},//请求参数
 * searchFormId:"",//搜索表单ID
 * 使用方式:
 * 1.页码绑定属性：data-pageIndex
 * 2.排序绑定属性：data-pageSort
 */
(function() {
    var pageTurning = function(options) {
        this.data = { //数据存储
            requestData: {}, //请求数据
            responseData: {}, //返回数据
            tableDom: "", //表格元素
            tdCount: 0, //表格列数
        };
        this.options = options;
    };
    //初始化
    pageTurning.prototype.init = function() {
        var tableId = this.options.tableId,
            tempSize = this.options.pageSize,
            tempRequestData = this.options.requestData,
            tempTableDom = document.getElementById(tableId),
            tempThead = tempTableDom.getElementsByTagName("thead")[0],
            tempTr = tempThead.getElementsByTagName("tr")[0],
            tempTdCount = tempTr.getElementsByTagName("td").length;
        this.data.tableDom = tempTableDom;
        this.data.tdCount = tempTdCount;
        this.data.requestData = {
            pageSize: tempSize,
            pageNo: 1
        };
        if (!!tempRequestData) {
            this.setRequestData(tempRequestData);
        }
        if(this.options.search){
        		this.search();
        }else{
        		this.concat();
        }
       
        this.bindEvent();
    };
    //翻页
    pageTurning.prototype.goPage = function(pageIndex) {
        var tempData = this.data.requestData;
        tempData.pageNo = pageIndex;
        this.concat();
        //翻页时滚到最顶部
        window.scrollTo(0,0);
    };
    //刷新
    pageTurning.prototype.refresh = function() {
        var tempData = this.data.requestData;
        this.concat();
    };
    //排序
    pageTurning.prototype.sort = function(keyName, order) {
        var tempData = this.data.requestData;
        /*tempData[keyName] = order;*/ //设置排序规则
        tempData['orderByName']=keyName;
        tempData['descOrAsc']=order;
        tempData.pageNo = 1; //返回第一页
        this.concat();
    };
    //搜索
    pageTurning.prototype.search = function(tempInput,form) {
        var tempData = this.data.requestData;
        //this.setRequestData(tempInput);
        tempData.pageNo = 1; //返回第一页
        
        if(form==null||form=='undefined'){
        	form=true;
        }
        
        this.getSerachCondition(tempInput,form);
        
    };
    //搜索条件
    pageTurning.prototype.getSerachCondition=function(tempInput,form){
    	var tempOutput;   	
    	if(form){
    		tempOutput=this.getFormValue(); //获取搜索表单键值
    		for(var key in tempOutput){
    			tempOutput[key] = tempOutput[key].trim();
    		}
    	}
    	
    	if(tempInput){
    		if(typeof tempInput =='object'){
    			if(Array.isArray(tempInput)){
    				for(var i=0;i<tempInput.length;i++){
    					var tempObj=tempInput[i];
    					if(tempObj["key"]!=null&&tempObj["value"]!=null){
    						tempOutput[tempObj["key"]]=tempObj["value"].trim();
    					}
    				}
    				
    			}else{
    				if(tempInput["key"]!=null&&tempInput["value"]!=null){
    					tempOutput[tempInput["key"]]=tempInput["value"].trim();   					
    				}   				
    			}
    		}   		
    	} 
    	
    	this.setRequestData(tempOutput);
    	
    	this.concat();
    };
    //获取搜索表单键值
    pageTurning.prototype.getFormValue = function() {
        var tempId = this.options.searchFormId,
            tempCheck = forms.checkString(tempId),
            tempOutput = {};
        if (tempCheck) {
            var tempForm = window[tempId],
                tempInputList = tempForm.getElementsByTagName("input"),
                tempSelectList = tempForm.getElementsByTagName("select");
            for (var i = 0; i < tempInputList.length; i++) {
                var item = tempInputList[i],
                    tempName = item.getAttribute("name"),
                    tempValue = item.value;
                tempOutput[tempName] = tempValue;
            };
            for (var i = 0; i < tempSelectList.length; i++) {
                var item = tempSelectList[i],
                    tempName = item.getAttribute("name"),
                    tempValue = item.value;
                tempOutput[tempName] = tempValue;
            };
        }
        return tempOutput;
        /*this.setRequestData(tempOutput);*/
    };
    //设置请求参数(以{key:value}的形式传进来)
    pageTurning.prototype.setRequestData = function(tempInput) {
        var tempData = this.data.requestData;
        for(var tempKey in tempData){
        	if(tempKey!="pageSize"&&tempKey!="pageNo"){
        		tempData[tempKey]="";
        	}
        }
        for (var tempKey in tempInput) {
            var tempValue = tempInput[tempKey];
            tempData[tempKey] = tempValue;
        }
    };
    //发送请求
    pageTurning.prototype.concat = function() {
        var tempThis = this,
            tempData = this.data.requestData,
            tempOption = {},
            tempFunction = basic.callbackFactory("updateData", tempThis, basic.hideMask);
        tempData = basic.cloneJson(tempData);
        tempOption = {
            url: this.options.url,
            data: tempData,
            type: "POST",
            dataType: "JSON",
            success: tempFunction,
            error: basic.netError
        };
        basic.concat(tempOption);
        basic.showLoadingMask("数据加载中");
    };
    //显示消息
    pageTurning.prototype.showMessage = function(tempInput) {
        var tempTableDom = this.data.tableDom,
            tempTbody = tempTableDom.getElementsByTagName("tbody")[0],
            tempThead = tempTableDom.getElementsByTagName("thead")[0],
            tempTfoot = tempTableDom.getElementsByTagName("tfoot")[0],
            tempTdCount = tempThead.getElementsByTagName("td").length,
            tempHtml = "<tr><td colspan='" + tempTdCount + "'>" + tempInput + "</td></tr>";
        tempTbody.innerHTML = tempHtml;
        tempTfoot.innerHTML = "";
    };
    //绑定事件
    pageTurning.prototype.bindEvent = function() {
        var _this = this,
            tempTable = $(this.data.tableDom);
        //点击翻页事件
        tempTable.on("click", "[data-pageIndex]", function(e) {
            var tempThis = $(this),
                tempIndex = tempThis.attr("data-pageIndex");
            _this.goPage(tempIndex);
        });
        //输入翻页事件
        tempTable.on("keydown", ".now_number", function(e) {
            var tempCode = e.keyCode;
            if (tempCode == 13) {
                var tempThis = $(this),
                    tempIndex = tempThis.val();
                tempIndex = basic.checkPageIndex(tempIndex);
                _this.goPage(tempIndex);
            }
        });
        //点击排序事件
        tempTable.on("click", "[data-pageSort]", function(e) {
            $("[data-pageSort]").addClass("hide_arrow");
        	var tempThis = $(this),
                tempKeyName = tempThis.attr("data-pageSort"),
                tempOrder = tempThis.attr("data-sortOrder");
            if (tempOrder == "asc") {
                /*_this.sort(tempKeyName, "desc");*/
                _this.sort(tempKeyName, 1);
                tempThis.removeClass("up hide_arrow").addClass("down").attr("data-sortOrder", "desc");
            } else {
                /*_this.sort(tempKeyName, "asc");*/
            	_this.sort(tempKeyName, 2);
                tempThis.removeClass("down hide_arrow").addClass("up").attr("data-sortOrder", "asc");
            }
        });
    };
    //更新数据
    pageTurning.prototype.updateData = function(tempData) {
        this.data.responseData = tempData; //更新数据
        var tempCount;
        
        if(tempData.totalCount != undefined){
        		tempCount = tempData.totalCount;
        }else{
        		for(var key in tempData){
        			if($.isArray(tempData[key])){
        				tempCount = tempData[key].length;
        			}
        		}
        }
        
        if (tempCount > 0) {
            this.dataExplain(); //转换页码
            this.render(); //渲染数据
        } else {
            this.showMessage("没有可以显示的数据...");
        }
        
        if(this.options.successCallBack){ // 成功之后回调
        	this.options.successCallBack(tempData);
        }
        
        //关闭蒙板
        basic.hideMask();
    };
    //渲染数据
    pageTurning.prototype.render = function() {
        //更新页码
        this.updateTurning();
        //更新表格
        this.updateTable();
    };
    //更新翻页
    pageTurning.prototype.updateTurning = function() {
        var tempTable = this.data.tableDom,
            tempTfoot = tempTable.getElementsByTagName('tfoot')[0],
            tempData = this.data.responseData,
            tempTemplate = "pageTurning",
            tempHtml = template(tempTemplate, tempData),
            tempTr = document.createElement("tr"),
            tempTd = document.createElement("td"),
            tempTdCount = this.data.tdCount;
        tempTd.innerHTML = tempHtml;
        tempTd.setAttribute("colspan", tempTdCount);
        tempTd.setAttribute("class", "clearfix");
        tempTr.appendChild(tempTd);
        tempTfoot.innerHTML = "";
        tempTfoot.appendChild(tempTr);
    };
    //更新表格
    pageTurning.prototype.updateTable = function() {
        var tempTable = this.data.tableDom,
            tempTbody = tempTable.getElementsByTagName('tbody')[0],
            tempData = this.data.responseData,
            tempTemplate = this.options.template,
            tempHtml = template(tempTemplate, tempData);
        tempTbody.innerHTML = tempHtml;
    };
    //页码转换
    pageTurning.prototype.dataExplain = function() {
        var tempResponseData = this.data.responseData,
            tempNowIndex = tempResponseData.pageNo,
            tempPageCount = tempResponseData.pageCount;
        tempResponseData.nextPage = {
            state: false,
            value: 0
        };
        tempResponseData.prevPage = {
            state: false,
            value: 0
        };
        tempResponseData.indexList = [];
        if (tempPageCount > 4) {
            if (tempNowIndex < 3) { //头部
                for (var i = 1; i < 4; i++) {
                    var item = {
                        value: i,
                        current: false
                    };
                    if (i == tempNowIndex) {
                        item.current = true;
                    };
                    tempResponseData.indexList.push(item);
                };
                var tempArray = [{ value: "...", current: false }, { value: tempPageCount, current: false }];
                tempResponseData.indexList = tempResponseData.indexList.concat(tempArray);
            } else if (tempNowIndex == 3) {
                for (var i = 1; i < 5; i++) {
                    var item = {
                        value: i,
                        current: false
                    };
                    if (i == tempNowIndex) {
                        item.current = true;
                    };
                    tempResponseData.indexList.push(item);
                };
                var tempArray = [{ value: "...", current: false }, { value: tempPageCount, current: false }];
                tempResponseData.indexList = tempResponseData.indexList.concat(tempArray);
            } else if (tempNowIndex > tempPageCount - 2) { //尾部
                for (var i = 2; i >= 0; i--) {
                    var item = {
                        value: tempPageCount - i,
                        current: false
                    };
                    if (item.value == tempNowIndex) {
                        item.current = true;
                    };
                    tempResponseData.indexList.push(item);
                };
                var tempArray = [{ value: 1, current: false }, { value: "...", current: false }];
                tempResponseData.indexList = tempArray.concat(tempResponseData.indexList);
            } else if (tempNowIndex == tempPageCount - 2) {
                for (var i = 3; i >= 0; i--) {
                    var item = {
                        value: tempPageCount - i,
                        current: false
                    };
                    if (item.value == tempNowIndex) {
                        item.current = true;
                    };
                    tempResponseData.indexList.push(item);
                };
                var tempArray = [{ value: 1, current: false }, { value: "...", current: false }];
                tempResponseData.indexList = tempArray.concat(tempResponseData.indexList);
            } else { //中间位置
                for (var i = -1; i < 2; i++) {
                    var item = {
                        value: tempNowIndex + i,
                        current: false
                    };
                    if (i == 0) {
                        item.current = true;
                    };
                    tempResponseData.indexList.push(item);
                };
                var lastArray = [{ value: "...", current: false }, { value: tempPageCount, current: false }],
                    prevArray = [{ value: 1, current: false }, { value: "...", current: false }];
                tempResponseData.indexList = tempResponseData.indexList.concat(lastArray);
                tempResponseData.indexList = prevArray.concat(tempResponseData.indexList);
            }
        } else {
            for (var i = 1; i <= tempPageCount; i++) {
                var item = {
                    value: i,
                    current: false
                };
                if (i == tempNowIndex) {
                    item.current = true;
                };
                tempResponseData.indexList.push(item);
            };
        }
        if (tempPageCount > 1) {
            if (tempNowIndex == 1) {
                tempResponseData.nextPage = {
                    state: true,
                    value: tempNowIndex + 1
                };
            } else if (tempNowIndex == tempPageCount) {
                tempResponseData.prevPage = {
                    state: true,
                    value: tempNowIndex - 1
                };
            } else {
                tempResponseData.prevPage = {
                    state: true,
                    value: tempNowIndex - 1
                };
                tempResponseData.nextPage = {
                    state: true,
                    value: tempNowIndex + 1
                };
            }
        }
        this.data.responseData = tempResponseData;
    };
    window.pageTurning = function(options) {
        var tempTurning = new pageTurning(options);
        tempTurning.init();
        return tempTurning;
    }
})();