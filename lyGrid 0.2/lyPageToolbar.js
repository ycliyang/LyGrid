function LyPageToolbar (c){
	
	
	var instance=this;
	
	this.url=c.url;
	this.bottomDiv=document.createElement("div");
	this.bottomDiv.innerHTML=
		"<select id='"+c.id+"optionLimit'>"+
			"<option value='15'>15</option>"+
			"<option value='20'>20</option>"+
			"<option value='30'>30</option>"+
			"<option value='50'>50</option>"+
            "<option value='100'>100</option>"+
            "<option value='200' selected='selected'>200</option>"+
            "<option value='300'>300</option>"+
		"</select>"+
		"<button id='"+c.id+"RefreshPage'>刷新</button>"+
		"<button id='"+c.id+"firstPage'>首页</button>"+
		"<button id='"+c.id+"upPage'>上一页</button>"+
		"<input type='text' size='3' value='1' id='"+c.id+"gotoPage'/>共" +
				"<label id='"+c.id+"CountPage'>1</label>页"+
		"<button id='"+c.id+"nextPage'>下一页</button>"+
		"<button id='"+c.id+"lastPage'>末页</button>" +
				"<span>显示<label id='"+c.id+"StartRow'>0</label>" +
						"到" +
						"<label id='"+c.id+"EndRow'>0</label>" +
								"条,一共" +
								"<label id='"+c.id+"CountRow'>0</label>条</span>";
	
	this.bottomDiv.className="lygGridBottom";
	this.bottomDiv.id=c.id+"Bottom";
/*************************************************************************/

//    document.getElementById(+c.id+"optionLimit").value= c.pageSize;
//
//    if(c.df){
//        if(c.df.pageSize){
//        }
//    }


/**************************************************************************/
	this.getNowPage=function (){
		return new Number(this.btn.gotoPage.value);
	};
	this.setNowPage=function (v){
		this.gotoPage.value=v;
	};

/**************************************************************************/
	this.getCountPage = function (){
		return new Number(this.btn.countPage.innerHTML);
	};
	
	this.setCountPage = function (v){
		this.btn.countPage.innerHTML=v;
	};

/**************************************************************************/
	this.getCountRow = function (){
		return new Number(this.btn.countRow.innerHTML);
	};
	this.setCountRow = function (v){
		this.btn.countRow.innerHTML=v;
	};

/**************************************************************************/
	this.getStartRow = function (){
		return new Number(this.btn.startRow.innerHTML);
	};
	this.setStartRow = function (v){
		this.btn.startRow.innerHTML=v;
	};
	
	this.getEndRow = function (){
		return new Number(this.btn.endRow.innerHTML);
	};
	this.setEndRow = function (v){
		this.btn.endRow.innerHTML=v;
	};
/**************************************************************************/
	this.getLimitRow = function (){
		return new Number(this.btn.optionLimit.value);
	};
	this.setLimitRow = function (v){
		this.btn.optionLimit.value=v;
	};
/**************************************************************************/
	this.getGoToPage=function (){
		return new Number(this.gotoPage.value);
	};
	
	this.setGoToPaget=function(v){
		this.btn.gotoPage.value=v;
	};
/**************************************************************************/
	this.btn={};
	this.initListener=function (){
		this.btn.optionLimit = document.getElementById(c.id+"optionLimit");
		this.btn.firstPage = document.getElementById(c.id+"firstPage");
		this.btn.upPage = document.getElementById(c.id+"upPage");
		this.btn.gotoPage = document.getElementById(c.id+"gotoPage");
		this.btn.nextPage = document.getElementById(c.id+"nextPage");
		this.btn.lastPage = document.getElementById(c.id+"lastPage");
		this.btn.startRow = document.getElementById(c.id+"StartRow");
		this.btn.endRow = document.getElementById(c.id+"EndRow");
		this.btn.countRow = document.getElementById(c.id+"CountRow");
		this.btn.countPage = document.getElementById(c.id+"CountPage");
		this.btn.refreshPage = document.getElementById(c.id+"RefreshPage");
		
		
		this.btn.refreshPage.onclick=function (){
			instance.refresh("refresh");
		};
		
		this.btn.optionLimit.onclick=function (){
			
		};
		
		this.btn.firstPage.onclick=function (){
			instance.refresh("first");
		};
		
		this.btn.upPage.onclick=function (){
			if((instance.getStartRow()-instance.getLimitRow())>=0){
				instance.refresh("up");
			}
		};
		
		this.btn.gotoPage.onclick=function (){
			instance.refresh("goto");
		};
		
		this.btn.nextPage.onclick=function (){
			if(instance.getCountRow()>instance.getEndRow()){
				instance.refresh("next");
			}
		};
		
		this.btn.lastPage.onclick=function (){
			instance.refresh("last");
		};
        if(c.autoLoad){
            this.refresh(null);
        }
	};
	
	
	
	this.refresh=function (val){
		var p=new String("");
		var start=new Number(0);
		var gotoPage=new Number(1);
		if(val){
			
			if(typeof(val)=='string'){
			
				if(val=="next"){
					start=new Number(this.getStartRow())+new Number(this.getLimitRow());
					p+="start="+start;
					p+="&limit="+new Number(this.getLimitRow());
				}else if(val=="up"){
					start = new Number(this.getStartRow()-this.getLimitRow());
					p+="start="+start;
					p+="&limit="+new Number(this.getLimitRow());
				}else if(val=="last"){
					start=new Number(this.getLimitRow()*(this.getCountPage()-1));
					p+="start="+start;
					p+="&limit="+new Number(this.getLimitRow());
				}else if(val=="first"){
					p+="start="+start;
					p+="&limit="+new Number(this.getLimitRow());
				}else if(val=="refresh"){
					start=this.getStartRow();
					p+="start="+start;
					p+="&limit="+new Number(this.getLimitRow());
				}
			}else if(typeof(val) == 'number'){
				if(val=="goto"){
					start=new Number(val*this.getLimitRow());
					this.setStartRow(start);
					gotoPage=val;
					p+="start="+start;
					p+="&limit="+new Number(this.getLimitRow());
				}
			}
		}else {
			this.setStartRow(0);
			this.setGoToPaget(1);
			p+="start="+new Number(this.getStartRow());
			p+="&limit="+new Number(this.getLimitRow());
		}
		if(this.extra){
			p+="&"+this.extra;
		}
		
//		this.setGoToPaget(gotoPage);
		this.setStartRow(start);
		this.setEndRow(start+new Number(this.getLimitRow()));
		
		p.replace("NaN", 0);
		Ly.util.post(instance.url,p,function (json){
            if(c.listener&&c.listener.refreshPage){
                c.listener.refreshPage(json);
            }
			if(instance.parent){
				instance.parent.refresh({
					json:json.list
				});
				instance.setGoToPaget(instance.getStartRow()/instance.getLimitRow()+1);
				instance.setCountRow(json.count);
				var count=((json.count/instance.getLimitRow())+"").split(".");
				if(count.length>1){
					instance.setCountPage((new Number(count[0])+1));
				}else {
					instance.setCountPage(count[0]);
				}
			}
		});
	};
	
	
};
if(typeof Ly =='undefined'){
	Ly={};
}
	
Ly.LyPageToolbar=LyPageToolbar;