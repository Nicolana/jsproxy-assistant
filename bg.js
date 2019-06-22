// This is the background script for the extension

// A listener for when the user clicks on the extension button

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

// storage hanndle listener
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLocalStorage"){
      sendResponse({data: localStorage.getItem(request.key)});
    } else if (request.method == "setLocalStorage"){
    	sendResponse({});
    	localStorage.setItem(request.data.key, request.data.value);
    } else{
      sendResponse({}); // snub them.
    }
});


// Intercept the link before it request, and add proxy url as prefix
chrome.webNavigation.onBeforeNavigate.addListener((details) => {
	var jp = jsPrefix();
	if (details.url.indexOf(jp) == -1){
		var status = localStorage.getItem("status");
		if ((status == true || status == "true") && (details.url.indexOf('http') != -1 || details.url.indexOf("https") != -1)){
			// var prefix = localStorage.getItem("jsproxy_prefix");
			chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
			    var url = tabs[0].url;
			    if (details.url == url){
			    	chrome.tabs.update(details.tabId, {
						url: jp + "-----" + details.url
					});
			    }
			});
		}
	}
})


