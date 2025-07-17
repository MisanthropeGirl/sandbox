$(function(){
	CommonFunctions = {
		init: function(){},

		getQueryParams: function(query){
			//decode query parameters into an associative array
			var params = new Object();
			if (!query) return params;
			var start = query.indexOf('?');
			if (start > -1) query = query.substr(start + 1);
			var paramArray = query.split("&");
			for (var i in paramArray) {
				var param = paramArray[i];
				var splitPos = param.indexOf("=");
				var name = unescape(param.substring(0, splitPos));
				var value = unescape(param.substring(splitPos + 1));
				params[name] = value;
			}
			return params;
		}
	};

	Keys = {
		ENTER: 13,
		LEFTARROW: 37,
		RIGHTARROW: 39
	}
});