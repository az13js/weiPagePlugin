//引用模块内容
template.helper("quoteText", function(tempData) {
   
});
//插件id
template.helper("parsePlugInUuid", function(plugInUuid) {
	var plugInIdViewTab = weiPageConfig.specialConfig.plugInIdViewTab;
	return plugInIdViewTab + plugInUuid;
});
//插件选择
template.helper("parsePlugInSelect", function(plugInSelect) {
	if(plugInSelect){
		return "current";
	}else{
		return "";
	}
});
//商品图片
template.helper("productImage", function(showpicUrl) {
   if(showpicUrl){
	   return showpicUrl;
   }else{
	   return "./assets/images/static/goods_stream.png";
   }
});
//banner图片
template.helper("bannerImage", function(showpicUrl) {
   if(showpicUrl){
	   return showpicUrl;
   }else{
	   return "./assets/images/static/banner.png";
   }
});
//上传图片
template.helper("uploadImage", function(showpicUrl) {
   if(showpicUrl){
	   return showpicUrl;
   }else{
	   return "./assets/images/static/add_picture.png";
   }
});
//图片是否上传完成
template.helper("uploadComplete", function(showpicUrl) {
   if(showpicUrl){
	   return "complete";
   }else{
	   return "";
   }
});
//导航名称
template.helper("navName", function(name) {
	   if(name){
		   return name;
	   }else{
		   return '导航';
	   }
});
//导航样式
template.helper("navStyle", function(plugInSelect,btnSelectedColor,btnColor) {
	if(plugInSelect){
		return "color:#fff;background-color:"+btnSelectedColor;
	}else{
		return "background-color:"+btnColor;
	}
});
//导航图片
template.helper("navPic", function(showpicUrl) {
	   if(showpicUrl){
		   return showpicUrl;
	   }else{
		   return '/assets/images/static/icon_menu_addpic.png';
	   }
});

//商品标题
template.helper("productTitle", function(title) {
	if(title){
		return title;
	}else{
		return "此处显示商品标题";
	}
});
//商品价格
template.helper("productPrice", function(price) {
	if(price){
		return price;
	}else{
		return "99";
	}
});
//商品原价
template.helper("productOriginalPrice", function(originalPrice) {
	if(originalPrice){
		return originalPrice;
	}else{
		return "999";
	}
});
//引用问页面名称
template.helper("weiPageTitle", function(relatedWeiPageTitle,relatedWeiPageInfo) {
	if(relatedWeiPageTitle){
		return relatedWeiPageTitle;
	}else if(relatedWeiPageInfo && relatedWeiPageInfo.title){
		return relatedWeiPageInfo.title;
	}else{
		return "";
	}
});
//橱窗标题
template.helper("showcaseName", function(name) {
	if(name){
		return name;
	}else{
		return "惊！秒杀";
	}
});
//橱窗副标题
template.helper("showcaseSubName", function(subName) {
	if(subName){
		return subName;
	}else{
		return "1元起";
	}
});