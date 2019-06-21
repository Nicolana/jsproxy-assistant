// 常量定义
var split_middle = "-----"
// var config_url = "https://jsproxy.ga/";
var jsproxy_prefix = localStorage.getItem('jsproxy_prefix');

var config_url;

if (jsproxy_prefix == null || jsproxy_prefix == "false"){
	config_url = "https://etherdream.github.io/jsproxy/";
	localStorage.setItem('jsproxy_prefix', config_url);
} else {
	config_url = jsproxy_prefix
}

function setStorage(obj){
	chrome.runtime.sendMessage({method: "setLocalStorage", data: obj}, function(response){
		return true;
	});
}


function redirect_to_proxy(){
	// 基础操作
	var url = window.location.href;
	var out_url = url.split(split_middle)
	if (out_url[0] != config_url){
		window.location.href = config_url + split_middle + out_url[out_url.length - 1];
	} else if (out_url[0] == config_url && out_url.length > 1){
		setStorage({key: "status", value: true});
	}
}

function redirect_to_url(){
	var url = window.location.href;
	var temp = url.split(split_middle);
	window.location.href = temp[temp.length - 1];
}

// check if proxy can run
// var isChecked = localStorage.getItem("status");
chrome.runtime.sendMessage({method: "getLocalStorage", key: "status"}, function(response) {
  var status = response.data;
  if (status == true || status == "true"){
  	redirect_to_proxy();
  }
});

// The  reciver that handle popup request
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
	sendResponse({});
	if (request.method == "redirect_to_proxy"){
		redirect_to_proxy();
	} else if (request.method == "redirect_to_url"){
		redirect_to_url();
	}
});

