//插件视图标识（插件redraw的时候会通过该标识+plugInUuid查找div的id找到要替换的块）
var plugInIdViewTab = weiPageConfig.specialConfig.plugInIdViewTab;

//微页面视图
var weiPageView = {
		//重绘已选中的模块
		redrawSelect:{
			//插件
			plugIn:function(){
				var plugInData = weiPage.getSelectPlugIn().val();
				weiPageView.redrawPlugIn(plugInData);
			},
			//插件编辑模块
			plugInEdit:function(){
				var plugInData = weiPage.getSelectPlugIn().val();
				weiPageView.redrawPlugInEdit(plugInData);
			},
			//子插件
			subPlugIn:function(){
				var plugInData = weiPage.getSelectPlugIn().val();
				var subPlugInData = weiPage.getSelectSubPlugIn().val();
				weiPageView.redrawSubPlugIn(subPlugInData,plugInData["plugIntype"],plugInData["showType"]);
			},
			//子插件编辑模块
			subPlugInEdit:function(){
				//判断是否有配置子插件模板
				var plugIntype = weiPage.getSelectPlugIn().attr("plugIntype");
				//var plugInName = weiPageConfig.mapperConfig.plugIn[plugIntype];								//通过映射配置读取插件名称
				var plugInName = plugIntype;
				if(weiPageModel[plugInName].template.edit["subPlugIn"]){
					var plugInData = weiPage.getSelectPlugIn().val();
					var subPlugInData = weiPage.getSelectSubPlugIn().val();
					weiPageView.redrawSubPlugInEdit(subPlugInData,plugInData["plugIntype"]);
				}else{
					weiPageView.redrawSubPlugInEdit();
				}			
			}
		},
		
		//移除模块
		removeView:function(plugInUuid){
			var tempIdSelector = "#" + plugInIdViewTab + plugInUuid;
			$(tempIdSelector).remove();
		},
		
		//重绘整个微页面视图
		redrawView:function(){
			var dataList = weiPage.getPlugInList().val();
			if(dataList && $.isArray(dataList)){
				var plugInHtm = "";
				for(var i = 0; i < dataList.length; i++){
					var data = dataList[i];
					//var plugInName = weiPageConfig.mapperConfig.plugIn[data["plugIntype"]];											//通过映射配置读取插件名称
					var plugInName = data["plugIntype"];
					var templateId = weiPageModel[plugInName].template.view.plugIn[data["showType"]];	//通过插件配置读取模板id		
					var tempHTML = template(templateId,data);
					plugInHtm  += weiPageView.installPlugIn(tempHTML,data);					
				}
				$("#mobilePage").html(plugInHtm);
			}
		},		
		//重绘插件
		redrawPlugIn:function(data){
			if(data){
				var tempIdSelector = "#" + plugInIdViewTab + data["plugInUuid"];			
				//var plugInName = weiPageConfig.mapperConfig.plugIn[data["plugIntype"]];											//通过映射配置读取插件名称		
				var plugInName = data["plugIntype"];
				var templateId = weiPageModel[plugInName].template.view.plugIn[data["showType"]];	//通过插件配置读取模板id		
				var tempHTML = template(templateId,data);			
				var plugInHtm  = weiPageView.installPlugIn(tempHTML,data);
				
				$(tempIdSelector).replaceWith(plugInHtm);
			}			
		},
		//重绘插件编辑模块
		redrawPlugInEdit:function(data){
			if(data){
				//var plugInName = weiPageConfig.mapperConfig.plugIn[data["plugIntype"]];											//通过映射配置读取插件名称
				var plugInName = data["plugIntype"];
				if(!plugInName){
					plugInName = "main";
				}
				var templateId = weiPageModel[plugInName].template.edit.plugIn;									//通过插件配置读取模板id
				var tempHtml = template(templateId,data);
				
				$("#plugIn_option_form").html(tempHtml);
			}else{
				$("#plugIn_option_form").html("");
			}
		},
		//重绘子插件
		redrawSubPlugIn:function(data,plugIntype,showType){
			if(data && plugIntype != undefined && showType != undefined){
				var tempIdSelector = "#" + plugInIdViewTab + data["plugInUuid"];			
				//var plugInName = weiPageConfig.mapperConfig.plugIn[plugIntype];															//通过映射配置读取插件名称
				var plugInName = plugIntype;
				var templateId = weiPageModel[plugInName].template.view.subPlugIn[showType];				//通过插件配置读取模板id		
				var tempHTML = template(templateId,data);
				
				$(tempIdSelector).replaceWith(tempHTML);
			}			
		},
		//重绘子插件编辑模块
		redrawSubPlugInEdit:function(data,plugIntype){
			if(data && plugIntype){
				//var plugInName = weiPageConfig.mapperConfig.plugIn[plugIntype];														//通过映射配置读取插件名称		
				var plugInName = plugIntype;
				var templateId = weiPageModel[plugInName].template.edit.subPlugIn;							//通过插件配置读取模板id
				var tempHtml = template(templateId,data);
				
				$("#subPlugIn_option_form").html(tempHtml);
			}else{
				$("#subPlugIn_option_form").html("");
			}
		},
		
		//组装插件
		installPlugIn:function(plugInHtml,data){
			var plugInData = {
					plugInUuid : data["plugInUuid"],
					plugInSelect : data["plugInSelect"],
					backgroundColor : data["backgroundColor"],
					showbgPicUrl : data["showbgPicUrl"],
					plugInHtml : plugInHtml
			}
			return template("plugIn_common_page",plugInData);
		},
};