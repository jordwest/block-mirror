import {getBrowser, TabId} from "../shared/types/webextension";
import {createEffect, createRoot, createSignal} from "solid-js";

console.log("Hello from service worker!")

const siteChanged = async (tabId: TabId) => {
    const browser = getBrowser();

    const tab = await browser.tabs.get(tabId);

    console.log("Tab activated", tabId, tab)


    if (tab.url.includes('facebook.com') && !tab.url.includes('block-page.html')) {
        return browser.tabs.update(tabId, { url: '/block-page.html?url=' + encodeURI(tab.url) });
    }
}

getBrowser().tabs.onActivated.addListener(({ tabId }) => {
    return siteChanged(tabId);
});

getBrowser().tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.url != null) {
        return siteChanged(tabId);
    }
});

createRoot(() => {
    const [get, set] = createSignal('test');

    createEffect(() => {
        console.log('signal changed', get());
    })

    setTimeout(() => {
        set('changed');
    }, 1000)
})
