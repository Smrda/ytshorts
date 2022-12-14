var state;
let called = false;

async function getState(){
    return new Promise(resolve => {
	chrome.storage.local.get({ state: null }, (items) => {
	    resolve(items.state);
	});
    });
};

async function toggle(tabId) {
    state = await getState();
    if (await getState()) {
	chrome.action.setIcon({ path: "on.png" });
	chrome.action.setTitle({ title: "Youtube shorts ON" });
    } else {
	chrome.action.setIcon({ path: "off.png" });
	chrome.action.setTitle({ title: "Youtube shorts OFF" });
    }
    chrome.scripting.executeScript({
	target: { tabId },
	files: ['shorts.js']
    });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ state: true });
});

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
    if (message === 'getState') sendResponse(state);
    else if (message === 'shorts') {
	chrome.tabs.query({active: true}, function(tabs){
	    let tabId = tabs[0].id;
	    chrome.scripting.executeScript({
		target: { tabId },
		files: ['shorts.js']
	    });
	});
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.status === "complete") {
	toggle(tabId);
	chrome.scripting.executeScript({
	    target: { tabId },
	    files: ['items.js']
	});
    };
});

chrome.action.onClicked.addListener(async (tab) => {
    chrome.storage.local.set({ state: !(await getState())});
    toggle(tab.id);
});
