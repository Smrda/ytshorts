var items = document.querySelector("div#contents");

function addObserverIfDesiredNodeAvailable(){
    if(!items) {
	//The node we need does not exist yet.
	//Wait 500ms and try again
	window.setTimeout(addObserverIfDesiredNodeAvailable, 500);
	return;
    }
    console.log('proso');
    function callback(mutationList, observer){
	for (const mutation of mutationList) {
	    if(mutation.type === 'childList') {
		chrome.runtime.sendMessage('shorts');
	    }
	}
    };

    const observer = new MutationObserver(callback);

    observer.observe(items, { attributes: true, childList: true });
}

addObserverIfDesiredNodeAvailable();
