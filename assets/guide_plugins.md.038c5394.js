import{_ as s,o as a,c as n,Q as p}from"./chunks/framework.cc795e4d.js";const g=JSON.parse('{"title":"Plugins","description":"","frontmatter":{},"headers":[],"relativePath":"guide/plugins.md","filePath":"guide/plugins.md"}'),l={name:"guide/plugins.md"},o=p(`<h1 id="plugins" tabindex="-1">Plugins <a class="header-anchor" href="#plugins" aria-label="Permalink to &quot;Plugins&quot;">​</a></h1><p>According to the fact that routup is a minimalistic framework, it depends on plugins to cover some typically http framework functions, which are not integrated in the main package.</p><p>At its core, a plugin is an object with the properties <strong>install</strong> and <strong>name</strong> property. It should be distributed as package which exports a function that can be called with plugin specific options and returns such an object.</p><p>Plugins allow to interact with the router instance. Thus, it is possible to register additional handlers or customize the behavior.</p><p>The officially provided plugins can be viewed via <a href="https://github.com/routup/plugins" target="_blank" rel="noreferrer">GitHub</a>. If you would like to make a suggestion for an official plugin, please submit a pull request.</p><h2 id="ecosystem" tabindex="-1">Ecosystem <a class="header-anchor" href="#ecosystem" aria-label="Permalink to &quot;Ecosystem&quot;">​</a></h2><p>List of official plugins.</p><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><a href="https://github.com/routup/plugins/tree/master/packages/assets/" target="_blank" rel="noreferrer">assets</a></td><td>Serve static files from a directory.</td></tr><tr><td><a href="https://github.com/routup/plugins/tree/master/packages/basic/" target="_blank" rel="noreferrer">basic</a></td><td>Bundle of the body, cookie and query plugin.</td></tr><tr><td><a href="https://github.com/routup/plugins/tree/master/packages/body/" target="_blank" rel="noreferrer">body</a></td><td>Read and parse the request body.</td></tr><tr><td><a href="https://github.com/routup/plugins/tree/master/packages/cookie/" target="_blank" rel="noreferrer">cookie</a></td><td>Read and parse request cookies and serialize cookies for the response.</td></tr><tr><td><a href="https://github.com/routup/plugins/tree/master/packages/decorators/" target="_blank" rel="noreferrer">decorators</a></td><td>Create request handlers with class-, method- &amp; parameter-decorators.</td></tr><tr><td><a href="https://github.com/routup/plugins/tree/master/packages/prometheus/" target="_blank" rel="noreferrer">prometheus</a></td><td>Collect and serve metrics for prometheus.</td></tr><tr><td><a href="https://github.com/routup/plugins/tree/master/packages/query/" target="_blank" rel="noreferrer">query</a></td><td>Read and parse the query string of the request url.</td></tr><tr><td><a href="https://github.com/routup/plugins/tree/master/packages/rate-limit/" target="_blank" rel="noreferrer">rate-limit</a></td><td>Rate limit incoming requests.</td></tr><tr><td><a href="https://github.com/routup/plugins/tree/master/packages/rate-limit-redis/" target="_blank" rel="noreferrer">rate-limit-redis</a></td><td>Redis adapter for the rate-limit plugin.</td></tr><tr><td><a href="https://github.com/routup/plugins/tree/master/packages/swagger" target="_blank" rel="noreferrer">swagger</a></td><td>Serve generated docs from URL or based on a JSON file.</td></tr></tbody></table><h2 id="mounting" tabindex="-1">Mounting <a class="header-anchor" href="#mounting" aria-label="Permalink to &quot;Mounting&quot;">​</a></h2><p>Mount a plugin without any specific criteria, making it available to process requests regardless of path.</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">router.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">myPlugin</span><span style="color:#E1E4E8;">({ </span><span style="color:#6A737D;">/* ... */</span><span style="color:#E1E4E8;"> }));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">router.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">myPlugin</span><span style="color:#24292E;">({ </span><span style="color:#6A737D;">/* ... */</span><span style="color:#24292E;"> }));</span></span></code></pre></div><p>Mount a plugin on a specific path <code>/plugin</code>.</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#E1E4E8;">router.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(</span><span style="color:#9ECBFF;">&#39;/plugin&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#B392F0;">myPlugin</span><span style="color:#E1E4E8;">({ </span><span style="color:#6A737D;">/* ... */</span><span style="color:#E1E4E8;"> }));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#24292E;">router.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(</span><span style="color:#032F62;">&#39;/plugin&#39;</span><span style="color:#24292E;">, </span><span style="color:#6F42C1;">myPlugin</span><span style="color:#24292E;">({ </span><span style="color:#6A737D;">/* ... */</span><span style="color:#24292E;"> }));</span></span></code></pre></div><h2 id="example" tabindex="-1">Example <a class="header-anchor" href="#example" aria-label="Permalink to &quot;Example&quot;">​</a></h2><h3 id="definition" tabindex="-1">Definition <a class="header-anchor" href="#definition" aria-label="Permalink to &quot;Definition&quot;">​</a></h3><p>Define a plugin <code>@routup/my-plugin</code>.</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { coreHandler, setRequestEnv, useRequestEnv } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;routup&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> { Plugin } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;routup&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">type</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Options</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#FFAB70;">path</span><span style="color:#F97583;">?:</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">string</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">export</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">function</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">myPlugin</span><span style="color:#E1E4E8;">(</span><span style="color:#FFAB70;">options</span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Options</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> {}) </span><span style="color:#F97583;">:</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Plugin</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">path</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> options.path </span><span style="color:#F97583;">||</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;/hello-world&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#E1E4E8;">    </span></span>
<span class="line"><span style="color:#E1E4E8;">    </span><span style="color:#F97583;">return</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">        name: </span><span style="color:#9ECBFF;">&#39;myPlugin&#39;</span><span style="color:#E1E4E8;">,</span></span>
<span class="line"><span style="color:#E1E4E8;">        </span><span style="color:#B392F0;">install</span><span style="color:#E1E4E8;">: (</span><span style="color:#FFAB70;">router</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">            router.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">coreHandler</span><span style="color:#E1E4E8;">((</span><span style="color:#FFAB70;">req</span><span style="color:#E1E4E8;">) </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> {</span></span>
<span class="line"><span style="color:#E1E4E8;">                </span><span style="color:#B392F0;">setRequestEnv</span><span style="color:#E1E4E8;">(req, </span><span style="color:#9ECBFF;">&#39;name&#39;</span><span style="color:#E1E4E8;">, </span><span style="color:#9ECBFF;">&#39;World&#39;</span><span style="color:#E1E4E8;">);</span></span>
<span class="line"><span style="color:#E1E4E8;">            }));</span></span>
<span class="line"><span style="color:#E1E4E8;">            </span></span>
<span class="line"><span style="color:#E1E4E8;">            router.</span><span style="color:#B392F0;">get</span><span style="color:#E1E4E8;">(path, () </span><span style="color:#F97583;">=&gt;</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">\`Hello, \${</span><span style="color:#B392F0;">useRequestEnv</span><span style="color:#9ECBFF;">(</span><span style="color:#E1E4E8;">req</span><span style="color:#9ECBFF;">, </span><span style="color:#9ECBFF;">&#39;name&#39;</span><span style="color:#9ECBFF;">)</span><span style="color:#9ECBFF;">}!\`</span><span style="color:#E1E4E8;">)</span></span>
<span class="line"><span style="color:#E1E4E8;">        }</span></span>
<span class="line"><span style="color:#E1E4E8;">    }</span></span>
<span class="line"><span style="color:#E1E4E8;">}</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { coreHandler, setRequestEnv, useRequestEnv } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;routup&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> { Plugin } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;routup&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">type</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Options</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#E36209;">path</span><span style="color:#D73A49;">?:</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">string</span></span>
<span class="line"><span style="color:#24292E;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">export</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">function</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">myPlugin</span><span style="color:#24292E;">(</span><span style="color:#E36209;">options</span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Options</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> {}) </span><span style="color:#D73A49;">:</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Plugin</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">path</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> options.path </span><span style="color:#D73A49;">||</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;/hello-world&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#24292E;">    </span></span>
<span class="line"><span style="color:#24292E;">    </span><span style="color:#D73A49;">return</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">        name: </span><span style="color:#032F62;">&#39;myPlugin&#39;</span><span style="color:#24292E;">,</span></span>
<span class="line"><span style="color:#24292E;">        </span><span style="color:#6F42C1;">install</span><span style="color:#24292E;">: (</span><span style="color:#E36209;">router</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">            router.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">coreHandler</span><span style="color:#24292E;">((</span><span style="color:#E36209;">req</span><span style="color:#24292E;">) </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> {</span></span>
<span class="line"><span style="color:#24292E;">                </span><span style="color:#6F42C1;">setRequestEnv</span><span style="color:#24292E;">(req, </span><span style="color:#032F62;">&#39;name&#39;</span><span style="color:#24292E;">, </span><span style="color:#032F62;">&#39;World&#39;</span><span style="color:#24292E;">);</span></span>
<span class="line"><span style="color:#24292E;">            }));</span></span>
<span class="line"><span style="color:#24292E;">            </span></span>
<span class="line"><span style="color:#24292E;">            router.</span><span style="color:#6F42C1;">get</span><span style="color:#24292E;">(path, () </span><span style="color:#D73A49;">=&gt;</span><span style="color:#24292E;"> </span><span style="color:#032F62;">\`Hello, \${</span><span style="color:#6F42C1;">useRequestEnv</span><span style="color:#032F62;">(</span><span style="color:#24292E;">req</span><span style="color:#032F62;">, </span><span style="color:#032F62;">&#39;name&#39;</span><span style="color:#032F62;">)</span><span style="color:#032F62;">}!\`</span><span style="color:#24292E;">)</span></span>
<span class="line"><span style="color:#24292E;">        }</span></span>
<span class="line"><span style="color:#24292E;">    }</span></span>
<span class="line"><span style="color:#24292E;">}</span></span></code></pre></div><h3 id="mounting-1" tabindex="-1">Mounting <a class="header-anchor" href="#mounting-1" aria-label="Permalink to &quot;Mounting&quot;">​</a></h3><p>To install the plugin, mount it to the router.</p><div class="language-typescript vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">typescript</span><pre class="shiki github-dark vp-code-dark"><code><span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { myPlugin } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;@routup/my-plugin&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"><span style="color:#F97583;">import</span><span style="color:#E1E4E8;"> { Router } </span><span style="color:#F97583;">from</span><span style="color:#E1E4E8;"> </span><span style="color:#9ECBFF;">&#39;routup&#39;</span><span style="color:#E1E4E8;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F97583;">const</span><span style="color:#E1E4E8;"> </span><span style="color:#79B8FF;">router</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">=</span><span style="color:#E1E4E8;"> </span><span style="color:#F97583;">new</span><span style="color:#E1E4E8;"> </span><span style="color:#B392F0;">Router</span><span style="color:#E1E4E8;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#E1E4E8;">router.</span><span style="color:#B392F0;">use</span><span style="color:#E1E4E8;">(</span><span style="color:#B392F0;">myPlugin</span><span style="color:#E1E4E8;">({ path: </span><span style="color:#9ECBFF;">&#39;/hello-world&#39;</span><span style="color:#E1E4E8;"> }));</span></span></code></pre><pre class="shiki github-light vp-code-light"><code><span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { myPlugin } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;@routup/my-plugin&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"><span style="color:#D73A49;">import</span><span style="color:#24292E;"> { Router } </span><span style="color:#D73A49;">from</span><span style="color:#24292E;"> </span><span style="color:#032F62;">&#39;routup&#39;</span><span style="color:#24292E;">;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#D73A49;">const</span><span style="color:#24292E;"> </span><span style="color:#005CC5;">router</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">=</span><span style="color:#24292E;"> </span><span style="color:#D73A49;">new</span><span style="color:#24292E;"> </span><span style="color:#6F42C1;">Router</span><span style="color:#24292E;">();</span></span>
<span class="line"></span>
<span class="line"><span style="color:#24292E;">router.</span><span style="color:#6F42C1;">use</span><span style="color:#24292E;">(</span><span style="color:#6F42C1;">myPlugin</span><span style="color:#24292E;">({ path: </span><span style="color:#032F62;">&#39;/hello-world&#39;</span><span style="color:#24292E;"> }));</span></span></code></pre></div>`,20),e=[o];function t(r,c,i,y,E,u){return a(),n("div",null,e)}const h=s(l,[["render",t]]);export{g as __pageData,h as default};
