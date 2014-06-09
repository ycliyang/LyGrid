
/***
 * 作者李杨
 * 联系方式 lyg_hi@163.com
 */


if(typeof Ly =='undefined'){
	Ly={};
}
	
 //自定义Js Map 
function lygMap(){

    //根据value值查找KEY
    this.findFirstKeyByValue=function (v){
        return this.key[this.getV(v)];
    }

	//指定Map索引返回值
	this.indexV=function (i){
		return this.value[i];	
	}
	
	//返回Map的Json字符串
	this.getJson=function (){
		var key=this.key;
		var value=this.value;
		var json="{";
		for(var i=0;i<this.key.length;i++){
            json+="\""+this.key[i]+"\":\""+(this.value[i]==null?"":this.value[i])+"\",";
		}
       json =  json.substr(0,json.length-1);
		return json+="}";
	}
	
	
	//根据key返回Value
	this.getK=function (k){
		var v=false;
		for(var i=0;i<this.key.length;i++){
			if(this.key[i]==k){
				v=this.value[i];
				break;
			}
		}
		return v;
	}
	
	this.getK_Length=function (k){
		var l=0;
		for(var i=0;i<this.key.length;i++){
			if(this.key[i]==k){
				l++;
			}
		}
		return l
	};
	
	//返回所有和v匹配的第一个Value值的索引
	this.getV=function (v){
		var v;
		for(var i=0;i<this.value.length;i++){
			if(this.value[i]==v){
				v=i;
				break;
			}
		}
		return v;
	}
	//返回所有和v匹配的Value值的索引
	this.getVAll=function (v){
		var v=[];
		for(var i=0;i<this.value.length;i++){
			if(this.value[i]==v){
				v.push(i);
			}
		}
		return v;
	}
	//返回长度
	this.size=function (){
		return this.value.length;	
	}
	
	//Map赋值
	this.put=function (key,value){
		this.key.push(key),
		this.value.push(value);
	}
	
	//根据KEY值删除Value、KEY
	this.removeKey=function (k){
		var l=this.key.length;
		for(var i=0;i<this.key.length;i++){
			if(this.key[i]==k){
				this.del(i);
				return true;
			}else if(this.key[l-i]==k){
				this.del(i);
				return true;
			}
			l=l-i;
			if(i==l){
				return false;
			}
		}
	}
	//根据Value匹配第一个相同Value然后删除Key 和Value
	this.removeValue=function (v){
		var l=this.value.length;
		for(var i=0;i<this.value.length;i++){
			if(this.value[i]==v){
				this.del(i);
				return true;
			}else if(this.value[l-i]==v){
				this.del(i);
				return true;
			}
			l=l-i;
			if(i==l){
				return false;
			}
		}
	}
	
	this.setMapValue=function (k,v){
		for(var i=0;i<this.key.length;i++){
			if(this.key[i]==k){
				this.value[i]=v;
				return true;
			}
		}
		return false;
	}
	
	//根据Value匹配所有相同的Value然后删除Key 和Value
	this.removeValueAll=function (v){
		var l=this.value.length;
		for(var i=0;i<this.value.length;i++){
			if(this.value[i]==v){
				this.del(i);
			}else if(this.value[l-i]==v){
				this.del(i);
			}
			l=l-i;
			if(i==l){
				return true;
			}
		}
	}
	//删除所有KEY 和Value
	this.removeAll=function (){
		this.key=[];
		this.value=[];	
	}	
	
	//给一个索引值然后删除应的数据然后再把说有的数据位移一下
	this.del=function (i){
		for(i;i<this.key.length;i++){
			this.key[i]=this.key[i+1];
			this.value[i]=this.value[i+1];
		}
		this.key.pop();
		this.value.pop();	
	}
	
    //Map赋值（根据KEY判断Map然后覆盖原有的值）
	this.editPut=function (k,v){
		if(this.getK(k)!=false){
			this.setMapValue(k,v);
		}else {
			this.put(k,v);
		}
	}
	
	this.key=[];
	this.value=[];
	
	this.toString=function (){
		return this.getJson();
	}
}

(function (){
	function onKey(){
	   
		//监听键盘事件
		//var editGrid;
		ctrlKey=false;
		shiftKey=false;
		enter=false;
		this.onKeyDown=function (e) {
			if(navigator.appName == "Microsoft Internet Explorer"){
				var keycode = event.keyCode;   
				var realkey = String.fromCharCode(event.keyCode);   
			}else{
				var keycode = e.which;   
				var realkey = String.fromCharCode(e.which);   
			}
			var keycode=0,e=e||event;
			keycode=e.keyCode||e.which||e.charCode;
			var realkey=String.fromCharCode(keycode);
			if(keycode==17){
				ctrlKey=true;
			}else if(keycode==16){
				shiftKey=true;
			}else if(keycode==13){
				if(editGrid){
					editGrid.enterKey();
				}
				enter=true;
			}
		} 

		this.onKeyUp=function (e){
			if(navigator.appName == "Microsoft Internet Explorer"){
				var keycode = event.keyCode;   
				var realkey = String.fromCharCode(event.keyCode);   
			}else{
				var keycode = e.which;   
				var realkey = String.fromCharCode(e.which);   
			}
			if(keycode==17){
				 ctrlKey=false;
			}else if(keycode==16){
				 shiftKey=false;
			}else if(keycode==13){
				enter=false;
			}
		}
	}
	

	
 //处理Tbale列表选中功能
	function RoadGridSelection (){
		this.selectionId=[];//当前选择行的id
		this.uid=null;//基准id
		this.billid=[];//清单ID数值
		this.itemsid=[];//分项ID数值
		this.TD;
		this.Acolor="";
		this.Bcolor="#EEEE66";
		this.checkedLock=false;
		this.tableid;
		this.TdBackgroundColor=function (td,color){
			
			for(var i=0;i<td.length;i++){
				//点击列表前触发事件
				if(this.beforeClick&&color==this.Bcolor){
					var clickEorr=this.beforeClick(td[i].parentNode);
					if(clickEorr==false){
						return false;
					}
				}
				td[i].style.backgroundColor=color;
				var ss=td[i].style.backgroundColor;
			}
			try{
				var inp=td[0].parentNode.getElementsByTagName("input");
				if(inp.length>0&&inp[0].type=="checkbox"){
					if(color==this.Bcolor){
						var che=inp[0].checked=true;
					}else {
						var che=inp[0].checked=false;
					}
				}
			}catch(e){
				
			}
			return true;
		}
		//触发事件点击触发事件
		this.onClick;
		//点击前触发事件
		this.beforeClick;
		this.onCheckboxClick;
		//点击复选框是触发方法
		this.onClickCheckbox=function (obj){
			if(obj.value=="yes"){
				var che=document.getElementsByName(obj.name+"");
				for(var ch=1;ch<che.length;ch++){
					che[ch].checked=obj.checked;
					this.onClickCheckboxs(che[ch]);
				}
			}else {
				this.onClickCheckboxs(obj);
			}
			
			if(this.onClick){
				this.onClick();
			}
		};
		
		this.onClickCheckboxs=function (obj){
			var dl=obj.parentNode.parentNode;
			var td=dl.getElementsByTagName("td");
			if(obj.checked){
				this.TdBackgroundColor(td,this.Bcolor);
				this.checkedLock=true;
				this.uid=dl.id;
				this.selectionId.push(this.uid);
			}else {
				this.checkedLock=true;
				this.TdBackgroundColor(td,this.Acolor);
				this.selectionId=this.arraySplice(this.selectionId,dl.id);
			}
			if(this.onCheckboxClick){
				this.onCheckboxClick(obj.checked,dl,this.billid[dl.id]);
			}
		};
		
		this.arraySplice=function (ar,str){
			for(var i=0;i<ar.length;i++){
				if(ar[i]==str){
					ar.splice(i,1);
					i--;
				}
			}
			return ar;
		};
		

		this.changeActiveRow=function (obj,uids){
			if(this.checkedLock){
				//alert(this.checkedLock);
				this.checkedLock=false;
				return false;
			}
			//点击列表前触发事件
			if(this.beforeClick){
				var clickEorr=this.beforeClick(obj);
				if(clickEorr==false){
					return false;
				}
			}
			this.selectionId.push(uids);
			if(uids<10000){
				midmslXnodelleafid=this.billid[uids];
			}
			if(this.uid==null){
				if(this.TD){
					 this.TdBackgroundColor(this.TD,this.Acolor);
				 }
				 this.TD=obj.getElementsByTagName("td");  
				 this.TdBackgroundColor(this.TD,this.Bcolor);
				 this.uid=uids;
			}else if(this.uid<10000&&uids>9999){
				 if(this.TD){
				 this.setTableBackground(uids);
				 this.TdBackgroundColor(this.TD,this.Acolor);
				 }
				 this.TD=obj.getElementsByTagName("td");  
				 this.TdBackgroundColor(this.TD,this.Bcolor);
				 this.uid=uids;
			}else if(this.uid>9999&&uids<10000){
				 if(this.TD){   
				 this.setTableBackground(uids);
				 this.TdBackgroundColor(this.TD,this.Acolor);
				 }
				 this.TD=obj.getElementsByTagName("td");  
				 this.TdBackgroundColor(this.TD,this.Bcolor);
				 this.uid=uids;
			}else if(ctrlKey&&shiftKey){
				if(this.uid>uids){
					for(;uids<=this.uid;uids++){
						var dl=this.getDl(uids);
						var td=dl.getElementsByTagName("td"); 
						this.TdBackgroundColor(td,this.Bcolor);
						this.selectionId.push(uids);
					}
				}else if(this.uid<uids){
					for(;uids>=this.uid;uids--){
						//var dl=document.getElementById(uids);
						var dl=this.getDl(uids);
						var td=dl.getElementsByTagName("td"); 
						if(this.TdBackgroundColor(td,this.Bcolor)){
							this.selectionId.push(uids);
						}
					}
				}else {
					return false;
				}
			}else if(ctrlKey){
				//var dl=document.getElementById(uids);
				var dl=this.getDl(uids);
				var td=dl.getElementsByTagName("td"); 
				this.TdBackgroundColor(td,this.Bcolor);
			}else if(shiftKey){
				if(this.uid>uids){//取小于uid 大于uids 
					for(var i1=0;i1<this.selectionId.length;i1++){
						if(this.selectionId[i1]>this.uid||this.selectionId[i1]<uids){
							var dl=document.getElementById(this.selectionId[i1]);
							var td=dl.getElementsByTagName("td"); 
							this.TdBackgroundColor(td,this.Acolor);
							
						}
					}
					
					for(;uids<=this.uid;uids++){
						var dl=this.getDl(uids);
						var td=dl.getElementsByTagName("td");
						if(this.TdBackgroundColor(td,this.Bcolor)){
							this.selectionId.push(uids);
						}
					}
				}else if(this.uid<uids){//取大于uid 小于uids 
				
					for(var i2=0;i2<this.selectionId.length;i2++){
						if(this.selectionId[i2]<this.uid||this.selectionId[i2]>uids){
							var dl=document.getElementById(this.selectionId[i2]);
							var td=dl.getElementsByTagName("td"); 
							this.TdBackgroundColor(td,this.Acolor);
						}
					}
					
					for(;uids>=this.uid;uids--){
						var dl=this.getDl(uids);
						var td=dl.getElementsByTagName("td"); 
						if(this.TdBackgroundColor(td,this.Bcolor)){
							this.selectionId.push(uids);
						}
					}
				}else {
					return false;
				}
			}else{
				 if(this.TD){
					 this.setTableBackground(uids);
					 this.TdBackgroundColor(this.TD,"");
				 }
				 this.TD=obj.getElementsByTagName("td");  
				 this.TdBackgroundColor(this.TD,this.Bcolor);
				 this.uid=uids;
			}
			
			if(this.onClick){
				this.onClick();
			}
		};
		
		this.setTableBackground=function (uids){
			for(var i=0;i<this.selectionId.length;i++){
				var dl=this.getDl(this.selectionId[i]);
				this.TdBackgroundColor(dl.getElementsByTagName("td"),this.Acolor);
			}
			 this.selectionId=[];
			 this.selectionId.push(uids);
		};
		
		this.getDl=function (obj){
			var table=document.getElementById(this.id);
			var dl=table.getElementsByTagName("dl");
			if(!dl.length>0){
				dl=table.getElementsByTagName("tr");
			}
			for(i1=0;i1<dl.length;i1++){
				if(dl[i1].id==obj){
					return dl[i1];
				}
			}
		};
		
//		this.onMouseOver=function(obj,uids){
//			
//			 for(var i=0;i<this.selectionId.length;i++){
//				if(uids==this.selectionId[i]){return false;}
//			}
//			var td=obj.getElementsByTagName("td");  
//			this.TdBackgroundColor(td,"#F2F2F2");
//			
//		};
	
//		this.onMouseOut=function(obj,uids){
//			for(var i=0;i<this.selectionId.length;i++){
//				if(uids==this.selectionId[i]){return false;}
//			}
//			var td=obj.getElementsByTagName("td");  
////			this.TdBackgroundColor(td,"");	
//		};
		this.leaf=false;
		this.getSelectionIdAll=function (){
			this.disposeSelectionId();
			var billIdArry=this.selectionId;
			var sid=[];
			if(billIdArry[0]>9999){
				this.leaf=true;
				for(var s=0;s<billIdArry.length;s++){
					sid.push(this.itemsid[(billIdArry[s]-10000)]);
				}
			}else{
				this.leaf=false;
				for(var s1=0;s1<billIdArry.length;s1++){
					sid.push(this.billid[billIdArry[s1]]);
				}
			}
			return sid;
		};
			
		this.disposeSelectionId=function (){
			for (var i = 0; i < this.selectionId.length; i++) {
				var id = this.selectionId[i];
				for (var l = i + 1; l < this.selectionId.length; l++) {
					var id1 = this.selectionId[l];
					if (id1 == id) {
						this.selectionId.splice(l, 1);
						l--;
					}
				}
			}
		};
	}
   
   //保存编辑后的列表数据
	function EditGrid(){
		this.editMap=new lygMap();
        this.editCellMap = new lygMap();
		this.td;
		this.txt;
		this.label;
		this.tr;
		this.gridMap=new lygMap();
		this.tdName;
		
		this.dlOnMouseOver;
		this.dlOnMouseOut;
		this.dlOnClick;
		this.tdOnClick;
		
		var td;
		this.editTd=function (){
			if(this.td&&this.td.parentNode){
				//启用上次禁用的触发事件
				this.td.parentNode.onmouseover=this.dlOnMouseOver;
				this.td.parentNode.onmouseout=this.dlOnMouseOut;
				this.td.parentNode.onclick=this.dlOnClick;
				if(this.tdOnClick){
					this.td.onclick=this.tdOnClick;
				}
			}
			if(td){
				//禁用对应的触发事件
				this.dlOnMouseOver=td.parentNode.onmouseover;
				this.dlOnMouseOut=td.parentNode.onmouseout;
				this.dlOnClick=td.parentNode.onclick;
				td.parentNode.onmouseover=null;
				td.parentNode.onmouseout=null;
				td.parentNode.onclick=null;
				if(td.onclick){
					this.tdOnClick=td.onclick;
					td.onclick=null;
				}
				td=null;
			}
			if(this.td){
                var labelHtml;
                if(typeof this.header.getK(this.tdName).renderder=="function"){
                    labelHtml=this.header.getK(this.tdName).renderder(this.txt.value);
                }else {
                    labelHtml=this.txt.value;
                }
				//如果数据没有编辑就不保存到已编辑的map里面
				if(this.label.innerHTML+""!=labelHtml+""){
                    var eCellMap = this.editCellMap.getK(this.tr.id)?this.editCellMap.getK(this.tr.id):new lygMap();
					this.emap=this.gridMap.getK(this.tr.id);
					this.emap.editPut(this.tdName,this.txt.value);
                    eCellMap.editPut(this.tdName,this.txt.value);
					if(this.afteredit){
						this.afteredit();
					}
					var ep=this.emap;
					for(var i=0;i<this.emap.size();i++){
						var tds=this.tr.getElementsByTagName("td");
//						this.tr.getElementsByName(this.emap.key[i])[0].className="lygEditCell";
//						console.log(this.tr.getElementsByName(this.emap.key[i])[0].className);
						for(var i1=0;i1<tds.length;i1++){
							var name=tds[i1].attributes["name"].value;
							var k=this.emap.key[i];
							if(name==this.emap.key[i]){
                                var tempHTML;
                                if(typeof this.header.getK(this.emap.key[i]).renderder=="function"){
                                    tempHTML=this.header.getK(this.emap.key[i]).renderder(this.emap.value[i]);
                                }else {
                                    tempHTML=this.emap.value[i];
                                }
								if(tds[i1].getElementsByTagName("label")[0].innerHTML!=tempHTML){
									tds[i1].getElementsByTagName("label")[0].innerHTML=tempHTML;
									//tds[i1].style.background="url(image/tdEdit.jpg)";
									tds[i1].className='lygEditCell';
									break;
								}
							}
						}
					}
				    //保存编辑过的清单信息
					this.editMap.editPut(this.tr.id,this.emap);
                    this.editCellMap.editPut(this.tr.id,eCellMap);
					//console.log(this.gridMap.size()+" : "+this.editMap.size());
					
					var editMap=this.editMap;
                    this.label.innerHTML=labelHtml;
					this.label.style.display="";
					this.div.style.display="none";
				}else {
					this.label.style.display="";
					this.div.style.display="none";
				}
			}
		};
		this.div;
		this.edit=function (obj,name){
			td=obj;
			editGrid=this;
			this.editTd();
			this.tdName=name;
			this.td=obj;
			this.label=this.td.getElementsByTagName("label")[0];
            this.div = this.td.getElementsByTagName("div")[0];
            this.div.style.display="";//设置为可以显示
			this.txt=this.div.getElementsByTagName(this.div.attributes["value"].value)[0];
            if(typeof this.header.getK(name).getValue=="function"){
                this.txt.value=this.header.getK(name).getValue(this.label.innerHTML);
            }else {
                this.txt.value=this.label.innerHTML;
            }
			this.txt.style.width=this.td.width-3;
			this.txt.focus();
			this.label.style.display="none";//设置为隐藏
//			this.text.width=this.td.width;
			this.tr=this.td.parentNode;//找父组件
			//this.selectionId.push(this.tr.id);
			this.changeActiveRow(this.tr,this.tr.id);
		};
		this.enterKey=function (){
			this.editTd();
			this.td=null;
		};
	};
  

		
	
		//var raodGrids;
		//var editGrid;
		
		function lygGrid(c){
			this.name=c.name;
			
			/***为本组件添加触发事件*******************************************************************************/
			this.afteredit;//编辑后触发事件
			this.onRefresh;//列表刷新后触发事情
			if(c.listeners){
				if(tc.listeners.afteredit){
					this.afteredit=c.listeners.afteredit
				}
			}
			
			this.on=function(name, listener){
				switch(name.toLowerCase()){
					case "afteredit":
						this.afteredit=listener;
						break;
					case "refresh":
						this.onRefresh=listener;
						break;
					case "click":
						this.onClick=listener;
						break;
					case "beforeclick":
						this.beforeClick=listener;
						break;
					case "oncheckboxclick":
						this.onCheckboxClick=listener;
					default:
						break;
				}
			};
			
			this.checkBoxSelection=function (id){
				var checkBoxAll=0;
				var checkBox=document.getElementsByName(this.name+"checkBox");
				for(var i=0;i<id.length;i++){
					for(var i1=0;i1<this.billid.length;i1++){
						if(id[i]==this.billid[i1]){
							this.selectionId.push(i1);
							checkBox[i1+1].checked=true;
							var dl=checkBox[i1+1].parentNode.parentNode
							var td=dl.getElementsByTagName("td");
							this.TdBackgroundColor(td,this.Bcolor);
							checkBoxAll++;
							if(checkBoxAll==this.billid.length){
								checkBox[0].checked=true;
							}
						}
					}
				}
			};

            this.sort={
                p:{},
                put:function (v){
                    this.p = {};
                    this.p[v.key]= v.value;
                },
                toUrl:function (){
                    var url=new Array();
                    for(var key in this.p){
                        url.push(key +" "+this.p[key]);
                    }
                    return url.toString();
                }
            };

            this.clickHead=function (obj){

                var lbs = obj.parentNode.getElementsByClassName("headSort");
                for(var i = 0;i<lbs.length;i++){
                    lbs[i].style.visibility="hidden";
                }
                var lb = obj.getElementsByClassName("headSort")[0];
                lb.style.visibility="visible";

                var st = {
                    key:obj.attributes.name.value
                };
                if(lb.innerHTML=="↑"){
                    lb.innerHTML="↓";
                    st.value="desc";
                }else{
                    lb.innerHTML="↑";
                    st.value="asc";
                }

                c.pageToolbar.url = c.actions.read;
                var urls = c.pageToolbar.url.split("?");
                var sort="";
                this.sort.put(st);
                if(urls.length>1){
                    c.pageToolbar.url+="&sort="+this.sort.toUrl();
                }else {
                    c.pageToolbar.url+="?sort="+this.sort.toUrl();
                }
                c.pageToolbar.refresh("refresh");

            }
			
			//判断序列
			var rowDivNum=10000;
			var trDivNum=0;
			var table;
			var header=new lygMap();
            this.header = new lygMap();
			this.paramsRefresh=function (){
				this.removeRowMap=new lygMap();
				rowDivNum=10000;
				trDivNum=0;	
				table="";
				this.selectionId=[];//当前选择行的id
				this.uid=null;//基准id
				this.billid=[];//清单ID数值
				this.itemsid=[];//分项ID数值
				this.TD;
				this.Acolor="";
				this.Bcolor="#EEEE66";
				this.checkedLock=false;
				this.id=c.id;
				this.tableid=c.id;
				//this.raodGrids=new RoadGridSelection();
				//this.editMap=new lygMap();
				this.td;
				this.txt;
				this.label;
				this.tr;
				this.gridMap=new lygMap();
				this.removedArray=new Array();//已删除的数据
				this.tdName;
				this.dlOnMouseOver;
				this.dlOnMouseOut;
				this.dlOnClick;
				this.tdOnClick;
			};
			
			this.paramsRefresh();
			
			this.json=c.json;
			this.id;
			this.columns;
			this.headDiv;
			this.contextDiv;
			var realWidth=new Number();
			var thisLyg=this;
			var dateModel={};//数据模型
			var contextDiv;
			(function (){
			
//数据格式化*************************************************************************************************************
				if(c.columns){
					for(var i=0;i<c.columns.length;i++){
						if(!c.columns[i]['header']||c.columns[i]['header']==null)
							c.columns[i]['header']="&nbsp;";
						if(!c.columns[i]['edit']||c.columns[i]['edit']==null)
							c.columns[i]['edit']=false;
						if(!c.columns[i]['width']||c.columns[i]['width']==null)
							c.columns[i]['width']=100;
						if(!c.columns[i]['rowspan']||c.columns[i]['rowspan']==null)
							c.columns[i]['rowspan']=1;
						if(!c.columns[i]['css']||c.columns[i]['css']==null)
							c.columns[i]['css']="";
                        if(!c.columns[i]['style']||c.columns[i]['style']==null)
                            c.columns[i]['style']="";
						if(!c.columns[i]['type']||c.columns[i]['type']==null)
							c.columns[i]['type']="String";
						
						realWidth+=new Number(c.columns[i]['width']);
						
						dateModel[c.columns[i]['dataIndex']]="";
					}
				}				
				if(typeof c.tableWidth =='string'){
					if(c.tableWidth!='auto'){
						realWidth=c.tableWidth;
					}
				}
//表头处理*************************************************************************************************************

				var d=document.getElementById(c.div);
				this.headDiv=document.createElement("div");
				contextDiv=document.createElement("div");
				this.headDiv.className="lygGridHead";
				this.headDiv.id=c.id+"head";
				this.headDiv.style.overflow="hidden";
				if(c.height){
                    if(typeof  c.width == 'Number'){
                        this.headDiv.style.width=c.width-17;
                    }
				}else {
					this.headDiv.style.width=c.width;
				}
				contextDiv.id=c.id+"Context";
				contextDiv.className="lygGridContextDiv";
				contextDiv.style.width=c.width;
				contextDiv.style.height=c.height;
				contextDiv.onscroll=(function (){
					var head=this.headDiv;
					return function (){
						head.scrollLeft=this.scrollLeft;
					}
				})();
				document.onkeydown=thisLyg.onKeyDown;
				document.onkeyup=thisLyg.onKeyUp;
				
				/*d.onkeydown=(function (){
					var r=thisLyg;
					return function (){
						r.onKeyDown();
					}
				})();
				d.onkeyup=(function (){
					var r=thisLyg;
					return function (){
						r.onKeyUp();
					}
				})();*/
				/***************************************************************************************/
				
				var columns=new String("<table class='lygGridHead' width='"+c.tableWidth+"'><thead>");
				//原始表头信息
				var rowMap=new lygMap();
				//2013-8-25 之前
//				if(c.sm){
//					if(c.sm.RowNumberer){
//						columns+="<th >"+c.sm.RowNumberer.header+"</th>";
//					}
//					if(c.sm.checkBox){
//						if(c.sm.checkBox){	
//							columns+="<th ><input type=checkbox name="+(c.name)+"checkBox   name="+(c.name)+"checkBox  onclick='"+c.name+".onClickCheckbox(this)' value=yes /></th>";
//						}
//					}
//				}
				
				var cs=[];//重新拷贝一个对象
				for(var i=0;i<c.columns.length;i++){
					var s={};
					for(var l in c.columns[i]){
						s[l]=c.columns[i][l];
					}
					cs.push(s);
				}
				if(c.columnHeaderGroup){
					for(var i=0;i<c.columnHeaderGroup.length;i++){
						columns+="<tr>";
						var row=c.columnHeaderGroup[i].row;
						var j=0;
						for(var i1=0;i1<row.length;i1++){
							var h=row[i1];
							var i2=0;
							if(i1!=0){i2=h.colspan;}
							for(;i2<cs.length;i2++){
								var s=cs[i2].rowspan;
								if(s.rowspan-1==c.columnHeaderGroup.length-i){
									columns+="<th rowspan="+s.rowspan+" width="+h.width+"  style='"+cs[i].style+"' class='"+cs[i].css+"' >"+s.header+"</th>";
									cs.splice(i2,1);
									i2--;
								}else {
									break;
								}
							}

							columns+="<th width="+h.width+"  class='"+cs[i].css+"' style='"+cs[i].style+"'" ;
							if(h.rowspan){columns+=" rowspan="+h.rowspan}
							if(h.colspan){columns+=" colspan="+h.colspan}
							columns+=" >";
							columns+=h.header+"</th>";
							j+=parseFloat(h.colspan);
							if(j<cs.length&&cs[j].rowspan-1==c.columnHeaderGroup.length-i){
								columns+="<th width="+h.width+"  class="+cs[i].css+" style='"+cs[i].style+"' rowspan="+cs[j].rowspan+">"+cs[j].header+"</th>";
								cs.splice(j,1);
							}
						}
						columns+="</tr>";
					}
				}
				
				
				columns+="<tr>";
				//2013-8-5 之后
				if(c.sm){
					if(c.sm.checkBox){
                        columns+="<th>";
                        if(c.sm.rowNumber){
                            columns+=""+c.sm.rowNumber.header+" ";
                        }
						if(c.sm.checkBox){	
							columns+="<input type=checkbox name='"+(c.name)+"checkBox' onclick='"+c.name+".onClickCheckbox(this)' value=yes />";
						}
                        columns+="</th>";
					}
				}
                for(var i=0;i<cs.length;i++){
                    columns+="<th width='"+cs[i].width+"'class='"+cs[i].css+"' style='"+cs[i].style+"'";
                    if(cs[i].sort){
                        columns+=" onclick='"+c.name+".clickHead(this)' name='"+cs[i].dataIndex+"'>"+cs[i].header+"<label class='headSort'>↑</label>";
                    }else {
                        columns+=">"+cs[i].header+"";
                    }
                    columns+="</th>";
                }
				columns+="</tr>" +
						"</thead></table>";
				
				this.headDiv.innerHTML=columns;
				d.appendChild(this.headDiv);
				d.appendChild(contextDiv);
				d.className+="lygGridPanel";
				
				if(c.pageToolbar){
					d.appendChild(c.pageToolbar.bottomDiv);
					c.pageToolbar.url=c.actions.read;
					c.pageToolbar.initListener();
					c.pageToolbar.parent=thisLyg;
					this.pagetToolbar=c.pageToolbar;
				}
				
				
			})();
			
			
			this.refresh=function (p){
				//contextDiv.innerHTML="";
				if(p){
					if(p.json){
						this.json=p.json
					}
				}
				this.paramsRefresh();
				this.table="<table class='lygGridTable' border=1 id="+c.id+" style='max-height:"+c.tableHeight+"' width='"+c.tableWidth+"' >";
/**********************************************列表处理***************************************************/
				header=new lygMap();
//				if(){
//					
//				}
				
				for (var i=0;i<c.columns.length;i++){
					header.put(c.columns[i].dataIndex,c.columns[i]);
                    this.header.put(c.columns[i].dataIndex,c.columns[i]);
				}
				
				var rowHeader=new lygMap();
				//跨行信息
				if(c.tableRow){
					for (var w1=0;w1<c.rowColumns.length;w1++){
						rowHeader.put(c.rowColumns[w1].dataIndex,c.rowColumns[w1].header);
					}
					if(rowHeader.size()>0){
						for(var d3=0;d3<rowHeader.size();d3++){
							header.removeKey(rowHeader.key[d3]);
						}
					}
					for(var i=0;i<this.json.length;i++){
						var j=this.json[i];
						table+="<tr>";
						var rowtr="";
						var ctr="";
						for(var p=0;p<c.rowColumns.length;p++){
							var ns=c.rowColumns[p];
							var row=j[c.columnsRoot].length;
							var data="";
							data+=j[ns.dataIndex];
							rowtr+="<td rowSpan="+parseInt(row)+">"+data+"</td>";
						}
						if(j[c.columnsRoot].length>0){
							ctr=this.createTr(0,j[c.columnsRoot],header,true);
						}
						if(c.rowColumnsId){
							this.itemsid.push(j[c.rowColumnsId]);
						}else {this.itemsid.push(j["id"]);}
						table+="<dl id="+rowDivNum+" onclick="+c.name+".changeActiveRow(this,"+rowDivNum+"); onMouseOver='"+c.name+".onMouseOver(this,"+rowDivNum+")'; onMouseOut='"+c.name+".onMouseOut(this,"+rowDivNum+")'>"+rowtr+"</dl>"+
						ctr;
						rowDivNum++
						table+="</tr>";
						if(j[c.columnsRoot].length>0){
							table+=this.createTr(1,j[c.columnsRoot],header);
						}
					}
				}else {
					this.table+=this.createTr(0,this.json,header);
				}
				if(this.json[0]){
					if(this.json.length==1&&this.json[0].id==0){
						if(this.customStr){
							this.table+=this.customStr;
						}
					}
				}else {
					if(this.json){
						if(this.json.length==0){
							if(this.customStr){
								this.table+=this.customStr;
							}
						}
					}
				}
				if(contextDiv){
					contextDiv.innerHTML=this.table;
				}
				if(this.onRefresh){
					this.onRefresh();
				}
				var d=[new Object(),new Object(),new Object(),new Object()];
					d.splice(1,1);
				d=contextDiv.getElementsByTagName("dl");
				if(d.length==0){
					d=contextDiv.getElementsByTagName("tr");
					//d.splice(1,1);
				}
				for(var i=0;i<d.length;i++){
					var t=d[i];
					var l=this;
					t.onclick=(function (){
						//var s=this.changeActiveRow;
						var r=l;
						var s=t;
						return function (){
							r.changeActiveRow(s,s.id);
						};
					})();
				}
			};
			
			var bkIndex=0;
			
			this.createTr=function(i,json,header,tableRow,flag){
				var table=new String("");
				for(;i<json.length;i++){
					var tr=new String("");
					var map=new lygMap();
					var j=json[i];
					/*if(!tableRow){
						tr+="<tr id="+trDivNum+" onclick="+c.name+".raodGrids.changeActiveRow(this,"+trDivNum+"); onMouseOver='"+c.name+".raodGrids.onMouseOver(this,"+trDivNum+")'; onMouseOut='"+c.name+".raodGrids.onMouseOut(this,"+trDivNum+")'>";
					}else {
						tr+="<dl id="+trDivNum+" onclick="+c.name+".raodGrids.changeActiveRow(this,"+trDivNum+"); onMouseOver='"+c.name+".raodGrids.onMouseOver(this,"+trDivNum+")'; onMouseOut='"+c.name+".raodGrids.onMouseOut(this,"+trDivNum+")'>";
					}*/
					if(!tableRow){
						tr+="<tr id="+c.id+trDivNum+" class="+(bkIndex==0?"lygGridTableTrA":"lygGridTableTrB")+">";
					}else {
						tr+="<dl  id="+c.id+trDivNum+">";
					}
					if(bkIndex==1){
						bkIndex=0;
					}else {
						bkIndex++;
					}
					tr+=this.sm();
					for(var p=0;p<header.size();p++){
						var h=header.value[p];
						var k=header.key[p];
                        var text = h.renderder? h.renderder(j[k]):j[k];
						if(c.edit&&h.edit){
                            var nodeStr="";
                            var nodeTyp="";
                            if(typeof  h.editModel =="object"){
                                if(typeof h.editModel.type =="string"&&typeof h.editModel.createNode=="function"){
//                                if(typeof h.editModel.type =="string"&&h.editModel.createNode){
                                    nodeStr= h.editModel.createNode(j,k);
                                    nodeTyp= h.editModel.type;
                                }
                            }
                            if(nodeStr==""){
                                nodeStr="<input type='text'>";
                                nodeTyp="input";
                            }

							tr+="<td name="+k+" width="+h.width+" class='"+h.css+"' style='"+h.style+"' onclick="+c.name+".edit(this,'"+k+"')>"+
							"<label>"+text+"</label><div class='tdEdit' style=display:none value='"+nodeTyp+"'>"+ nodeStr +"</div></td>";
						}else {
							tr+="<td name="+k+" width="+h.width+" style='"+h.style+"' class='"+h.css+"'><label>"+text+"</label></td>";
						}
					}
					if(j.id){
						this.billid.push(j.id);
					}
					for(var j1 in j){
						map.put(j1,j[j1]);
					}
					this.gridMap.put(c.id+trDivNum,map);
					if(flag&&flag.append==true){
						this.editMap.put(c.id+trDivNum,map);
					}
					trDivNum++;
					if(tableRow){
						tr+="</dl>";
						break;
					}else {
						tr+="</tr>";
						table+=tr;
					}
				}
				return table;
			};


            this.createRemindRow=function (i,json,header,tableRow,flag){
                var table=new String("");
                for(;i<json.length;i++){
                    var tr=new String("");
                    var j=json[i];
                    tr+="<tr id="+c.id+trDivNum+" class="+(bkIndex==0?"lygGridTableTrA":"lygGridTableTrB")+">";
                    if(bkIndex==1){
                        bkIndex=0;
                    }else {
                        bkIndex++;
                    }
                    for(var p=0;p<header.size();p++){
                        var h=header.value[p];
                        var k=header.key[p];
                        var text = h.renderder? h.renderder(j[k]):j[k];
                        tr+="<td name="+k+" width="+h.width+" style='"+h.style+"' class='"+h.css+"'><label>"+text+"</label></td>";
                    }
                    if(j.id){
                        this.billid.push(j.id);
                    }
                    trDivNum++;
                    tr+="</tr>";
                    table+=tr;
                }
                return table;
            };

//			this.addRow=function (){
//				var tr=document.createElement("tr");
//				tr.id=c.id+trDivNum;
////				tr+="<tr id='"+trDivNum+"'>";
//				var s=c.columns;
//				var map=new lygMap();
//				var k;
//				tr.innerHTML+=this.sm();
//				for(var p=0;p<header.size();p++){
//					var h=header.value[p];
//					k=header.key[p];
//					if(c.edit&&h.edit){
//						tr.innerHTML+="<td name="+k+" width='"+h.width+"' style='"+h.css+"' onclick="+c.name+".edit(this,'"+k+"')>"+
//						"<label>"+this.ofType(h.type)+"</label><input type=text  style=display:none></td>";
//					}else {
//						tr.innerHTML+="<td name="+k+" width='"+h.width+"' style='"+h.css+"'><label>"+this.ofType(h.type)+"</label></td>";
//					}
//				}
//				alert(tr.innerHTML);
//				
//				map.put(k,"");
////				tr+="</tr>";
//				this.gridMap.put(trDivNum,map);
//				this.editMap.put(trDivNum,map);
//				trDivNum++;
//				var table=document.getElementById(c.id);
//				table.appendChild(tr);
//				
//				return tr;
//			};

			this.addRow=function (){
				var table=document.getElementById(c.id);
				var json=new Array();
				json.push(dateModel);
				table.innerHTML+=this.createTr(0,json,header,null,{
					append:true
				});
			};
			
			this.ofType=function (obj){
				switch(obj){
					case "String":return "";
					case "float":return "0.0";
					case "int":return "0";
				}
			};
						
			this.sm=function (){
				var tr="";
				if(c.sm){
                    tr+="<td name="+(c.name)+"td >"
                    if(c.sm.rowNumber){
                        tr+="<label>"+(trDivNum+1)+"</label> ";
                    }
					if(c.sm.checkBox){
						if(c.sm.checkBox){
							tr+="<input type=checkbox name="+(c.name)+"checkBox  onclick='"+c.name+".onClickCheckbox(this)' />";
						}
					}
                    tr+="</td>"
				}
				return tr;
			};
			
			this.removeRows=function (){
				var tbody=document.getElementById(c.id).getElementsByTagName("tbody")[0];
				for(var i=0;i<this.selectionId.length;i++){
					if(this.gridMap.key[i]!=0){
						this.removedArray.push(this.gridMap.indexV(i));
					}else{
						this.editMap.removeKey(i);
					}
					this.gridMap.removeKey(i);
					tbody.removeChild(document.getElementById(this.selectionId[i]));
				}
			};
            this.postData=function (url,data,type,fn){
                if(type=="json"){
                    Ly.util.postJson(url,"["+data+"]",function (json){
                        if(fn){
                            fn();
                        }
                    });
                }else {
                    Ly.util.post(url,"json="+data,function (json){
                        if(fn){
                            fn();
                        }
                    });
                }
            }

            this.cellSaveSuccess=function (id,name){
                var tds = document.getElementById(id).getElementsByTagName("td");
                for(var i=0;i<tds.length;i++){
                    if(tds[i].attributes["name"].value==name){
                        tds[i].className = tds[i].className.replace(/lygEditCell/,"");
                        break;
                    }
                }
            }

			var  instance=this;
			this.sync=function () {
//				alert("已删除数据："+this.removedArray.length+"条");
				this.updateArray=new Array();
				this.addArray=new Array();
                this.updateCellArray = new Array();
                var updateObjArray=new lygMap();
                var updateCellObjArray=new lygMap();
				for(var i=0;i<this.editMap.size();i++){
					if(this.editMap.indexV(i).getK("id")==""){
						this.addArray.push(this.editMap.indexV(i).getJson());
					}else {
                        updateObjArray.put(this.editMap.key[i],this.editMap.value[i]);
                        updateCellObjArray.put(this.editCellMap.key[i],this.editCellMap.value[i]);
						this.updateArray.push(this.editMap.indexV(i).getJson());
                        this.updateCellArray.push(this.editCellMap.indexV(i).getJson());
					}
				}
				this.editMap=new lygMap();
                this.editCellMap = new lygMap();
//				alert("已添加："+addArray.length+"条");
//				alert("已修改："+updateArray.length+"条");
				if(this.updateArray.length>0&&typeof  c.actions.onUpdate!="function"){
                    this.postData(c.actions.update,this.updateArray,c.actions.post,function (){
                        instance.updateArray=new Array();
                        instance.syncSuccess();
                    });
				}else if(typeof  c.actions.onUpdate == "function"){
                    c.actions.onUpdate(updateObjArray,updateCellObjArray);
                }

				if(this.addArray.length>0){
                    this.postData(c.actions.create,this.addArray,c.actions.post,function (){
                        instance.addArray=new Array();
                        instance.syncSuccess();
                    });
				}

				if(this.removedArray.length>0){
                    this.postData(c.actions.destory,this.removedArray,c.actions.post,function (){
                        instance.removedArray=new Array();
                        instance.syncSuccess();
                    });
				}
			};
			
			this.syncSuccess=function (){
				if(this.updateArray.length==0&&this.addArray.length==00&&this.removedArray.length==0){
					alert("数据更新成功！");
					c.pageToolbar.refresh("refresh");
				}
			};

            this.getPageToolbar=function (){
                if(c.pageToolbar){
                    return c.pageToolbar;
                }
                return c.pageToolbar;
            }
			
			
		};
		
		Ly.LyGrid=lygGrid;
		
		var d=new EditGrid();
		for(var i in d){
			Ly.LyGrid.prototype[i]=d[i];
		}
		d=new RoadGridSelection();
		for(var i in d){
			Ly.LyGrid.prototype[i]=d[i];
		}	
		
		d=new onKey();
		for(var i in d){
			Ly.LyGrid.prototype[i]=d[i];
		}
		
	})();
/***********************************************************************************************************************************************/
