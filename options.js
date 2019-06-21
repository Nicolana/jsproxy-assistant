
var jsproxy_prefix = localStorage.getItem("jsproxy_prefix");

if (jsproxy_prefix == undefined || jsproxy_prefix == "false"){
	var prefix = 'https://etherdream.github.io/jsproxy/'
	localStorage.setItem('jsproxy_prefix', prefix);
	$("#auto-open-homepage")[0].value = prefix
} else {
	$("#auto-open-homepage")[0].value = jsproxy_prefix;
}

$("#submit-jsproxy").on("click", function(event){
	var _this = this;
	var prefix = $("#auto-open-homepage")[0].value;
	localStorage.setItem("jsproxy_prefix", prefix);
	location.reload();
})

// listen to when user press Enter
$(document).keydown(function(event){
	if (event.keyCode == 13){ // Enter down
		$("#submit-jsproxy").click();
	}
})

