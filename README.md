# wload
This is a small, pure Javascript, zero dependency site loader with basic dependency support. It's 598 bytes gzipped and I wrote it to understand and fix a load ordering issue before it occurred to me to find and learn to use another one. I'm sure there are more fully featured, more robust loaders out there but I still use this one.

It declares an object with methods you can call to do an orderly web site load and call a function when all dependencies are loaded.

Usage is pretty simple, there's an example below. Site resource scripts and stylesheets are registered with the loader and then load_all() is called which passes requests to the browser. 

Files with no dependecies are registered with the src_file() method which accepts either a single file or an array of files all of which the browser can load in parallel. Resources with dependencies are registered with the src_seq() method which takes a list of resource files to load sequentially from first to last. 

Obviously there are more complex dependency scenarios for giant sites like Yahoo News, this isn't intended to handle servicing that kind of huge interdependent source tree site. For sites with 25 or so html, javascript and css files and just a few dependencies it works well.

I use it on my web sites like www.webthinglabs.html for example.

That's it, enjoy. 
# Example
Here's an example of usage:
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
</pre>

# Testing
Verified on:
* Edge 41.16299.248.0
* Chrome 64.0.3282.186
* Firefox 58.0.2
