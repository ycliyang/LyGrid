

var Ly={};
	




	
 //自定义Js Map 
function lygMap(){
	
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
			if(i<this.key.length-1){
				json+="\""+this.key[i]+"\":\""+this.value[i]+"\",";
			}else {
				json+="\""+this.key[i]+"\":\""+this.value[i]+"\"";	
			}
		}
		return json+="}";
	}
	
	
	//根据key返回Value
	this.getK=function (k){
		var v="false";
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
		if(this.getK(k)!="false"){
			this.setMapValue(k,v);
		}else {
			this.put(k,v);
		}
	}
	
	this.key=[];
	this.value=[];
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
		}
		
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
		}
		
		this.arraySplice=function (ar,str){
			for(var i=0;i<ar.length;i++){
				if(ar[i]==str){
					ar.splice(i,1);
					i--;
				}
			}
			return ar;
		}
		

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
		} 
		
		this.setTableBackground=function (uids){
			for(var i=0;i<this.selectionId.length;i++){
				var dl=this.getDl(this.selectionId[i]);
				this.TdBackgroundColor(dl.getElementsByTagName("td"),this.Acolor);
			}
			 this.selectionId=[];
			 this.selectionId.push(uids);
		}
		
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
		}
		
		this.onMouseOver=function(obj,uids){
			
			 for(var i=0;i<this.selectionId.length;i++){
				if(uids==this.selectionId[i]){return false;}
			}
			var td=obj.getElementsByTagName("td");  
			this.TdBackgroundColor(td,"#F2F2F2");
			
		}
	
		this.onMouseOut=function(obj,uids){
			for(var i=0;i<this.selectionId.length;i++){
				if(uids==this.selectionId[i]){return false;}
			}
			var td=obj.getElementsByTagName("td");  
			this.TdBackgroundColor(td,"");	
		}
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
		}
			
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
		}
	}
   
   //保存编辑后的列表数据
	function EditGrid(){
		this.editMap=new lygMap();
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
				//如果数据没有编辑就不保存到已编辑的map里面
				if(this.label.innerHTML+""!=this.txt.value+""){
					this.emap=this.gridMap.getK(this.tr.id);
					this.emap.editPut(this.tdName,this.txt.value);
					if(this.afteredit){
						this.afteredit();
					}
					var ep=this.emap;
					for(var i=0;i<this.emap.size();i++){
						var tds=this.tr.getElementsByTagName("td");
						for(var i1=0;i1<tds.length;i1++){
							var name=tds[i1].name;
							var k=this.emap.key[i];
							if(tds[i1].name==this.emap.key[i]){
								if(tds[i1].getElementsByTagName("label")[0].innerHTML!=this.emap.value[i]){
									tds[i1].getElementsByTagName("label")[0].innerHTML=this.emap.value[i];
									//tds[i1].style.background="url(image/tdEdit.jpg)";
									tds[i1].className='lygEditCell';
									break;
								}
							}
						}
					}
				    //保存编辑过的清单信息
					this.editMap.editPut(this.tr.id,this.emap);
					//console.log(this.gridMap.size()+" : "+this.editMap.size());
					
					var editMap=this.editMap;
					this.label.innerHTML=this.txt.value;
					this.label.style.display="";
					this.txt.style.display="none";
				}else {
					this.label.style.display="";
					this.txt.style.display="none";
				}
			}
		}
		
		this.edit=function (obj,name){
			td=obj;
			editGrid=this;
			this.editTd();
			this.tdName=name;
			this.td=obj;
			this.label=this.td.getElementsByTagName("label")[0];
			this.txt=this.td.getElementsByTagName("input")[0];
			this.txt.value=this.label.innerHTML;
			this.txt.style.width=this.td.width;
			this.label.style.display="none";//设置为隐藏
			this.txt.style.display="";//设置为可以显示
			this.tr=this.td.parentNode;//找父组件
			//this.selectionId.push(this.tr.id);
			this.changeActiveRow(this.tr,this.tr.id);
		}
		this.enterKey=function (){
			this.editTd();
			this.td=null;
		}
	}
  

		
	
		//var raodGrids;
		//var editGrid;
		
		function lygGrid(c){
			this.name=c.name;
			var instance=this;
			
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
			}
			
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
			}
			
			//判断序列
			var rowDivNum=10000;
			var trDivNum=0;
			var table;
			var header=new lygMap();
			this.paramsRefresh=function (){
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
				this.tdName;
				this.dlOnMouseOver;
				this.dlOnMouseOut;
				this.dlOnClick;
				this.tdOnClick;
			}
			
			this.paramsRefresh();
			
			this.json=c.json;
			this.id;
			this.columns;
			this.headDiv;
			this.contextDiv;
			var thisLyg=this;
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
						if(!c.columns[i]['type']||c.columns[i]['type']==null)
							c.columns[i]['type']="String";
					}
				}				
				
//表头处理*************************************************************************************************************

				var d=document.getElementById(c.div);
				this.headDiv=document.createElement("div");
				this.contextDiv=document.createElement("div");
				this.headDiv.className="lygGridHead";
				this.headDiv.id=c.id+"head";
				this.headDiv.style.overflow="hidden";
				if(c.height){
					this.headDiv.style.width=c.width-17;
				}else {
					this.headDiv.style.width=c.width;
				}
				this.contextDiv.id=c.id+"Context";
				this.contextDiv.className="lygGridContextDiv";
				this.contextDiv.style.width=c.width;
				this.contextDiv.style.height=c.height;
				this.contextDiv.onscroll=(function (){
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
				
				var columns=new String("<table class='lygGridHead' ><thead>");
				//原始表头信息
				var rowMap=new lygMap();
				if(c.sm){
					if(c.sm.RowNumberer){
						columns+="<th >"+c.sm.RowNumberer.header+"</th>";
					}
					if(c.sm.checkBox){
						if(c.sm.checkBox){	
							columns+="<th ><input type=checkbox name="+(c.name)+"checkBox   name="+(c.name)+"checkBox  onclick='"+c.name+".onClickCheckbox(this)' value=yes /></th>";
						}
					}
				}
				
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
									columns+="<th rowspan="+s.rowspan+" width="+h.width+"  style="+cs[i].css+">"+s.header+"</th>";
									cs.splice(i2,1);
									i2--;
								}else {
									break;
								}
							}

							columns+="<th width="+h.width+"  style="+cs[i].css+"";
							if(h.rowspan){columns+=" rowspan="+h.rowspan}
							if(h.colspan){columns+=" colspan="+h.colspan}
							columns+=" >";
							columns+=h.header+"</th>";
							j+=parseFloat(h.colspan);
							if(j<cs.length&&cs[j].rowspan-1==c.columnHeaderGroup.length-i){
								columns+="<th width="+h.width+"  style="+cs[i].css+" rowspan="+cs[j].rowspan+">"+cs[j].header+"</th>";
								cs.splice(j,1);
							}
						}
						columns+="</tr>";
					}
				}
				
				
				columns+="<tr>";
				for(var i=0;i<cs.length;i++){
					columns+="<th width="+cs[i].width+" style="+cs[i].css+">"+cs[i].header+"</th>";
				}
				columns+="</tr>" +
						"</thead></table>";
				
				this.headDiv.innerHTML=columns;
				d.appendChild(this.headDiv);
				d.appendChild(this.contextDiv);
				d.className+="lygGridPanel";
				
				if(c.pageToolbar){
					d.appendChild(c.pageToolbar.bottomDiv);
					c.pageToolbar.initListener()
					c.pageToolbar.parent=thisLyg;
					this.pagetToolbar=c.pageToolbar;
				}
				
				
			})();
			
			
			this.refresh=function (p){
				//this.contextDiv.innerHTML="";
				if(p){
					if(p.json){
						this.json=p.json
					}
				}
				this.paramsRefresh();
//				var table="<table class='lygGridTable'   id="+c.id+" style='max-height:"+c.tableHeight+"' >";
				var table=document.createElement("table");
				table.class="lygGridTable";
				table.id=c.id;
				table.style.maxHeight=c.tableHeight;
/**********************************************列表处理***************************************************/
				header=new lygMap();
				for (var i=0;i<c.columns.length;i++){
					header.put(c.columns[i].dataIndex,c.columns[i]);
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
						table.appendChild(document.createElement("<tr>"));
						var rowtr=document.createElement("tr");
						var ctr="";
						for(var p=0;p<c.rowColumns.length;p++){
							var ns=c.rowColumns[p];
							var row=j[c.columnsRoot].length;
							var data="";
							data+=j[ns.dataIndex];
							var td=document.createElement("td");
							td.rowSpan=parseInt(row);
							td.innerHTML=data;
							rowTr.appendChild(td);
//							rowTr+="<td rowSpan="+parseInt(row)+">"+data+"</td>";
						}
//						if(j[c.columnsRoot].length>0){
//							ctr=this.createTr(0,j[c.columnsRoot],header,true);
//						}
						if(c.rowColumnsId){
							this.itemsid.push(j[c.rowColumnsId]);
						}else {this.itemsid.push(j["id"]);}
						
						var dl=document.createElement("dl");
						dl.id=rowDivNum;
						dl.onclick=instance.changeActiveRow(this,rowDivNum);
						dl.innerHTML=rowtr;
//						table+="<dl id="+rowDivNum+" onclick="+c.name+".changeActiveRow(this,"+rowDivNum+"); onMouseOver='"+c.name+".onMouseOver(this,"+rowDivNum+")'; onMouseOut='"+c.name+".onMouseOut(this,"+rowDivNum+")'>"+rowtr+"</dl>"+
						ctr;
						rowDivNum++
//						table+="</tr>";
						if(j[c.columnsRoot].length>0){
//							table+=this.createTr(1,j[c.columnsRoot],header);
							this.createTr(1,j[c.columnsRoot],header,null,table);
						}
					}
				}else {
//					table+=this.createTr(0,this.json,header);
					this.createTr(0,this.json,header,table);
				}
//				if(this.json[0]){
//					if(this.json.length==1&&this.json[0].id==0){
//						if(this.customStr){
//							table+=this.customStr;
//						}
//					}
//				}else {
//					if(this.json){
//						if(this.json.length==0){
//							if(this.customStr){
//								table+=this.customStr;
//							}
//						}
//					}
//				}
				if(contextDiv){
					alert(table);
					contextDiv.appendChild(table);
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
					t.onmouseover=(function (){
						var r=l;
						var s=t;
						return function (){
							r.onMouseOver(s,s.id);
						};
					})();
					
					t.onmouseout=(function (){
						var r=l;
						var s=t;
						return function (){
							r.onMouseOut(s,s.id);
						};
					})();
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
			
			this.createTr=function(i,json,header,tableRow,table){
				for(;i<json.length;i++){
					var tr=this.createTrNode(trDivNum);
					var map=new lygMap();
					var j=json[i];
					/*if(!tableRow){
						tr+="<tr id="+trDivNum+" onclick="+c.name+".raodGrids.changeActiveRow(this,"+trDivNum+"); onMouseOver='"+c.name+".raodGrids.onMouseOver(this,"+trDivNum+")'; onMouseOut='"+c.name+".raodGrids.onMouseOut(this,"+trDivNum+")'>";
					}else {
						tr+="<dl id="+trDivNum+" onclick="+c.name+".raodGrids.changeActiveRow(this,"+trDivNum+"); onMouseOver='"+c.name+".raodGrids.onMouseOver(this,"+trDivNum+")'; onMouseOut='"+c.name+".raodGrids.onMouseOut(this,"+trDivNum+")'>";
					}*/
//					if(!tableRow){
//						tr+="<tr id="+trDivNum+">";
//					}else {
//						tr+="<dl  id="+trDivNum+">";
//					}
					trappendChild(this.sm());
					for(var p=0;p<header.size();p++){
						var h=header.value[p];
						var k=header.key[p];
//						if(c.edit&&h.edit){
//							tr+="<td name='"+k+"' width="+h.width+" style='"+h.css+"' onclick="+c.name+".edit(this,'"+k+"')>"+
//							"<label>"+j[k]+"</label><input type=text  style=display:none></td>";
//						}else {
//							tr+="<td name='"+k+"' width="+h.width+" style='"+h.css+"' ><label>"+j[k]+"</label></td>";
//						}
						tr.appendChild(this.createTdNode(k, h.width, h.css, this.ofType(h.type), (c.edit&&h.edit)));
					}
					if(j.id){
						this.billid.push(j.id);
					}
					for(var j1 in j){
						map.put(j1,j[j1]);
					}
					this.gridMap.put(trDivNum,map);
					trDivNum++;
					if(tableRow){
						break;
					}else {
						console.log(tr);
						table.appendChild(tr);
					}
				}
				console.log(table);
				return table;
			}

			this.addRow=function (){
				var tr=this.createTrNode(trDivNum);
//				tr+="<tr id='"+trDivNum+"'>";
				var s=c.columns;
				var map=new lygMap();
				for(var p=0;p<header.size();p++){
					var h=header.value[p];
					var k=header.key[p];
//					if(c.edit&&h.edit){
//						tr+="<td name='"+k+"' width='"+h.width+"' style='"+h.css+"' onclick="+c.name+".edit(this,'"+k+"')>"+
//						"<label>"+this.ofType(h.type)+"</label><input type=text  style=display:none></td>";
//					}else {
//						tr+="<td name='"+k+"' width='"+h.width+"' style='"+h.css+"'><label>"+this.ofType(h.type)+"</label></td>";
//					}

					tr.appendChild(this.createTdNode(k, h.width, h.css, this.ofType(h.type), (c.edit&&h.edit)));
				}
				map.put(k,"");
//				tr+="</tr>";
				this.gridMap.put(trDivNum,map);
				trDivNum++;
				return tr;
			}
			
			this.ofType=function (obj){
				switch(obj){
					case "String":return "";
					case "float":return "0.0";
					case "int":return "0";
				}
			}
						
			this.sm=function (){
				var tr=document.createElement("tr");
				if(c.sm){
					if(c.sm.RowNumberer){
						var td=document.createElement("td");
						var label=document.createElement("label");
						label.innerHTML=trDivNum+1;
						td.appendChild(label)
						tr.appendChild(td);
						//tr+="<td  ><label>"+(trDivNum+1)+"</label></td>";
					}
					if(c.sm.checkBox){
						if(c.sm.checkBox){
							var td=document.createElement("td");
							var checkbox=document.createElement("input");
							checkbox.type="checkbox";
							checkbox.name=c.name;
							checkbox.onclick=instance.onClickCheckbox(checkbox);
							td.appendChild(checkbox);
							tr.appendChild(td);
//							tr+="<td ><input type=checkbox name="+(c.name)+"checkBox  onclick='"+c.name+".onClickCheckbox(this)' /></td>";
						}
					}
				}
				return tr;
			};
			
			this.createTdNode=function (name,width,style,labelText,isEdit){
				var td=document.createElement("td");
				td.width=width;
				td.name=name;
				td.style=style;
				var label=document.createElement("label");
				label.innerHTML=labelText;
				td.appendChild(label);
				if(isEdit&&isEdit==true){
					var input=document.createElement("input");
					input.type="text";
					input.style.display="none";
					td.appendChild(input);
				}
				return td;
			};
			
			this.createTrNode=function (id){
				var tr=document.createElement("td");
				tr.id=id;
				return tr;
			};
			
		}
		
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
