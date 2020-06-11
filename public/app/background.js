chrome.tabs.create({'url': chrome.extension.getURL('index.html')});
 
//Change origin header
chrome.webRequest.onBeforeSendHeaders.addListener(
   (e) => {
     const o = e.requestHeaders;
 
     const indexOrigin = o.findIndex((e) => "origin" === e.name);
     
     if (indexOrigin === -1) {
       o.push({ name: "origin", value: "https://www.facebook.com" });
     } else {
       
       o[indexOrigin].value = "https://www.facebook.com";
     }
     return { requestHeaders: o };
   },
   {
     urls: ["*://*.facebook.com/*"],
   },
   ["blocking", "requestHeaders", "extraHeaders"]
 );
 