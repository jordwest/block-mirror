import { render } from "solid-js/web";
import "./index.css";
import { createSignal } from "solid-js";
import {getBrowser} from "../shared/types/webextension";

console.log("hello from block page");
console.log(new URLSearchParams(window.location.search).get("url"));

function BlockPageRoot() {
  const [reason, setReason] = createSignal<string>("");
  const browser = getBrowser();

  const continueToSite = async () => {
    const url = new URLSearchParams(window.location.search).get("url");
    if (url) {
      await browser.runtime.sendMessage(null, { type: "submitReason", reason: reason() });
      window.location.replace(url);
    }
  };

  return (
    <div class="p-2">
      <h1 class="text-lg">What were you doing when you opened this site?</h1>
      <textarea
        class="text-md bg-gray-100 border"
        value={reason()}
        onInput={(e) => setReason(e.currentTarget.value)}
      ></textarea>
      <button
        class="bg-blue-500 text-white p-2 rounded"
        onClick={continueToSite}
      >
        Continue to site
      </button>
    </div>
  );
}

render(() => <BlockPageRoot />, document.getElementById("app")!);
