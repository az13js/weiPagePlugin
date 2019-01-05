//微页面配置文件
var weiPageConfig = {
		
		//引擎配置
		engineConfig:{
			plugIn:"plugInList",
			subPlugIn:"subPlugInList"
		},
		
		//请求地址配置
		urlConfig:{
			uploadImage:"/pic/upload",
			productList : "./assets/json/productList.json",
			weiPageList : "./assets/json/weiPageList.json",
			categoryList : "./assets/json/classifyList.json",
			groupList : "./assets/json/groupList.json",
			functionList:"./assets/json/functionList.json"
		},
		
		//特殊配置
		specialConfig:{
			plugInId:"identity",								//插件在显示（非编辑）状态时可以通过a标签导航锚点到对应的块，该块id由plugInIdTab + plugInId配置值的属性对应的值组成
			plugInIdTab:"M",													
			plugInIdViewTab:"plugInIdView"		//插件视图标识（插件redraw的时候会通过该标识+plugInUuid查找div的id找到要替换的块）
		}
};
		
		