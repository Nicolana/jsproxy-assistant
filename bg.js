// This is the background script for the extension

// A listener for when the user clicks on the extension button

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
