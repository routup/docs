import{_ as e,o as t,c as a,Q as s}from"./chunks/framework.6ee49df6.js";const u=JSON.parse('{"title":"Helpers","description":"","frontmatter":{},"headers":[],"relativePath":"guide/helpers.md","filePath":"guide/helpers.md"}'),r={name:"guide/helpers.md"},o=s('<h1 id="helpers" tabindex="-1">Helpers <a class="header-anchor" href="#helpers" aria-label="Permalink to &quot;Helpers&quot;">​</a></h1><p>A &quot;helper&quot; is a function that allows logic to be encapsulated and reused in different places.</p><p>They exist to transform and interact with the incoming <a href="./../api/request-helpers.html">request</a> and manipulate the <a href="./../api/response-helpers.html">response</a> upstream. For example, it may be necessary to access the IP address, Host, Path, etc. at different places.</p><p>The most important response composable, is properly the <a href="./../api/response-helpers.html#send">send</a> method, which sends any (optional) data to client and terminates the request on completion.</p>',4),n=[o];function p(i,l,h,c,d,_){return t(),a("div",null,n)}const f=e(r,[["render",p]]);export{u as __pageData,f as default};