
if(typeof Ly =='undefined'){
	Ly={};
}

Ly.util={};
Ly.util.xmlHttp = function() {
	var xmlhttp;
	if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
		xmlhttp = new XMLHttpRequest();
	} else {// code for IE6, IE5
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlhttp;
};

Ly.util.get = function(url, params, fn) {
	var xmlhttp = Ly.util.xmlHttp();
	xmlhttp.open("GET", url, true);
	xmlhttp.send(params);
	xmlhttp.onreadystatechange = function() {
		Ly.util.getAjaxResult(xmlhttp, fn);
	};
};

Ly.util.postJson = function(url, params, fn) {
	var xmlhttp = Ly.util.xmlHttp();
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type",
			"application/json; charset=UTF-8");
	xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xmlhttp.send(params);
	xmlhttp.onreadystatechange = function() {
		Ly.util.getAjaxResult(xmlhttp, fn);
	};
};

Ly.util.getAjaxResult = function(http, fn) {
	if (http.readyState == 4 && http.status == 200) {
		var json;
		if (http.responseText) {
			try {
				json = eval("(" + http.responseText + ")");
				if (json.success) {
					if (fn)
						fn(json);
				} else {

					if (json.message == "timeout") {
					} else {
                        if (fn)
                            fn(json);
                    }
				}
			} catch (e) {
			}
		}
	} else if (http.status == 500) {
	}
};

Ly.util.post = function(url, params, fn) {
	var xmlhttp = Ly.util.xmlHttp();
	// setRequestHeader(header,value)
	xmlhttp.open("POST", url, true);
	xmlhttp.setRequestHeader("Content-type",
			"application/x-www-form-urlencoded");
	xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
	xmlhttp.send(params);
	xmlhttp.onreadystatechange = function() {
		Ly.util.getAjaxResult(xmlhttp, fn);
	}
};
Ly.util.date={
    timestamp2DataTimeStr:function (obj){
        var day2 = new Date(obj);
        return day2.getFullYear()+"-"+(day2.getMonth()+1)+"-"+day2.getDate()+" "+day2.getHours()+":"+day2.getMinutes()+":"+day2.getSeconds();
    },
    timestamp2DataStr:function (obj){
        var day2 = new Date(obj);
        return day2.getFullYear()+"-"+(day2.getMonth()+1)+"-"+day2.getDate();
    }
}

Ly.date={};
Ly.date.daysOfMonth=function (Month) {
    var currentMonth=new Date(Month.substring(0,4),Month.substring(4,6),1);
    var lastMonth=new Date(Month.substring(0,4),Month.substring(4,6)-1,1);
    var diffDays=currentMonth-lastMonth;
    return (diffDays/( 24 * 60 * 60 * 1000));
}

Ly.date.getCurrentMonthLastDay = function (current){
    var currentMonth=current.getMonth();
    var nextMonth=++currentMonth;
    var nextMonthDayOne =new Date(current.getFullYear(),nextMonth,1);
    var minusDate=1000*60*60*24;
    return new Date(nextMonthDayOne.getTime()-minusDate).getDate();
}

Ly.date.getCurrentMonthFirstDay=function(current){
    current.setDate(1);
    return current;
}

Ly.date.getWeekDay=function (date){
    var weekday = new Array(7);
    weekday[0] = "周日";
    weekday[1] = "周一";
    weekday[2] = "周二";
    weekday[3] = "周三";
    weekday[4] = "周四";
    weekday[5] = "周五";
    weekday[6] = "周六";
    return weekday[date.getDay()];
}