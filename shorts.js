var shorts;

chrome.runtime.sendMessage('getState', (response) => {
    if(response) {
	//shorts.forEach(element => { element.style.display = "block"; });
    } else {
	shorts = document.querySelectorAll("ytd-grid-video-renderer:has(a[href^='/shorts/']), ytd-video-renderer:has(a[href^='/shorts/'])");
	//shorts.forEach(element => { element.style.display = "none"; });
	shorts.forEach(element => { element.remove(); });
	shorts = null;

    }
});
