export interface WebExtensionApi {
    tabs: {
        onActivated: ExtensionEvent<[{tabId: TabId}]>,
        onUpdated: ExtensionEvent<[TabId, Partial<Tab>]>,
        get: (tabId: TabId) => Promise<Tab>,
        update: (tabId: TabId, updateProperties: {url: string}) => Promise<Tab | undefined>,
    }
}

type ExtensionEvent<T extends Array<any>> = {
    addListener(callback: (...data: T) => void): void,
}

type Tab = {
    id: TabId,
    pendingUrl: string,
    url: string,
}

export type TabId = number & { __tabId: never };

declare const chrome: WebExtensionApi;

export const getBrowser = () => chrome;