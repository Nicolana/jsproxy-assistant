var default_prefix = "https://jsproxy.ga/";

function jsPrefix(){
	// if there is a proxy alread, return it directly,
	// if not, this function gonna settings the default proxy to 
	// localstorage with key jsproxy_prefix, and return it

	var prefix = localStorage.getItem('jsproxy_prefix');
	if (prefix != null){
		return prefix;
	}
	localStorage.setItem("jsproxy_prefix", default_prefix)
	return default_prefix;
}

var status = localStorage.getItem("status");

if (status == undefined || status == "false"){
	localStorage.setItem('status', false);
} else {
	$("#checkbox-switch")[0].checked = status == "true"?true : false;
}

var isChecked = document.getElementById("checkbox-switch");

// Add clicked events to hte svg tag
$("svg").on("click", function(e){
	$("#checkbox-switch").click();
})

// listen on the changes of checkbox
$("#checkbox-switch").on("click", function(event){
	// console.log(this.checked);
	var _this = this;
	localStorage.setItem("status", _this.checked);
	chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function(tabs) {
			var url = tabs[0].url;
			var jp = jsPrefix();
			if (_this.checked == false){
				if (url.indexOf(jp) != -1){
					var _ = url.split("-----");
					var host = _[_.length - 1];
					chrome.tabs.update({
						url: host
					})
				}
			} else {
				chrome.tabs.update({
					url: jp + "-----" + url
				})
			}
	})
})
