	//插件配置
	var weiPageModel = {
			main:{										//主数据（微页面最顶层数据对象，可以修改里面的属性，但不能省略该对象）
				data:{
					title: "",
					descr: "",
					backgroundColor: "",
					categoryId: "",
					templateId: "",
					picUrl: "",
					showPicUrl: "",
					remark: "",
					plugInList: "",
					weiPageIdStr: "",
					plugInList: [],
					delIdsStr: ""
				},
				template:{
					edit:{
						plugIn:"weiPage_edit"
					}
				}
			},
			
			SHOP:{									//商品插件
				data:{
					plugIn:{
						plugInIdStr: "",
			             identity: "",
			             backgroundColor: "#F1F0F6",
			             bgPicUrl: "",
			             plugIntype:"SHOP",
			             showType:"WATERFALL",
			             productShowType:"CARD",
			             productShowNameEnum:"YES",
			             productShowPriceEnum:"YES",
			             productShowBuyBtnEnum:"STYLE_BTN",
			             picGap:"RETAIN",
			             subPlugInList:[]
					},
					subPlugIn:{
						plugInProductIdStr: "",
						plugInIdStr: "",
						title : "",
			            	discount: "",
			            	tag: "",
			            	picKey: "",
			            	showPicUrl: "",
			            	price: "",
			            	originalPrice: "",			            	
			            	descr: "",
			            	link: "",			            	
			            	productIdStr:"",
			            	plugIntype: "SHOP"
					}
				},
				template:{
					view:{
						plugIn:{
							WATERFALL: "product_common_view",
							LIST: "product_common_view",
							GRID: "product_common_view",
			                 BIG: "product_common_view",
			                 SWAP:"product_common_view",
						},
						subPlugIn:{
							WATERFALL: "product_common_child_view",
							LIST: "product_common_child_view",
							GRID: "product_common_child_view",
				             BIG: "product_common_child_view",
				             SWAP:"product_common_child_view"
						}
					},
					edit:{
						plugIn: "product_edit"
					}
				},
				initData:{
					subPlugInNum : 4			//初始化子插件数量
				}
			},
			
			BANNER:{								//焦点图插件
				data:{	
					plugIn:{
						plugInIdStr: "",
			            	identity: "",
			            	backgroundColor: "",
			            	bgPicUrl: "",
			            	plugIntype: "BANNER",
			            	showType: "DEFAULT",
			            	subPlugInList:[]
					},
					subPlugIn:{
						plugInCommonIdStr: "",
						plugInIdStr: "",
						name: "",
						picKey: "",
						showPicUrl: "",
						link: "",
						linkType: "CUSTOM",
						functionCode: "CUSTOM",
						buizId: "",
						buizName: "",
			            	plugInType: "BANNER"
					}
				},
				template:{
					view:{
						plugIn:{
							DEFAULT:"banner_list_view"
						},
						subPlugIn:{
							DEFAULT:"banner_list_child_view"
						}
					},
					edit:{
						plugIn:"banner_edit",
						subPlugIn:"banner_child_edit"
					}
				},
				initData:{
					subPlugInNum : 1			//初始化子插件数量
				}
			},
			
			TEXTNAVI:{									//导航插件
				data:{	
					plugIn:{
						plugInIdStr: "",
			            	identity: "",
			            	backgroundColor: "#FFFFFF",
			            	bgPicUrl: "",
			            	btnColor: "#FFFFFF",
			            	btnSelectedColor: "#138ED4",
			            	plugIntype: "TEXTNAVI",
			            	showType: "TEXTNAVI_TXT",
			            	subPlugInList:[]
					},
					subPlugIn:{
						plugInCommonIdStr: "",
						plugInIdStr: "",
						name: "",
						picKey: "",
						showPicUrl: "",
						link: "",
						linkType: "CUSTOM",
						functionCode: "CUSTOM",
						buizId: "",
						buizName: "",
						btnColor: "#FFFFFF",
		            		btnSelectedColor: "#138ED4",
			            	plugInType: "TEXTNAVI",
			            	showType: "TEXTNAVI_TXT"
					}
				},
				template:{
					view:{
						plugIn:{
							TEXTNAVI_TXT:"nav_list_view",
							TEXTNAVI_PIC:"nav_picture_view"
						},
						subPlugIn:{
							TEXTNAVI_TXT:"nav_list_child_view",
							TEXTNAVI_PIC:"nav_picture_child_view"
						}
					},
					edit:{
						plugIn:"nav_edit",
						subPlugIn:"nav_child_edit"
					}
				},
				initData:{
					subPlugInNum : 4			//初始化子插件数量
				}
			},
			
			RELATED:{									//引用页面插件
				data:{
					plugIn:{
						plugInIdStr: "",
			            	identity: "",
			            	backgroundColor: "#F1F0F6",
			            	bgPicUrl: "",	            	
			            	relatedWeiPageIdStr: "",
			            	relatedWeiPageTitle: "",
			            	plugIntype: "RELATED",
			            	showType: "DEFAULT",
					}
				},
				template:{
					view:{
						plugIn:{
							DEFAULT:"quote_view"
						}
					},
					edit:{
						plugIn:"quote_edit"
					}
				},
				initData:{
					
				}
			},
			
			BLANK:{								//占位空白插件
				data:{
					plugIn:{
						plugInIdStr: "",
		            		identity: "",
		            		backgroundColor: "#F1F0F6",
		            		bgPicUrl: "",	            		
		            		plugIntype: "BLANK",
		            		showType: "DEFAULT",
		            		width: 0,
		            		height: 0
					}	
				},
				template:{
					view:{
						plugIn:{
							DEFAULT:"space_view"
						}
					},
					edit:{
						plugIn:"space_edit"
					}
				},
				initData:{
					
				}
			},
			
			RICHTEXT:{									//富文本插件		
				data:{
					plugIn:{
						plugInIdStr: "",
			            	identity: "",
			            	backgroundColor: "#F1F0F6",
			            	bgPicUrl: "",
			            	fullscreen: "NO",			            	
			            	txtHtml: "<p>点击编辑内容</p>",
			            	plugIntype: "RICHTEXT",
			            	showType: "DEFAULT"
					}
				},	
				template:{
					view:{
						plugIn:{
							DEFAULT:"RTE_view"
						}
					},
					edit:{
						plugIn:"RTE_edit"
					}
				},
				initData:{
					
				}
			},
			
			SEARCH:{								//搜索插件
				data:{
					plugIn:{
						plugInIdStr: "",
			             identity: "",
			             backgroundColor: "",
			             bgPicUrl: "",	             
			             plugIntype: "SEARCH",
			             showType: "DEFAULT",
			             subPlugInList:[]
					},
					subPlugIn:{
						plugInCommonIdStr: "",
						plugInIdStr: "",
						name: "",
						picKey: "",
						showPicUrl: "",
						link: "",
						linkType: "CUSTOM",
						functionCode: "",
						buizId: "",
						buizName: "",
			            	plugInType: "SEARCH"
					}
				},	
				template:{
					view:{
						plugIn:{
							DEFAULT:"search_view"
						},
						subPlugIn:{
							DEFAULT:"search_child_view"
						}
					},
					edit:{
						plugIn:"search_edit",
						subPlugIn:"search_child_edit"
					}
				},
				initData:{
					subPlugInNum : 1			//初始化子插件数量
				}						
			},
			
			SHOWCASE:{						//橱窗插件
				data:{
					plugIn:{
						plugInIdStr: "",
			             identity: "",
			             backgroundColor: "",
			             bgPicUrl: "",	             
			             plugIntype: "SHOWCASE",
			             showType: "SHOWCASE_4",
			             picGap:"RETAIN",
			             name:"",
			             subName:"",
			             subPlugInList:[]
					},
					subPlugIn:{
						plugInCommonIdStr: "",
						plugInIdStr: "",
						name: "",
						subName:"",
						picKey: "",
						showPicUrl: "",
						link: "",
						linkType: "",
						functionCode: "",
						buizId: "",
						buizName: "",
						plugInType: "SHOWCASE",
						showType: "SHOWCASE_4"
					}
				},
				template:{
					view:{
						plugIn:{
							SHOWCASE_1:"showcase_view",
							SHOWCASE_2:"showcase_view",
							SHOWCASE_3:"showcase_view",
							SHOWCASE_4:"showcase_view",
							SHOWCASE_5:"showcase_view",
							SHOWCASE_6:"showcase_view",
							SHOWCASE_7:"showcase_view",
							SHOWCASE_8:"showcase_view",
							SHOWCASE_9:"showcase_view"
						},
						subPlugIn:{
							SHOWCASE_1:"showcase_child_view",
							SHOWCASE_2:"showcase_child_view",
							SHOWCASE_3:"showcase_child_view",
							SHOWCASE_4:"showcase_child_view",
							SHOWCASE_5:"showcase_child_view",
							SHOWCASE_6:"showcase_child_view",
							SHOWCASE_7:"showcase_child_view",
							SHOWCASE_8:"showcase_child_view",
							SHOWCASE_9:"showcase_child_view"
						}
					},
					edit:{
						plugIn: "showcase_edit",
						subPlugIn: "showcase_child_edit"
					}
				},
				initData:{
					subPlugInNum : 3			//初始化子插件数量
				},
				showTypeControSubPlugInNum:{
					SHOWCASE_1:2,
					SHOWCASE_2:3,
					SHOWCASE_3:4,
					SHOWCASE_4:3,
					SHOWCASE_5:6,
					SHOWCASE_6:5,
					SHOWCASE_7:4,
					SHOWCASE_8:6,
					SHOWCASE_9:1
				}
			},
			
			PRODUCT_GROUP:{			//商品分组插件
				data:{
					plugIn:{
					    plugInIdStr: "",
			            identity: "",
			            backgroundColor: "#F1F0F6",
			            bgPicUrl: "",
			            plugIntype:"PRODUCT_GROUP",
			            showType:"WATERFALL",
			            plugInSubType:"PRODUCT_GROUP_LEFT",
			            subPlugInList:[]
					},
					subPlugIn:{
						plugInCommonIdStr: "",
						plugInIdStr: "",
						name: "",
						subName:"",
						picKey: "",
						showPicUrl: "",
						link: "",
						linkType: "",
						functionCode: "",
						buizId: "",
						buizName: "",
						showCount: 5,
						plugInType: "PRODUCT_GROUP",
						showType: "WATERFALL"
					}
				},
				template:{
					view:{
						plugIn:{
							WATERFALL: "productGrop_view",
							LIST: "productGrop_view",
							GRID: "productGrop_view",
			                 BIG: "productGrop_view"
						},
						subPlugIn:{
							WATERFALL: "productGrop_child_view",
							LIST: "productGrop_child_view",
							GRID: "productGrop_child_view",
			                 BIG: "productGrop_child_view"
						}
					},
					edit:{
						plugIn: "productGrop_edit",
						subPlugIn: "productGrop_child_edit"
					}
				},
				initData:{
					subPlugInNum : 0			//初始化子插件数量
				},
			},
			
			PRODUCT_LIST:{				//商品列表插件
				data:{
					plugIn:{
						plugInIdStr: "",
		            		identity: "",
		            		backgroundColor: "#F1F0F6",
		            		bgPicUrl: "",	            		
		            		plugIntype: "PRODUCT_LIST",
		            		showType: "WATERFALL",
		            		buizId:"",
		            		buizName: ""
					}
				},
				template:{
					view:{
						plugIn:{
							WATERFALL: "productList_view",
							LIST: "productList_view",
							GRID: "productList_view",
			                 BIG: "productList_view"
						}
					},
					edit:{
						plugIn : "productList_edit"
					}
				},
				initData:{
					
				}
			}		
			
		}