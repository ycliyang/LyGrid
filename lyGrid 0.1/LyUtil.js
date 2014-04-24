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