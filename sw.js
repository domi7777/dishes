if(!self.define){let e,n={};const i=(i,s)=>(i=new URL(i+".js",s).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,o)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(n[r])return;let c={};const a=e=>i(e,r),t={module:{uri:r},exports:c,require:a};n[r]=Promise.all(s.map((e=>t[e]||a(e)))).then((e=>(o(...e),c)))}}define(["./workbox-209e5686"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-vMPWFNco.js",revision:null},{url:"icons/favicon-32x32.png",revision:"2931226a06281fc032c992a759913966"},{url:"icons/pwa-192x192.png",revision:"9ca6060fe6c9c9e3533aa2fc3671783b"},{url:"icons/pwa-512x512.png",revision:"d8325a49952a71ea29fd89f0488999ea"},{url:"index.html",revision:"5fa69b512a3af14d525c01f752e03448"},{url:"registerSW.js",revision:"402b66900e731ca748771b6fc5e7a068"},{url:"./icons/pwa-192x192.png",revision:"9ca6060fe6c9c9e3533aa2fc3671783b"},{url:"./icons/pwa-512x512.png",revision:"d8325a49952a71ea29fd89f0488999ea"},{url:"manifest.webmanifest",revision:"075a35de97e20edea06d303c878b0a36"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute((({url:e})=>"https://docs.google.com"===e.origin&&e.pathname.startsWith("/spreadsheets/")),new e.NetworkFirst({cacheName:"api-cache",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:86400}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
