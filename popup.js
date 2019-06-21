
function redirect_to(method){
	// chrome.extension.sendMessage({method: "redirect_to_" + method}, function(response){});

	chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
		chrome.tabs.sendMessage(tabs[0].id, {method: "redirect_to_" + method}, function(response){
			return true;
		});
	})
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

	if (_this.checked == false){
		// var prefix = localStorage.getItem("jsproxy_prefix");
		var url = window.location.href;
		var a = url.split("-----");
		redirect_to("url");
	} else if (_this.checked == true){
		var prefix = localStorage.getItem("jsproxy_prefix");
		redirect_to("proxy");
	}
})
