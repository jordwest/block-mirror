import { getBrowser, TabId } from "../shared/types/webextension";
import { createEffect, createRoot, createSignal } from "solid-js";

createRoot(() => {
  const [bypassedUntil, setBypassedUntil] = createSignal<number | null>(null);

  const siteChanged = async (tabId: TabId) => {
    const browser = getBrowser();
    const tab = await browser.tabs.get(tabId);

    const isActive = bypassedUntil() == null || bypassedUntil()! < Date.now();

    if (
      isActive &&
      tab.url.includes("facebook.com") &&
      !tab.url.includes("block-page.html")
    ) {
      return browser.tabs.update(tabId, {
        url: "/block-page.html?url=" + encodeURI(tab.url),
      });
    }
  };

  getBrowser().tabs.onActivated.addListener(({ tabId }) => {
    return siteChanged(tabId);
  });

  getBrowser().tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.url != null) {
      return siteChanged(tabId);
    }
  });

  getBrowser().runtime.onMessage.addListener(
    (message: ExtensionMessage, sender, sendResponse) => {
      if (message.type === "submitReason") {
        console.log("reason submitted", message.reason);
        setBypassedUntil(Date.now() + 1000 * 60 * 5);
        sendResponse();
      }
    },
  );
});
