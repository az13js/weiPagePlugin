$(function(){
	var dropData = {
			mobilePageWidth : $("#mobilePage").width(),
			mouseDown : false,
			clientY : 0,
			clientX : 0,
			offsetY : 0,
			offsetX : 0,
			isCreateTempDom : false,
			thisDom : undefined,
			sourceDom : undefined,
			tempDom : undefined,
			plugInWidth : 0,
			plugInHeight : 0,
			prevPlugInList : new Array(),
			nextPlugInList : new Array(),
			prevPlugIn : undefined,
			nextPlugIn : undefined,
			downY : 0,
			downX : 0,
			moveY : 0,
			moveX : 0,
	};
	
	//记录鼠标按钮
	$("#mobilePage").on("mousedown",".plugIn_wrap",function(e){
		mouseDownEvent(this,e);		
		e.stopPropagation();
	});
	//记录子插件按钮
	$("#mobilePage").on("mousedown",".subPlugIn_wrap",function(e){
		if($(this).closest(".plugIn_wrap").hasClass("current")){
			mouseDownEvent(this,e);	
		}
		e.stopPropagation();
	});
	
	function mouseDownEvent(that,e){
		dropData.mouseDown = true;
		dropData.thisDom = $(that);
		dropData.sourceDom = $(that).clone(true);
		
		dropData.downY = e.clientY;
		dropData.downX = e.clientX;
		dropData.offsetY = e.offsetY;
		dropData.offsetX = e.offsetX;
		
		initPrevNextPlugIn();
	}
	
	//移动鼠标
	$("#mobilePage").on("mousemove",".plugIn_wrap,.subPlugIn_wrap",function(e){
		if(dropData.mouseDown){
			dropData.clientY = e.clientY;
			dropData.clientX = e.clientX;
			dropEvent(e);						
		}
		
		e.stopPropagation();
	});
	
	//松开鼠标
	$(document).on("mouseup",function(e){
		if(dropData.mouseDown){
			
			plugInDropSort();
			
			dropData = {mouseDown : false,clientY : 0,clientX : 0,thisDom : undefined,sourceDom : undefined,tempDom : undefined,plugInWidth : 0,plugInHeight : 0,prevPlugInList : new Array(),nextPlugInList : new Array(),prevPlugIn : undefined,nextPlugIn : undefined,downY : 0,downX : 0,moveY : 0,moveX : 0};
		}
		if(dropData.isCreateTempDom){
			removeTempPlugIn();
		}
		
		e.stopPropagation();
	});

	
	//拖拽事件
	function dropEvent(e){
		if(!dropData.isCreateTempDom){
			dropData.plugInHeight = $(dropData.thisDom).height();
			dropData.plugInWidth = $(dropData.thisDom).width();
			createTempPlugIn();
		}
		$(dropData.thisDom).css({"position":"fixed","z-index":"1000","top":dropData.clientY-dropData.offsetY,"left":dropData.clientX-dropData.offsetX,"height":dropData.plugInHeight,"width":dropData.plugInWidth});
		
		countPlace();
	}
	
	//计算位置
	function countPlace(){
		var moveX = dropData.clientX - dropData.downX - dropData.moveX;
		var moveY = dropData.clientY - dropData.downY - dropData.moveY;
		var moveDistance = moveX + moveY;
		var prevDistance = 0;
		var nextDistance = 0;
		if(dropData.prevPlugIn){
			prevDistance = dropData.prevPlugIn.height + dropData.prevPlugIn.width;
		}
		if(dropData.nextPlugIn){
			nextDistance = dropData.nextPlugIn.height + dropData.nextPlugIn.width;
		}
		if(nextDistance && (moveDistance > nextDistance/3 || moveX > dropData.nextPlugIn.width + dropData.plugInWidth || moveY > dropData.nextPlugIn.height + dropData.plugInHeight)){
			//向后替换
			if(dropData.nextPlugIn){
				dropData.moveY += dropData.nextPlugIn.height;				
				if(dropData.nextPlugIn.width <= dropData.mobilePageWidth/2){
					dropData.moveX += dropData.nextPlugIn.width;
				}
			}			
			
			var copyTemp = $(dropData.tempDom).clone(true);
			$(dropData.nextPlugIn.dom).after(copyTemp);
			$(dropData.tempDom).remove();
			dropData.tempDom = copyTemp;
			popNextPlugIn();
		}else if(prevDistance && (-moveDistance > prevDistance/3 || -moveX > dropData.prevPlugIn.width || -moveY > dropData.prevPlugIn.height)){
			//向前替换
			if(dropData.prevPlugIn){
				dropData.moveY -= dropData.prevPlugIn.height;
				if(dropData.prevPlugIn.width <= dropData.mobilePageWidth/2){
					dropData.moveX += dropData.prevPlugIn.width;
				}
			}			
			
			var copyTemp = $(dropData.tempDom).clone(true);
			$(dropData.prevPlugIn.dom).before(copyTemp);
			$(dropData.tempDom).remove();
			dropData.tempDom = copyTemp;
			popPrevPlugIn();
		}
	}
	
	//初始化记录兄弟节点
	function initPrevNextPlugIn(){
		var prevDomList = $(dropData.thisDom).prevAll();
		if(prevDomList && prevDomList.length){
			for(var i = prevDomList.length-1 ; i >= 0;i--){
				var prevDom = $(prevDomList).eq(i);
				dropData.prevPlugInList.push({
					dom : prevDom,
					height : $(prevDom).height(),
					width : $(prevDom).width()
				})
			}
			dropData.prevPlugIn = dropData.prevPlugInList.pop();
		}else{
			dropData.prevPlugInList = [];
		}
		var nextDomList = $(dropData.thisDom).nextAll();
		if(nextDomList && nextDomList.length){
			for(var i = nextDomList.length -1; i >= 0;i--){
				var prevDom = $(nextDomList).eq(i);
				dropData.nextPlugInList.push({
					dom : prevDom,
					height : $(prevDom).height(),
					width : $(prevDom).width()
				})
			}
			dropData.nextPlugIn = dropData.nextPlugInList.pop();
		}else{
			dropData.nextPlugInList = [];
		}
	}
	
	//获取前面的插件
	function popPrevPlugIn(){
		if(dropData.prevPlugInList.length){
			if(dropData.nextPlugIn){
				dropData.nextPlugInList.push(dropData.nextPlugIn);
			}			
			dropData.nextPlugIn =dropData.prevPlugIn;
			dropData.prevPlugIn = dropData.prevPlugInList.pop();			
		}else if(dropData.prevPlugIn){
			if(dropData.nextPlugIn){
				dropData.nextPlugInList.push(dropData.nextPlugIn);
			}		
			dropData.nextPlugIn = dropData.prevPlugIn;
			dropData.prevPlugIn = undefined;
		}
	}
	
	//获取后面的插件
	function popNextPlugIn(){
		if(dropData.nextPlugInList.length){
			if(dropData.prevPlugIn){
				dropData.prevPlugInList.push(dropData.prevPlugIn);
			}			
			dropData.prevPlugIn = dropData.nextPlugIn;
			dropData.nextPlugIn = dropData.nextPlugInList.pop();
		}else if(dropData.nextPlugIn){
			if(dropData.prevPlugIn){
				dropData.prevPlugInList.push(dropData.prevPlugIn);
			}			
			dropData.prevPlugIn =dropData.nextPlugIn;
			dropData.nextPlugIn = undefined;
		}
	}
	
	//创建临时插件
	function createTempPlugIn(){
		dropData.isCreateTempDom = true;
		dropData.tempDom = $(dropData.sourceDom).clone(true);
		$(dropData.tempDom).addClass("tempPlugIn").removeAttr("id");
		$(dropData.thisDom).before(dropData.tempDom);		
	}		
	
	//移除临时插件
	function removeTempPlugIn(){
		dropData.isCreateTempDom = false;
		$(dropData.tempDom).replaceWith(dropData.sourceDom);
		$(dropData.thisDom).remove();
	}
	
	//插件拖拽排序
	function plugInDropSort(){
		if(dropData.tempDom){
			var thisDomSelect = {
					plugInUuid : $(dropData.thisDom).attr("data-pluginuuid")
			};
			var nextDomSelect = undefined;
			var nextDom = $(dropData.tempDom).next();
			if(nextDom && nextDom.length){
				var nextUuid = $(nextDom).attr("data-pluginuuid");
				if(nextUuid == thisDomSelect.plugInUuid){
					return;
				}
				nextDomSelect = {
						plugInUuid : nextUuid
				};
			}
			
			if($(dropData.tempDom).hasClass("plugIn_wrap")){
				weiPage.plugInDrop(thisDomSelect,nextDomSelect);
			}else if($(dropData.tempDom).hasClass("subPlugIn_wrap")){
				weiPage.subPlugInDrop(thisDomSelect,nextDomSelect);
			}						
		}			
	}
	
});