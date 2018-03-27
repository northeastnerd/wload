# wload
This is a small, pure Javascript, zero dependency site loader with very basic dependency support. It's 593 bytes gzipped.

It declares an object with methods you can call to do an orderly web site load and call a function when all dependencies are loaded.

Usage is pretty simple, there's an example below. I use it on my web sites like www.webthinglabs.html for example.

<pre>
&lthtml>&lthead>
&ltscript src="scripts/wload.min.js">&lt/script>
&lt/head>
&ltbody>
&ltdiv id="app">&lt/div>
&ltscript>
var ld_site = new wload;
ld_site.src_seq([{"type": "js", "url": "scr/scr_1.js"}, 
                 {"type": "js", "url": "scr/scr_dep_on_scr_1.js"}, 
                 {"type": "js", "url": "scripts/scr_dep_on_scr_2.js"}]);
ld_site.src_file({"type": "css",  "id": "my_style",  "url": "site.css"});
ld_site.src_file({"type": "css",  "id": "my_font",  "url": "https://fontlibrary.org/face/cyanotype"});
ld_site.load_all(function(){console.log('app loaded');});
&lt/script>
&lt/body>
&lt/html>
&lt/pre>
