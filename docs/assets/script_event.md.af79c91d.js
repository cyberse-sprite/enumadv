import{_ as s,v as a,b as n,R as l}from"./chunks/framework.caa0fbaf.js";const y=JSON.parse('{"title":"事件","description":"","frontmatter":{},"headers":[],"relativePath":"script/event.md","filePath":"script/event.md"}'),p={name:"script/event.md"},t=l(`<h1 id="事件" tabindex="-1">事件 <a class="header-anchor" href="#事件" aria-label="Permalink to &quot;事件&quot;">​</a></h1><p>事件是呈现故事的主体。在剧本文件中，事件需要具有独特的事件名称，每个事件中含有一个或者多个执行项。</p><p>剧本文件中事件的放置形式如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;事件名称&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;type&quot;: &quot;get&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;get&quot;: &quot;start.txt&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;type&quot;: &quot;ope&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;ope&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;SYS.setVari(&#39;支出&#39;,100)&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">                &quot;SYS.setVari(&#39;金钱&#39;,100)&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">            ]</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        ……</span></span>
<span class="line"><span style="color:#A6ACCD;">    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">    ……</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><p>其中有三层结构。</p><p>第一层结构表示【事件名称】-【事件内容】的列表。事件名称是全局唯一的，以标识这个事件，用于插入转跳事件等。</p><p>第二层结构是事件内容中【执行项】的列表。在游戏内如果引用了这个事件，游戏将会依次执行这个执行项里面的内容。</p><p>第三层结构就是每个【执行项】的内容。执行项有10种类型，简单划分为以下几类：</p><ul><li>显示文本：text，get</li><li>执行操作：ope</li><li>控制游戏流程：next，insert，rand，pause，end</li><li>操作与输入：select，input</li></ul><p>总的来说，对于每一种执行项都必须包含type属性和可选使用if属性。下面将详细介绍每一个类型的执行项的具体构成。</p><h2 id="text" tabindex="-1">text <a class="header-anchor" href="#text" aria-label="Permalink to &quot;text&quot;">​</a></h2><p>显示文本内容</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;type&quot;:&quot;text&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;if&quot;:&quot;执行条件&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;text&quot;:&quot;输入你要显示的文本内容&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="get" tabindex="-1">get <a class="header-anchor" href="#get" aria-label="Permalink to &quot;get&quot;">​</a></h2><p>引入外部内容，通常是为了显示长文本内容</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;type&quot;:&quot;get&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;if&quot;:&quot;执行条件&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;get&quot;:&quot;输入你要显示的文本内容所指向的网络地址&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="ope" tabindex="-1">ope <a class="header-anchor" href="#ope" aria-label="Permalink to &quot;ope&quot;">​</a></h2><p>内置支持的公式，具体如何书写请查阅<a href="/script/ope.html">ope语句</a></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;type&quot;: &quot;ope&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;if&quot;:&quot;执行条件&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;ope&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">        &quot;ope语句&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">        ……</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="end" tabindex="-1">end <a class="header-anchor" href="#end" aria-label="Permalink to &quot;end&quot;">​</a></h2><p>锁定游戏进程表示已经到达结局</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;type&quot;:&quot;end&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;if&quot;:&quot;执行条件&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="pause" tabindex="-1">pause <a class="header-anchor" href="#pause" aria-label="Permalink to &quot;pause&quot;">​</a></h2><p>暂停故事的自动显示状态，通常用在不想要被快速掠过的重要信息部分，不会锁定，点击下一步或者自动故事将继续。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;type&quot;:&quot;pause&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;if&quot;:&quot;执行条件&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="select" tabindex="-1">select <a class="header-anchor" href="#select" aria-label="Permalink to &quot;select&quot;">​</a></h2><p>显示选择</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;type&quot;:&quot;select&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;if&quot;:&quot;执行条件&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;select&quot;:[</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;if&quot;:&quot;条件ope语句&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;text&quot;:&quot;按钮显示的文字&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;next&quot;:&quot;点击转跳的事件&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            ……</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="input" tabindex="-1">input <a class="header-anchor" href="#input" aria-label="Permalink to &quot;input&quot;">​</a></h2><p>显示输入</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;type&quot;: &quot;input&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;if&quot;:&quot;执行条件&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;input&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;if&quot;: &quot;条件ope语句&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;label&quot;: &quot;输入的项目名称，显示在输入框前方&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;vari&quot;: &quot;输入的变量的ope语句&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            ……</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    ],</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;next&quot;: &quot;提交后下一个事件&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="insert" tabindex="-1">insert <a class="header-anchor" href="#insert" aria-label="Permalink to &quot;insert&quot;">​</a></h2><p>插入事件，方便一些重复事件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;type&quot;:&quot;insert&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;if&quot;:&quot;执行条件&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;insert&quot;:&quot;插入的事件的名称&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="next" tabindex="-1">next <a class="header-anchor" href="#next" aria-label="Permalink to &quot;next&quot;">​</a></h2><p>连接到下一个事件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;type&quot;: &quot;next&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;if&quot;:&quot;执行条件&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;next&quot;: &quot;下一个事件的名称&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div><h2 id="rand" tabindex="-1">rand <a class="header-anchor" href="#rand" aria-label="Permalink to &quot;rand&quot;">​</a></h2><p>根据公式计算得到的权重随机连接到下一个事件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#A6ACCD;">{</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;type&quot;: &quot;rand&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;if&quot;:&quot;执行条件&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">    &quot;rand&quot;: [</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;weight&quot;: &quot;算术ope语句&quot;,</span></span>
<span class="line"><span style="color:#A6ACCD;">            &quot;next&quot;: &quot;随机到数时对应下一个事件的名称&quot;</span></span>
<span class="line"><span style="color:#A6ACCD;">        },</span></span>
<span class="line"><span style="color:#A6ACCD;">        {</span></span>
<span class="line"><span style="color:#A6ACCD;">            ……</span></span>
<span class="line"><span style="color:#A6ACCD;">        }</span></span>
<span class="line"><span style="color:#A6ACCD;">    ]</span></span>
<span class="line"><span style="color:#A6ACCD;">}</span></span></code></pre></div>`,40),o=[t];function e(c,i,u,r,C,A){return a(),n("div",null,o)}const d=s(p,[["render",e]]);export{y as __pageData,d as default};
